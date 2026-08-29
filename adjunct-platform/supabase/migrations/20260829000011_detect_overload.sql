-- ==========================================
-- STEP 4: OVERLOAD DETECTION & REDISTRIBUTION
-- ==========================================

-- 1. FUNCTION: Detect Overload and Generate Recommendations
CREATE OR REPLACE FUNCTION detect_advisor_overload()
RETURNS VOID AS $$
DECLARE
    v_overloaded RECORD;
    v_target_advisor RECORD;
    v_student_to_move RECORD;
    v_threshold NUMERIC := 120.0;
    v_hod_id UUID;
BEGIN
    -- 1. Force a global recompute to ensure perfect accuracy
    FOR v_overloaded IN SELECT id FROM advisors LOOP
        PERFORM recompute_advisor_workload(v_overloaded.id);
    END LOOP;

    -- 2. Find any advisor exceeding the workload threshold
    FOR v_overloaded IN 
        SELECT a.id, a.department_id, a.current_workload_score, p.name 
        FROM advisors a
        JOIN profiles p ON a.profile_id = p.id
        WHERE a.current_workload_score > v_threshold
    LOOP
        -- 3. Find the most under-loaded advisor in the exact same department
        SELECT a.id, a.current_workload_score INTO v_target_advisor
        FROM advisors a
        WHERE a.department_id = v_overloaded.department_id
          AND a.id != v_overloaded.id
          AND a.current_workload_score < v_threshold
        ORDER BY a.current_workload_score ASC
        LIMIT 1;

        IF FOUND THEN
            -- 4. Identify the BEST student to move.
            -- Rule: Prioritize lowest-risk students first (risk_points ASC).
            -- We do this so we don't disrupt high-risk students who need continuity of care.
            SELECT asm.student_id, COALESCE(srs.risk_points, 1) as points
            INTO v_student_to_move
            FROM advisor_student_mapping asm
            LEFT JOIN student_risk_scores srs ON asm.student_id = srs.student_id
            WHERE asm.advisor_id = v_overloaded.id AND asm.status = 'active'
            ORDER BY COALESCE(srs.risk_points, 1) ASC
            LIMIT 1;

            IF FOUND THEN
                -- 5. Generate the actionable recommendation
                INSERT INTO advisor_recommendations 
                (from_advisor_id, to_advisor_id, student_ids, reason, expected_workload_reduction_percent, status, created_at)
                VALUES (
                    v_overloaded.id, 
                    v_target_advisor.id, 
                    ARRAY[v_student_to_move.student_id], 
                    'Advisor ' || v_overloaded.name || ' is overloaded (Score ' || ROUND(v_overloaded.current_workload_score, 1) || ').',
                    ROUND((v_student_to_move.points / v_overloaded.current_workload_score) * 100, 2),
                    'pending',
                    NOW()
                );

                -- 6. Insert a System Alert for the HOD to approve it
                SELECT hod_id INTO v_hod_id FROM departments WHERE id = v_overloaded.department_id;
                
                IF v_hod_id IS NOT NULL THEN
                    INSERT INTO alerts (user_id, message, severity, timestamp)
                    VALUES (
                        v_hod_id, 
                        'Advisor ' || v_overloaded.name || ' is overloaded. I have generated a smart redistribution plan for your review.', 
                        'high',
                        NOW()
                    );
                END IF;
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- If you have pg_cron enabled in your Supabase project, you can uncomment this to run it every night at midnight:
-- SELECT cron.schedule('nightly-advisor-balancing', '0 0 * * *', $$SELECT detect_advisor_overload();$$);
