-- Edge Functions / Triggers for Student Alerts

-- 1. Trigger: Low Attendance Alert
-- Fires when attendance percentage drops below 75%
CREATE OR REPLACE FUNCTION check_attendance_and_alert()
RETURNS TRIGGER AS $$
BEGIN
    -- If attendance falls below 75%
    IF NEW.percentage < 75.00 THEN
        -- Check if an active alert already exists to prevent spam
        IF NOT EXISTS (
            SELECT 1 FROM student_alerts 
            WHERE student_id = NEW.student_id 
            AND type = 'attendance' 
            AND is_read = false
        ) THEN
            INSERT INTO student_alerts (student_id, severity, type, message)
            VALUES (
                NEW.student_id, 
                'high', 
                'attendance', 
                'Warning: Your attendance has dropped below the 75% requirement. Please contact your advisor.'
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER attendance_alert_trigger
AFTER UPDATE ON attendance
FOR EACH ROW
WHEN (OLD.percentage >= 75.00 AND NEW.percentage < 75.00)
EXECUTE FUNCTION check_attendance_and_alert();


-- 2. Trigger: Upcoming Assignment Deadline
-- This technically requires a scheduled cron job (pg_cron) to check "within 24 hours" if we aren't mutating rows,
-- but the prompt requested a trigger. We can implement a trigger on assignment insertion/update, 
-- but a cron job is the proper way to check time-based alerts without table mutations.
-- Here is the pg_cron implementation (requires pg_cron extension):

-- Ensure extension exists (often pre-installed in Supabase)
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function that runs daily/hourly to check deadlines
CREATE OR REPLACE FUNCTION check_upcoming_deadlines()
RETURNS void AS $$
BEGIN
    INSERT INTO student_alerts (student_id, severity, type, message)
    SELECT 
        sc.student_id,
        'medium',
        'deadline',
        'Reminder: Assignment "' || a.title || '" is due within 24 hours.'
    FROM assignments a
    JOIN student_courses sc ON a.course_id = sc.course_id
    LEFT JOIN submissions s ON s.assignment_id = a.id AND s.student_id = sc.student_id
    WHERE a.due_date BETWEEN NOW() AND NOW() + INTERVAL '24 hours'
      AND (s.id IS NULL OR s.status = 'pending')
      AND NOT EXISTS (
          -- Prevent duplicate alerts for the same deadline
          SELECT 1 FROM student_alerts sa 
          WHERE sa.student_id = sc.student_id 
          AND sa.type = 'deadline' 
          AND sa.message LIKE '%' || a.title || '%'
      );
END;
$$ LANGUAGE plpgsql;

-- Schedule it to run every hour
-- SELECT cron.schedule('check-deadlines-hourly', '0 * * * *', 'SELECT check_upcoming_deadlines();');
