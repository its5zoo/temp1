export type JobPosting = {
  id: string;
  title: string;
  department: string;
  type: 'Part-time' | 'Contract';
  location: 'Remote' | 'Hybrid' | 'On-campus';
  postedDate: string;
  status: 'Active' | 'Closed';
  description: string;
};

export type ApplicationStatus = 'Applied' | 'Screening' | 'Interview' | 'Selected' | 'Onboarding';

export type Applicant = {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  experienceYears: number;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
};

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'JOB-001',
    title: 'Adjunct Professor - Computer Science',
    department: 'School of Engineering',
    type: 'Part-time',
    location: 'Hybrid',
    postedDate: '2026-08-15',
    status: 'Active',
    description: 'Seeking industry experts to teach introductory programming and data structures.'
  },
  {
    id: 'JOB-002',
    title: 'Guest Lecturer - Digital Marketing',
    department: 'Business School',
    type: 'Contract',
    location: 'Remote',
    postedDate: '2026-08-20',
    status: 'Active',
    description: 'Looking for professionals with 5+ years experience in SEO/SEM to lead a 10-week module.'
  }
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'APP-101',
    jobId: 'JOB-001',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    phone: '555-0101',
    experienceYears: 8,
    status: 'Applied',
    appliedDate: '2026-08-28',
    lastUpdated: '2026-08-28'
  },
  {
    id: 'APP-102',
    jobId: 'JOB-001',
    name: 'Bob Smith',
    email: 'bob.s@example.com',
    phone: '555-0102',
    experienceYears: 4,
    status: 'Screening',
    appliedDate: '2026-08-25',
    lastUpdated: '2026-08-26'
  },
  {
    id: 'APP-103',
    jobId: 'JOB-001',
    name: 'Carol Davis',
    email: 'carol.d@example.com',
    phone: '555-0103',
    experienceYears: 12,
    status: 'Interview',
    appliedDate: '2026-08-20',
    lastUpdated: '2026-08-27'
  },
  {
    id: 'APP-104',
    jobId: 'JOB-002',
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '555-0104',
    experienceYears: 6,
    status: 'Selected',
    appliedDate: '2026-08-10',
    lastUpdated: '2026-08-25'
  },
  {
    id: 'APP-105',
    jobId: 'JOB-001',
    name: 'Eve Brown',
    email: 'eve.b@example.com',
    phone: '555-0105',
    experienceYears: 10,
    status: 'Onboarding',
    appliedDate: '2026-08-01',
    lastUpdated: '2026-08-29'
  }
];
