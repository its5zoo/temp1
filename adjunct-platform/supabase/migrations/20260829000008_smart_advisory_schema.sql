-- ==========================================
-- STEP 1: SMART ADVISORY SCHEDULING SCHEMA
-- ==========================================

-- 1. EXTEND ADVISORS TABLE
ALTER TABLE advisors 
ADD COLUMN IF NOT EXISTS max_capacity INT DEFAULT 150,
ADD COLUMN IF NOT EXISTS current_workload_score NUMERIC DEFAULT 0;

-- Ensure enums exist safely
DO $$ BEGIN CREATE TYPE risk_level_enum AS ENUM ('low', 'medium', 'high'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE mapping_status_enum AS ENUM ('active', 'transferred'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE meeting_status_enum AS ENUM ('requested', 'confirmed', 'completed', 'cancelled'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE urgency_enum AS ENUM ('normal', 'high'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE recommendation_status_enum AS ENUM ('pending', 'approved', 'rejected'); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. STUDENT RISK SCORES
CREATE TABLE IF NOT EXISTS student_risk_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    attendance_percent NUMERIC,
    cgpa NUMERIC,
    backlog_count INT,
    risk_level risk_level_enum,
    risk_points NUMERIC, -- low=1, medium=2, high=3
    computed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ADVISOR STUDENT MAPPING
CREATE TABLE IF NOT EXISTS advisor_student_mapping (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status mapping_status_enum DEFAULT 'active',
    transfer_reason TEXT
);

-- 4. ADVISOR WORKLOADS (Historical Tracking)
CREATE TABLE IF NOT EXISTS advisor_workloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    student_count INT,
    weighted_workload_score NUMERIC,
    computed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ADVISOR MEETINGS
CREATE TABLE IF NOT EXISTS advisor_meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    status meeting_status_enum DEFAULT 'requested',
    urgency urgency_enum DEFAULT 'normal',
    notes TEXT
);

-- 6. ADVISOR RECOMMENDATIONS (Overload Rebalancing)
CREATE TABLE IF NOT EXISTS advisor_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    to_advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    student_ids UUID[],
    reason TEXT,
    expected_workload_reduction_percent NUMERIC,
    status recommendation_status_enum DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    decided_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    decided_at TIMESTAMP WITH TIME ZONE
);

-- 7. ADVISOR HEALTH SCORE
CREATE TABLE IF NOT EXISTS advisor_health_score (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    advisor_id UUID REFERENCES advisors(id) ON DELETE CASCADE,
    workload_balance_percent NUMERIC,
    response_time_score NUMERIC,
    student_satisfaction_score NUMERIC,
    meeting_completion_percent NUMERIC,
    overall_score NUMERIC,
    computed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS on the new tables for the Mock MVP environment
ALTER TABLE student_risk_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_student_mapping DISABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_workloads DISABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_meetings DISABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_recommendations DISABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_health_score DISABLE ROW LEVEL SECURITY;
