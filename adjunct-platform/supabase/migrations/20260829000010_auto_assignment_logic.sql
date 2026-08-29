-- ==========================================
-- STEP 3: SMART AUTO-ASSIGNMENT LOGIC
-- ==========================================

-- 1. FUNCTION: Assign Advisor intelligently
CREATE OR REPLACE FUNCTION assign_advisor(p_student_id UUID)
RETURNS VOID AS $$
DECLARE
    v_dept_id UUID;
    v_risk_points NUMERIC;
    v_selected_advisor_id UUID;
BEGIN
    -- 1. Identify the student's department
    SELECT department_id INTO v_dept_id FROM students WHERE id = p_student_id;
    IF v_dept_id IS NULL THEN
        RAISE EXCEPTION 'Cannot assign advisor: Student % has no department.', p_student_id;
    END IF;

    -- 2. Compute/Refresh student risk to ensure we have accurate points
    PERFORM compute_student_risk(p_student_id);
    SELECT COALESCE(risk_points, 1) INTO v_risk_points FROM student_risk_scores WHERE student_id = p_student_id;

    -- 3. The Core Algorithm: Find the best advisor
    -- We want an advisor in the same department who is UNDER their max capacity.
    -- To perfectly balance workload, we select the advisor whose resulting score 
    -- (current_workload_score + this_student_risk_points) would be the lowest.
    -- Ties are broken by whoever has the fewest sheer number of students.
    SELECT a.id INTO v_selected_advisor_id
    FROM advisors a
    LEFT JOIN (
        SELECT advisor_id, COUNT(id) as current_count 
        FROM advisor_student_mapping 
        WHERE status = 'active' 
        GROUP BY advisor_id
    ) counts ON a.id = counts.advisor_id
    WHERE a.department_id = v_dept_id
      AND COALESCE(counts.current_count, 0) < COALESCE(a.max_capacity, 150)
    ORDER BY (COALESCE(a.current_workload_score, 0) + v_risk_points) ASC, COALESCE(counts.current_count, 0) ASC
    LIMIT 1;

    IF v_selected_advisor_id IS NULL THEN
        RAISE EXCEPTION 'Assignment Failed: No available advisors in department % are under their max capacity limit.', v_dept_id;
    END IF;

    -- 4. Invalidate any previous active mappings for this student (if they are being reassigned)
    UPDATE advisor_student_mapping 
    SET status = 'transferred', transfer_reason = 'Smart Auto-Reassignment override' 
    WHERE student_id = p_student_id AND status = 'active';

    -- 5. Insert new mapping
    -- NOTE: Because we built triggers in Step 2, this INSERT will automatically 
    -- fire tr_mapping_change and instantly recalculate the new advisor's true workload score!
    INSERT INTO advisor_student_mapping (advisor_id, student_id, assigned_at, status)
    VALUES (v_selected_advisor_id, p_student_id, NOW(), 'active');

END;
$$ LANGUAGE plpgsql;

-- 2. TRIGGER: Auto-assign on new student creation
CREATE OR REPLACE FUNCTION trigger_auto_assign_student()
RETURNS TRIGGER AS $$
BEGIN
    -- We can only auto-assign if they have a department
    IF NEW.department_id IS NOT NULL THEN
        PERFORM assign_advisor(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_new_student_auto_assign ON students;
CREATE TRIGGER tr_new_student_auto_assign
AFTER INSERT ON students
FOR EACH ROW EXECUTE FUNCTION trigger_auto_assign_student();
