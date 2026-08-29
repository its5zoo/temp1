-- 1. Schema Additions

-- Update Role Enum (assuming an existing custom type 'user_role')
-- ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'student';

-- 1. Students Core
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    advisor_id UUID REFERENCES advisors(id) ON DELETE SET NULL,
    cgpa NUMERIC(3,2) DEFAULT 0.00,
    sgpa NUMERIC(3,2) DEFAULT 0.00,
    credits_completed INT DEFAULT 0,
    career_score NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Courses & Enrollment
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS student_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress_percent NUMERIC(5,2) DEFAULT 0.00,
    status TEXT CHECK (status IN ('enrolled', 'completed', 'dropped')) DEFAULT 'enrolled'
);

-- 3. Academics & Performance
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    percentage NUMERIC(5,2) DEFAULT 100.00,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'submitted', 'graded')) DEFAULT 'pending',
    grade NUMERIC(5,2),
    feedback_text TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE
);

-- 4. Scheduling & Advising
CREATE TABLE IF NOT EXISTS advisor_meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled')) DEFAULT 'requested',
    notes TEXT
);

CREATE TABLE IF NOT EXISTS schedule_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('class', 'exam', 'meeting', 'deadline')),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL
);

-- 5. Extra Features (Skills, Support, Feedback, Alerts)
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    proficiency_percent NUMERIC(5,2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    icon TEXT,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('notes', 'recording', 'reading')),
    url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    category TEXT CHECK (category IN ('academic', 'course_difficulty', 'advisor_request', 'general')),
    description TEXT NOT NULL,
    status TEXT CHECK (status IN ('open', 'assigned', 'resolved')) DEFAULT 'open',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    target_type TEXT CHECK (target_type IN ('faculty', 'advisor')),
    target_id UUID NOT NULL, 
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    type TEXT CHECK (type IN ('attendance', 'deadline', 'advisor')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS Policies

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_alerts ENABLE ROW LEVEL SECURITY;


-- STUDENT POLICIES (Access own data via auth.uid() joined through users table)
CREATE POLICY "Students view own profile" ON students 
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students view own attendance" ON attendance 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own submissions" ON submissions 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students update own submissions" ON submissions 
    FOR UPDATE USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own meetings" ON advisor_meetings 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
    
CREATE POLICY "Students create own meetings" ON advisor_meetings 
    FOR INSERT WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own schedule" ON schedule_events 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
    
CREATE POLICY "Students view own skills" ON skills 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own achievements" ON achievements 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own tickets" ON support_tickets 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students create tickets" ON support_tickets 
    FOR INSERT WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own feedback" ON student_feedback 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
    
CREATE POLICY "Students create feedback" ON student_feedback 
    FOR INSERT WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

CREATE POLICY "Students view own alerts" ON student_alerts 
    FOR SELECT USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));


-- READ-ONLY PUBLIC DATA (For students)
CREATE POLICY "Students select read-only public courses" ON courses 
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Students select assignments for enrolled courses" ON assignments
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM student_courses 
            WHERE student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Students select learning resources for enrolled courses" ON learning_resources
    FOR SELECT USING (
        course_id IN (
            SELECT course_id FROM student_courses 
            WHERE student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
        )
    );


-- ADVISOR POLICIES
CREATE POLICY "Advisors manage own meetings" ON advisor_meetings
    FOR ALL USING (advisor_id IN (SELECT id FROM advisors WHERE user_id = auth.uid()));

CREATE POLICY "Advisors view feedback targeting them" ON student_feedback
    FOR SELECT USING (
        target_type = 'advisor' AND 
        target_id IN (SELECT id FROM advisors WHERE user_id = auth.uid())
    );

-- FACULTY POLICIES
CREATE POLICY "Faculty manage submissions for their assignments" ON submissions
    FOR ALL USING (
        assignment_id IN (
            SELECT id FROM assignments WHERE faculty_id IN (SELECT id FROM faculty WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Faculty view feedback targeting them" ON student_feedback
    FOR SELECT USING (
        target_type = 'faculty' AND 
        target_id IN (SELECT id FROM faculty WHERE user_id = auth.uid())
    );
