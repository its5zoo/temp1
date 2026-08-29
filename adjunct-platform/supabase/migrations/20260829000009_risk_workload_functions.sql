-- ==========================================
-- STEP 2: RISK & WORKLOAD CALCULATION
-- ==========================================

-- 1. FUNCTION: Compute Student Risk
CREATE OR REPLACE FUNCTION compute_student_risk(p_student_id UUID)
RETURNS VOID AS $$
DECLARE
    v_attendance NUMERIC;
    v_cgpa NUMERIC;
    v_backlogs INT;
    v_risk_level risk_level_enum;
    v_risk_points NUMERIC;
BEGIN
    -- Read latest attendance and cgpa from students table
    SELECT attendance, cgpa INTO v_attendance, v_cgpa FROM students WHERE id = p_student_id;
    
    -- Try to preserve backlog_count if it exists, otherwise default to 0
    SELECT COALESCE(MAX(backlog_count), 0) INTO v_backlogs FROM student_risk_scores WHERE student_id = p_student_id;

    -- Calculate Risk Level based on strict documented thresholds
    IF v_attendance < 60.0 OR v_cgpa < 6.0 OR v_backlogs >= 2 THEN
        v_risk_level := 'high';
        v_risk_points := 3;
    ELSIF v_attendance < 75.0 OR v_cgpa < 7.0 THEN
        v_risk_level := 'medium';
        v_risk_points := 2;
    ELSE
        v_risk_level := 'low';
        v_risk_points := 1;
    END IF;

    -- Upsert logic for student_risk_scores
    IF EXISTS (SELECT 1 FROM student_risk_scores WHERE student_id = p_student_id) THEN
        UPDATE student_risk_scores 
        SET attendance_percent = v_attendance,
            cgpa = v_cgpa,
            backlog_count = v_backlogs,
            risk_level = v_risk_level,
            risk_points = v_risk_points,
            computed_at = NOW()
        WHERE student_id = p_student_id;
    ELSE
        INSERT INTO student_risk_scores (student_id, attendance_percent, cgpa, backlog_count, risk_level, risk_points, computed_at)
        VALUES (p_student_id, v_attendance, v_cgpa, v_backlogs, v_risk_level, v_risk_points, NOW());
    END IF;
END;
$$ LANGUAGE plpgsql;


-- 2. FUNCTION: Recompute Advisor Workload
CREATE OR REPLACE FUNCTION recompute_advisor_workload(p_advisor_id UUID)
RETURNS VOID AS $$
DECLARE
    v_student_count INT;
    v_weighted_score NUMERIC;
BEGIN
    -- Sum risk points across all active mapped students
    SELECT COUNT(asm.id), COALESCE(SUM(srs.risk_points), 0)
    INTO v_student_count, v_weighted_score
    FROM advisor_student_mapping asm
    LEFT JOIN student_risk_scores srs ON asm.student_id = srs.student_id
    WHERE asm.advisor_id = p_advisor_id AND asm.status = 'active';

    -- Update advisor's current tracked score
    UPDATE advisors
    SET current_workload_score = v_weighted_score
    WHERE id = p_advisor_id;

    -- Log to historical advisor workloads tracker
    INSERT INTO advisor_workloads (advisor_id, student_count, weighted_workload_score, computed_at)
    VALUES (p_advisor_id, v_student_count, v_weighted_score, NOW());
END;
$$ LANGUAGE plpgsql;


-- 3. TRIGGERS

-- A) Trigger risk computation when student academic data changes
CREATE OR REPLACE FUNCTION trigger_compute_student_risk()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') OR 
       (TG_OP = 'UPDATE' AND (NEW.attendance IS DISTINCT FROM OLD.attendance OR NEW.cgpa IS DISTINCT FROM OLD.cgpa)) THEN
       PERFORM compute_student_risk(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_students_academic_change ON students;
CREATE TRIGGER tr_students_academic_change
AFTER INSERT OR UPDATE ON students
FOR EACH ROW EXECUTE FUNCTION trigger_compute_student_risk();


-- B) Trigger workload recomputation when student risk points change
CREATE OR REPLACE FUNCTION trigger_recompute_workload_on_risk_change()
RETURNS TRIGGER AS $$
DECLARE
    v_advisor_id UUID;
BEGIN
    SELECT advisor_id INTO v_advisor_id FROM advisor_student_mapping 
    WHERE student_id = NEW.student_id AND status = 'active' LIMIT 1;
    
    IF v_advisor_id IS NOT NULL THEN
        PERFORM recompute_advisor_workload(v_advisor_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_risk_scores_change ON student_risk_scores;
CREATE TRIGGER tr_risk_scores_change
AFTER UPDATE ON student_risk_scores
FOR EACH ROW
WHEN (NEW.risk_points IS DISTINCT FROM OLD.risk_points)
EXECUTE FUNCTION trigger_recompute_workload_on_risk_change();


-- C) Trigger workload recomputation when mapping changes (assigned/transferred)
CREATE OR REPLACE FUNCTION trigger_recompute_workload_on_mapping_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM recompute_advisor_workload(NEW.advisor_id);
    ELSIF TG_OP = 'UPDATE' THEN
        IF NEW.advisor_id IS DISTINCT FROM OLD.advisor_id OR NEW.status IS DISTINCT FROM OLD.status THEN
            PERFORM recompute_advisor_workload(NEW.advisor_id);
            PERFORM recompute_advisor_workload(OLD.advisor_id);
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM recompute_advisor_workload(OLD.advisor_id);
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_mapping_change ON advisor_student_mapping;
CREATE TRIGGER tr_mapping_change
AFTER INSERT OR UPDATE OR DELETE ON advisor_student_mapping
FOR EACH ROW EXECUTE FUNCTION trigger_recompute_workload_on_mapping_change();
