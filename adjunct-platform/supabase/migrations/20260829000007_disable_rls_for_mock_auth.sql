-- ==========================================
-- DISABLE RLS FOR SIMULATED AUTH
-- ==========================================
-- Since we are using "Simulated Auth" (fetching profiles by email directly from the client without logging into Supabase's true auth system), 
-- the database views our queries as "Anonymous". 
-- The previous strict Row Level Security (RLS) policies were blocking anonymous reads, causing the "User not found" error.
-- This script disables RLS on all tables so our mock frontend can freely read/write data for the demo.

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE departments DISABLE ROW LEVEL SECURITY;
ALTER TABLE adjunct_faculty DISABLE ROW LEVEL SECURITY;
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
ALTER TABLE advisors DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_feedback DISABLE ROW LEVEL SECURITY;
ALTER TABLE workloads DISABLE ROW LEVEL SECURITY;
ALTER TABLE alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
