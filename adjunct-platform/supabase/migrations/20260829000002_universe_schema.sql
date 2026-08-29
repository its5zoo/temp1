-- 1. Modify Existing Tables
ALTER TABLE students 
ADD COLUMN IF NOT EXISTS enrollment_no TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS program TEXT,
ADD COLUMN IF NOT EXISTS semester INT,
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('active', 'on_leave', 'graduated')) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS success_score NUMERIC(5,2) DEFAULT 0.00;

-- Rename and expand learning_resources
ALTER TABLE learning_resources RENAME TO resource_library;
ALTER TABLE resource_library 
DROP CONSTRAINT IF EXISTS learning_resources_type_check,
ADD COLUMN IF NOT EXISTS category TEXT CHECK (category IN ('notes', 'recording', 'ppt', 'past_paper', 'research', 'ebook')),
ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Expand student_feedback
ALTER TABLE student_feedback
ADD COLUMN IF NOT EXISTS category TEXT CHECK (category IN ('course_content', 'instructor', 'platform_usability', 'technical_issue', 'suggestion')),
ADD COLUMN IF NOT EXISTS anonymous BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS screenshot_url TEXT,
ADD COLUMN IF NOT EXISTS tracking_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('submitted', 'reviewed', 'resolved')) DEFAULT 'submitted';

-- Align support_tickets categories
ALTER TABLE support_tickets
DROP CONSTRAINT IF EXISTS support_tickets_category_check,
ADD CONSTRAINT support_tickets_category_check CHECK (category IN ('academic', 'technical', 'fee'));


-- 2. New Academic Tables
CREATE TABLE IF NOT EXISTS grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    semester INT NOT NULL,
    gpa NUMERIC(3,2),
    cgpa NUMERIC(3,2),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subject_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    score_percent NUMERIC(5,2),
    period TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    exam_date TIMESTAMP WITH TIME ZONE NOT NULL,
    type TEXT CHECK (type IN ('quiz', 'mid_sem', 'end_sem', 'lab'))
);

CREATE TABLE IF NOT EXISTS exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    score NUMERIC(5,2),
    admit_card_issued BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('transcript', 'bonafide', 'completion', 'workshop')),
    file_url TEXT NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified BOOLEAN DEFAULT false
);


-- 3. New Administrative/Financial Tables
CREATE TABLE IF NOT EXISTS fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    total_amount NUMERIC(10,2) NOT NULL,
    paid_amount NUMERIC(10,2) DEFAULT 0.00,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT CHECK (status IN ('paid', 'partial', 'overdue')) DEFAULT 'overdue'
);

CREATE TABLE IF NOT EXISTS fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fee_id UUID REFERENCES fees(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mode TEXT,
    receipt_url TEXT
);

CREATE TABLE IF NOT EXISTS student_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    notif_exam BOOLEAN DEFAULT true,
    notif_assignment BOOLEAN DEFAULT true,
    notif_advisor BOOLEAN DEFAULT true,
    notif_announcements BOOLEAN DEFAULT true,
    profile_visibility TEXT CHECK (profile_visibility IN ('public', 'private')) DEFAULT 'private',
    anonymous_feedback_default BOOLEAN DEFAULT false
);


-- 4. New Communication Tables
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT CHECK (category IN ('university', 'faculty', 'placement', 'hackathon', 'workshop')),
    priority TEXT CHECK (priority IN ('critical', 'important', 'general')),
    target_role TEXT, 
    target_department TEXT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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


-- 5. Enable RLS
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_settings ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
CREATE POLICY "Students view own grades" ON grades FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Students view own subject performance" ON subject_performance FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Students view exams for enrolled courses" ON exams FOR SELECT USING (course_id IN (SELECT course_id FROM student_courses WHERE student_id IN (SELECT id FROM students WHERE user_id = auth.uid())));
CREATE POLICY "Students view own exam results" ON exam_results FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Students view own fees" ON fees FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Students view own fee payments" ON fee_payments FOR SELECT USING (fee_id IN (SELECT id FROM fees WHERE student_id IN (SELECT id FROM students WHERE user_id = auth.uid())));
CREATE POLICY "Students view own certificates" ON certificates FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students manage own settings" ON student_settings FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view messages involving them" ON messages FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "Students send messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Anyone view forums" ON discussion_forums FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone view forum posts" ON forum_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students insert forum posts" ON forum_posts FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
