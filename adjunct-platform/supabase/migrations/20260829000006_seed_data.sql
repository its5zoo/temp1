-- ==========================================
-- SEED DATA FOR LEAN MVP
-- ==========================================
-- This script seeds the 13 MVP tables with initial demo data.
-- Since we are bypassing true auth for the MVP, we use hardcoded UUIDs for the profiles so we can reference them.

-- 1. PROFILES (Users)
-- We will insert our standard mock users: System Admin, Alan HOD, Jane Adjunct, Mark Advisor, Alice Student, Alex Student
INSERT INTO profiles (id, name, email, role) VALUES 
('00000000-0000-0000-0000-000000000000', 'System Admin', 'admin@univ.edu', 'admin'),
('11111111-1111-1111-1111-111111111111', 'Dr. Alan Smith', 'alan.hod@univ.edu', 'hod'),
('22222222-2222-2222-2222-222222222222', 'Jane Doe', 'jane.adjunct@univ.edu', 'adjunct_faculty'),
('33333333-3333-3333-3333-333333333333', 'Mark Evans', 'mark.advisor@univ.edu', 'advisor'),
('44444444-4444-4444-4444-444444444444', 'Alice Wong', 'alice.student@univ.edu', 'student'),
('55555555-5555-5555-5555-555555555555', 'Alex Johnson', 'alex.student@univ.edu', 'student')
ON CONFLICT (email) DO NOTHING;

-- 2. DEPARTMENTS
INSERT INTO departments (id, department_name, hod_id, total_students, total_faculty) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Computer Science', '11111111-1111-1111-1111-111111111111', 450, 12)
ON CONFLICT DO NOTHING;

-- 3. ADJUNCT FACULTY
INSERT INTO adjunct_faculty (id, profile_id, department_id, specialization, joining_date, contract_end_date, employment_status, onboarding_status, performance_score) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Machine Learning', '2025-01-15', '2026-12-31', 'active', 'completed', 4.7)
ON CONFLICT DO NOTHING;

-- 4. STUDENTS
INSERT INTO students (id, profile_id, department_id, semester, cgpa, attendance) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 4, 3.8, 92.5),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '55555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2, 3.2, 85.0)
ON CONFLICT DO NOTHING;

-- 5. ADVISORS
INSERT INTO advisors (id, profile_id, department_id, workload_score) VALUES
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 82.5)
ON CONFLICT DO NOTHING;

-- 6. COURSES
INSERT INTO courses (id, course_name, course_code, department_id, credits) VALUES
('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'Advanced Python Programming', 'CS301', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 4),
('f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2', 'Machine Learning Basics', 'CS402', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 3)
ON CONFLICT DO NOTHING;

-- 7. ENROLLMENTS
INSERT INTO enrollments (student_id, course_id) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2')
ON CONFLICT DO NOTHING;

-- 8. WORKLOADS
INSERT INTO workloads (id, faculty_id, total_courses, total_students, pending_assignments, workload_score) VALUES
('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 2, 205, 15, 75.5)
ON CONFLICT DO NOTHING;

-- 9. ALERTS
INSERT INTO alerts (recipient_id, message, severity) VALUES
('11111111-1111-1111-1111-111111111111', 'Workload critical: Jane Doe has >80 workload score (3 assigned courses).', 'high'),
('11111111-1111-1111-1111-111111111111', 'Advisor overload: Mark Evans has 260 assigned students (>250 limit).', 'medium')
ON CONFLICT DO NOTHING;
