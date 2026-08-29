-- ==========================================
-- LEAN 13-TABLE MVP SCHEMA
-- ==========================================

-- 1. ENUMS
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('hod', 'adjunct_faculty', 'advisor', 'student', 'admin'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE employment_status AS ENUM ('applied', 'selected', 'onboarding', 'active', 'renewal', 'exited'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'complete'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE report_status_enum AS ENUM ('submitted', 'pending', 'overdue'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE alert_severity_enum AS ENUM ('low', 'medium', 'high'); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. CORE TABLES
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- references auth.users in Supabase
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_name TEXT NOT NULL,
    hod_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    total_students INT DEFAULT 0,
    total_faculty INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS adjunct_faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    specialization TEXT,
    joining_date DATE,
    contract_end_date DATE,
    employment_status employment_status DEFAULT 'applied',
    onboarding_status TEXT,
    performance_score NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    semester INT,
    cgpa NUMERIC(5,2) DEFAULT 0,
    attendance NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS advisors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    workload_score NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_name TEXT NOT NULL,
    course_code TEXT UNIQUE NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
    credits INT NOT NULL
);

CREATE TABLE IF NOT EXISTS enrollments (
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (student_id, course_id)
);

CREATE TABLE IF NOT EXISTS onboarding_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES adjunct_faculty(id) ON DELETE CASCADE,
    task_name TEXT NOT NULL,
    status task_status DEFAULT 'pending',
    due_date DATE
);

CREATE TABLE IF NOT EXISTS weekly_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES adjunct_faculty(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    status report_status_enum DEFAULT 'pending',
    report_content TEXT
);

CREATE TABLE IF NOT EXISTS faculty_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE SET NULL,
    faculty_id UUID REFERENCES adjunct_faculty(id) ON DELETE CASCADE,
    teaching_rating INT,
    punctuality_rating INT,
    responsiveness_rating INT,
    overall_rating INT,
    comments TEXT
);

CREATE TABLE IF NOT EXISTS workloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID REFERENCES adjunct_faculty(id) ON DELETE CASCADE,
    total_courses INT DEFAULT 0,
    total_students INT DEFAULT 0,
    pending_assignments INT DEFAULT 0,
    workload_score NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    severity alert_severity_enum DEFAULT 'low',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE adjunct_faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE workloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Admin: full access to everything
-- Helper function to check admin status
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Users can read their own profile, Admins can read all.
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (id = auth.uid() OR is_admin());

-- Students: Read own row
CREATE POLICY "Student read own row" ON students FOR SELECT USING (profile_id = auth.uid() OR is_admin());

-- Enrollments: Read own
CREATE POLICY "Student read own enrollments" ON enrollments FOR SELECT USING (student_id IN (SELECT id FROM students WHERE profile_id = auth.uid()) OR is_admin());

-- Faculty Feedback: Students read own authored, Faculty read own received, Admins read all
CREATE POLICY "Student read own feedback" ON faculty_feedback FOR SELECT USING (student_id IN (SELECT id FROM students WHERE profile_id = auth.uid()) OR is_admin());
CREATE POLICY "Faculty read received feedback" ON faculty_feedback FOR SELECT USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE profile_id = auth.uid()));

-- Messages: Sender or Receiver
CREATE POLICY "Read own messages" ON messages FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid() OR is_admin());
CREATE POLICY "Insert own messages" ON messages FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Adjunct Faculty: Read/Update own row
CREATE POLICY "Faculty read own row" ON adjunct_faculty FOR SELECT USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "Faculty update own row" ON adjunct_faculty FOR UPDATE USING (profile_id = auth.uid());

-- Onboarding Tasks: Faculty read own
CREATE POLICY "Faculty read own onboarding" ON onboarding_tasks FOR SELECT USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE profile_id = auth.uid()) OR is_admin());

-- Weekly Reports: Faculty insert/update own
CREATE POLICY "Faculty manage own reports" ON weekly_reports FOR ALL USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE profile_id = auth.uid()) OR is_admin());

-- Workloads: Faculty read-only own
CREATE POLICY "Faculty read own workload" ON workloads FOR SELECT USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE profile_id = auth.uid()) OR is_admin());

-- Advisor: Read/Update own row
CREATE POLICY "Advisor read own row" ON advisors FOR SELECT USING (profile_id = auth.uid() OR is_admin());
CREATE POLICY "Advisor update own row" ON advisors FOR UPDATE USING (profile_id = auth.uid());

-- HOD Policies (Scoped to department)
-- Helper function
CREATE OR REPLACE FUNCTION get_hod_dept() RETURNS UUID AS $$
  SELECT id FROM departments WHERE hod_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE POLICY "HOD read dept faculty" ON adjunct_faculty FOR SELECT USING (department_id = get_hod_dept());
CREATE POLICY "HOD read dept students" ON students FOR SELECT USING (department_id = get_hod_dept());
CREATE POLICY "HOD read dept advisors" ON advisors FOR SELECT USING (department_id = get_hod_dept());
CREATE POLICY "HOD read dept courses" ON courses FOR SELECT USING (department_id = get_hod_dept());
CREATE POLICY "HOD read dept weekly_reports" ON weekly_reports FOR SELECT USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE department_id = get_hod_dept()));
CREATE POLICY "HOD read dept feedback" ON faculty_feedback FOR SELECT USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE department_id = get_hod_dept()));
CREATE POLICY "HOD read dept workloads" ON workloads FOR SELECT USING (faculty_id IN (SELECT id FROM adjunct_faculty WHERE department_id = get_hod_dept()));

-- Alerts: Recipient scoped
CREATE POLICY "Read own alerts" ON alerts FOR SELECT USING (recipient_id = auth.uid() OR is_admin());
-- Insert restricted to service role/edge functions, handled automatically by Supabase by not adding an INSERT policy for authenticated users.
