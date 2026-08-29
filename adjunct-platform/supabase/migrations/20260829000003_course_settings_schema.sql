-- 1. Extend Existing Tables
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS course_code TEXT,
ADD COLUMN IF NOT EXISTS credits INT,
ADD COLUMN IF NOT EXISTS semester INT,
ADD COLUMN IF NOT EXISTS duration TEXT;

-- 2. Quizzes & Assessments
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

-- 3. Communication & Doubts
CREATE TABLE IF NOT EXISTS doubts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject TEXT,
    topic TEXT,
    description TEXT NOT NULL,
    attachment_url TEXT,
    status TEXT CHECK (status IN ('open', 'answered', 'closed')) DEFAULT 'open',
    assigned_faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
    ai_suggestion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Settings, Security & Profile
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

CREATE TABLE IF NOT EXISTS user_profile_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    photo_url TEXT,
    phone_number TEXT,
    profile_visibility TEXT CHECK (profile_visibility IN ('public', 'faculty_only', 'private')) DEFAULT 'private',
    language TEXT CHECK (language IN ('en', 'hi', 'ta', 'te', 'bn')) DEFAULT 'en',
    theme TEXT CHECK (theme IN ('light', 'dark', 'system')) DEFAULT 'system',
    notif_assignment BOOLEAN DEFAULT true,
    notif_exam BOOLEAN DEFAULT true,
    notif_attendance BOOLEAN DEFAULT true,
    notif_advisor BOOLEAN DEFAULT true,
    notif_announcements BOOLEAN DEFAULT true,
    two_factor_enabled BOOLEAN DEFAULT false
);

-- 5. Documents & Career
CREATE TABLE IF NOT EXISTS downloadable_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('id_card', 'transcript', 'certificate', 'fee_receipt')),
    file_url TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS career_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    recommendation_text TEXT NOT NULL,
    based_on TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS internships_hackathons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('internship', 'hackathon')),
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('applied', 'ongoing', 'completed')) DEFAULT 'applied',
    link TEXT
);


-- 6. Enable RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloadable_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships_hackathons ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
CREATE POLICY "Students view quizzes for enrolled courses" ON quizzes 
    FOR SELECT USING (course_id IN (SELECT course_id FROM student_courses WHERE student_id IN (SELECT id FROM students WHERE user_id = auth.uid())));

CREATE POLICY "Students view own quiz results" ON quiz_results 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students manage own doubts" ON doubts 
    FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Users view own devices" ON devices 
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users view own login history" ON login_history 
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users manage own profile settings" ON user_profile_settings 
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Students view own downloadable documents" ON downloadable_documents 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own career recommendations" ON career_recommendations 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students manage own internships" ON internships_hackathons 
    FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
