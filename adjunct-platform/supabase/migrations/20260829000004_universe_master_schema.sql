-- ==========================================
-- UNIVERSE MASTER SCHEMA (GROUPS A - G)
-- ==========================================

-- ------------------------------------------
-- GROUP A: IDENTITY & CORE
-- ------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('hod', 'adjunct_faculty', 'advisor', 'admin', 'student');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE profile_visibility_type AS ENUM ('public', 'faculty_only', 'private');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE language_type AS ENUM ('en', 'hi', 'ta', 'te', 'bn');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE theme_type AS ENUM ('light', 'dark', 'system');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: user_profile_settings was created in migration 0003, but we ensure it matches the master spec
CREATE TABLE IF NOT EXISTS user_profile_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    photo_url TEXT,
    phone_number TEXT,
    profile_visibility profile_visibility_type DEFAULT 'private',
    language language_type DEFAULT 'en',
    theme theme_type DEFAULT 'system',
    notif_assignment BOOLEAN DEFAULT true,
    notif_exam BOOLEAN DEFAULT true,
    notif_attendance BOOLEAN DEFAULT true,
    notif_advisor BOOLEAN DEFAULT true,
    notif_announcements BOOLEAN DEFAULT true,
    two_factor_enabled BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_info TEXT NOT NULL,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_current BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ip_address TEXT,
    device_info TEXT,
    logged_in_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------
-- GROUP B: FACULTY & ADVISORS
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    specialization TEXT,
    joining_date DATE,
    status TEXT,
    onboarding_completed BOOLEAN DEFAULT false,
    performance_score NUMERIC(5,2)
);

DO $$ BEGIN CREATE TYPE onboarding_step AS ENUM ('profile_setup', 'document_verification', 'lms_training', 'teaching_guidelines'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE onboarding_status AS ENUM ('pending', 'in_progress', 'complete'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS faculty_onboarding_steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    step_name onboarding_step,
    status onboarding_status DEFAULT 'pending',
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    course_code TEXT,
    credits INT,
    semester INT,
    duration TEXT
);

CREATE TABLE IF NOT EXISTS faculty_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    students_count INT DEFAULT 0,
    progress_percent NUMERIC(5,2) DEFAULT 0
);

DO $$ BEGIN CREATE TYPE schedule_type AS ENUM ('class', 'doubt_session', 'meeting'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS faculty_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type schedule_type,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS workload (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    courses_assigned INT DEFAULT 0,
    student_count INT DEFAULT 0,
    workload_score NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faculty_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    student_satisfaction NUMERIC(5,2),
    course_completion_percent NUMERIC(5,2),
    attendance_update_percent NUMERIC(5,2),
    assignment_review_speed_days NUMERIC(5,2),
    period_start DATE,
    period_end DATE
);

CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    rating NUMERIC(3,2),
    comments TEXT,
    date DATE
);

DO $$ BEGIN CREATE TYPE feedback_source AS ENUM ('student', 'hod', 'department'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS faculty_feedback_received (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    source feedback_source,
    comments TEXT,
    rating NUMERIC(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$ BEGIN CREATE TYPE achievement_category AS ENUM ('top_rated', 'highest_satisfaction', 'best_completion'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS faculty_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category achievement_category,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faculty_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    period_start DATE,
    period_end DATE,
    classes_conducted INT,
    assignments_evaluated INT,
    queries_resolved INT,
    course_progress_delta NUMERIC(5,2),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_to_hod BOOLEAN DEFAULT false
);

DO $$ BEGIN CREATE TYPE contract_status AS ENUM ('under_review', 'renewed', 'not_renewed'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS faculty_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    contract_end_date DATE,
    performance_rating NUMERIC(3,2),
    renewal_status contract_status DEFAULT 'under_review'
);

CREATE TABLE IF NOT EXISTS faculty_health_score (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    teaching_quality NUMERIC(5,2),
    course_completion NUMERIC(5,2),
    feedback_score NUMERIC(5,2),
    overall_score NUMERIC(5,2),
    computed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$ BEGIN CREATE TYPE burnout_risk AS ENUM ('low', 'medium', 'high'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS faculty_burnout_signals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
    students_assigned_trend NUMERIC(5,2),
    classes_trend NUMERIC(5,2),
    feedback_trend NUMERIC(5,2),
    risk_level burnout_risk,
    flagged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS advisors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    students_assigned INT DEFAULT 0,
    performance_score NUMERIC(5,2) DEFAULT 0
);

DO $$ BEGIN CREATE TYPE student_status AS ENUM ('active', 'on_leave', 'graduated'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    advisor_id UUID REFERENCES advisors(id) ON DELETE SET NULL,
    enrollment_no TEXT UNIQUE,
    program TEXT,
    semester INT,
    status student_status DEFAULT 'active',
    cgpa NUMERIC(5,2) DEFAULT 0,
    sgpa NUMERIC(5,2) DEFAULT 0,
    credits_completed INT DEFAULT 0,
    career_score NUMERIC(5,2) DEFAULT 0,
    success_score NUMERIC(5,2) DEFAULT 0
);

DO $$ BEGIN CREATE TYPE meeting_status AS ENUM ('requested', 'confirmed', 'completed', 'cancelled'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS advisor_meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status meeting_status DEFAULT 'requested',
    notes TEXT
);

-- ------------------------------------------
-- GROUP C: COURSES & ACADEMICS (Extensions)
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS student_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress_percent NUMERIC(5,2) DEFAULT 0,
    status TEXT
);

CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL
);

DO $$ BEGIN CREATE TYPE submission_status AS ENUM ('pending', 'submitted', 'graded', 'late'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status submission_status DEFAULT 'pending',
    grade NUMERIC(5,2),
    feedback_text TEXT
);

CREATE TABLE IF NOT EXISTS quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    max_score NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS quiz_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    score NUMERIC(5,2),
    feedback_text TEXT
);

CREATE TABLE IF NOT EXISTS grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    semester INT,
    gpa NUMERIC(5,2),
    cgpa NUMERIC(5,2),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subject_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    score_percent NUMERIC(5,2),
    period TEXT
);

CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    percentage NUMERIC(5,2),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$ BEGIN CREATE TYPE resource_category AS ENUM ('notes', 'recording', 'ppt', 'past_paper', 'research', 'ebook'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS resource_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category resource_category,
    url TEXT,
    searchable tsvector
);

-- ------------------------------------------
-- GROUP D: STUDENTS & SUCCESS LAYER
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_percent NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    icon TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    recommendation_text TEXT NOT NULL,
    based_on TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$ BEGIN CREATE TYPE experience_type AS ENUM ('internship', 'hackathon'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE experience_status AS ENUM ('applied', 'ongoing', 'completed'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS internships_hackathons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type experience_type,
    title TEXT NOT NULL,
    status experience_status DEFAULT 'applied',
    link TEXT
);

DO $$ BEGIN CREATE TYPE event_type AS ENUM ('class', 'exam', 'meeting', 'deadline'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS schedule_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type event_type,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL
);

-- ------------------------------------------
-- GROUP E: COMMUNICATION & SUPPORT
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS discussion_forums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    forum_id UUID REFERENCES discussion_forums(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$ BEGIN CREATE TYPE doubt_status AS ENUM ('open', 'answered', 'closed'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS doubts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject TEXT,
    topic TEXT,
    description TEXT NOT NULL,
    attachment_url TEXT,
    status doubt_status DEFAULT 'open',
    assigned_faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
    ai_suggestion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$ BEGIN CREATE TYPE ticket_category AS ENUM ('academic', 'technical', 'fee'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE ticket_status AS ENUM ('open', 'assigned', 'resolved'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    category ticket_category,
    description TEXT NOT NULL,
    status ticket_status DEFAULT 'open',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL
);

DO $$ BEGIN CREATE TYPE announcement_category AS ENUM ('university', 'faculty', 'placement', 'hackathon', 'workshop'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE announcement_priority AS ENUM ('critical', 'important', 'general'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    category announcement_category,
    priority announcement_priority,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    target_role user_role,
    target_department TEXT
);

DO $$ BEGIN CREATE TYPE feedback_target AS ENUM ('faculty', 'advisor', 'course', 'platform'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE feedback_category AS ENUM ('course_content', 'instructor', 'platform_usability', 'technical_issue', 'suggestion'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE feedback_status AS ENUM ('submitted', 'reviewed', 'resolved'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS student_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    target_type feedback_target,
    target_id UUID,
    category feedback_category,
    rating NUMERIC(3,2),
    comments TEXT,
    anonymous BOOLEAN DEFAULT false,
    screenshot_url TEXT,
    tracking_id TEXT UNIQUE,
    status feedback_status DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Protect student_id when anonymous = true via VIEW
CREATE OR REPLACE VIEW faculty_feedback_view AS 
SELECT 
    id, target_type, target_id, category, rating, comments, tracking_id, status, created_at,
    CASE WHEN anonymous = true THEN NULL ELSE student_id END as visible_student_id
FROM student_feedback;

-- ------------------------------------------
-- GROUP F: MONITORING & ALERTS
-- ------------------------------------------
DO $$ BEGIN CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    message TEXT NOT NULL,
    severity alert_severity,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------
-- GROUP G: STUBBED / FLAGGED MODULES (ERP)
-- ------------------------------------------
DO $$ BEGIN CREATE TYPE exam_type AS ENUM ('quiz', 'mid_sem', 'end_sem', 'lab'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    exam_date DATE,
    type exam_type
);

CREATE TABLE IF NOT EXISTS exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    score NUMERIC(5,2),
    admit_card_issued BOOLEAN DEFAULT false
);

DO $$ BEGIN CREATE TYPE fee_status AS ENUM ('paid', 'partial', 'overdue'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    total_amount NUMERIC(10,2) NOT NULL,
    paid_amount NUMERIC(10,2) DEFAULT 0,
    due_date DATE NOT NULL,
    status fee_status DEFAULT 'overdue'
);

CREATE TABLE IF NOT EXISTS fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fee_id UUID REFERENCES fees(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mode TEXT,
    receipt_url TEXT
);

DO $$ BEGIN CREATE TYPE certificate_type AS ENUM ('transcript', 'bonafide', 'completion', 'workshop'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type certificate_type,
    file_url TEXT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT false
);

DO $$ BEGIN CREATE TYPE doc_type AS ENUM ('id_card', 'transcript', 'certificate', 'fee_receipt'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS downloadable_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type doc_type,
    file_url TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
