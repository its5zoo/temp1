-- ==========================================
-- ADD QUALIFICATIONS & EXPERIENCE TO FACULTY
-- ==========================================

ALTER TABLE adjunct_faculty
ADD COLUMN IF NOT EXISTS qualifications TEXT[],
ADD COLUMN IF NOT EXISTS experience_years INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS previous_institutions TEXT[],
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Seed Jane Doe (Mock ID: 22222222-2222-2222-2222-222222222222)
UPDATE adjunct_faculty
SET qualifications = ARRAY['Ph.D. Computer Science (Stanford)', 'M.S. Software Engineering (MIT)'],
    experience_years = 12,
    previous_institutions = ARRAY['University of California, Berkeley', 'Tech Academy Institute'],
    bio = 'Dr. Jane Doe specializes in distributed systems and cloud architecture. She has over a decade of industry experience and has published numerous papers on parallel computing.'
WHERE profile_id = '22222222-2222-2222-2222-222222222222';

-- Seed Dr. Alan Smith (Mock ID: 33333333-3333-3333-3333-333333333333)
UPDATE adjunct_faculty
SET qualifications = ARRAY['Ph.D. Data Science (CMU)', 'B.S. Mathematics (Oxford)'],
    experience_years = 8,
    previous_institutions = ARRAY['Data Driven Corp', 'National Science Lab'],
    bio = 'Dr. Alan Smith is a passionate educator bridging the gap between theoretical mathematics and applied data science.'
WHERE profile_id = '33333333-3333-3333-3333-333333333333';
