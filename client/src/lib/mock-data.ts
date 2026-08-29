export type Role = 'admin' | 'hod' | 'adjunct_faculty' | 'advisor' | 'student';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  department?: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  category: string;
  credits: number;
  instructorId: string;
  studentsEnrolled: number;
  nextSession?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  totalPoints: number;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'Pending' | 'Graded';
  score?: number;
  feedback?: string;
}

export interface Doubt {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  question: string;
  createdAt: string;
  status: 'Open' | 'Resolved';
  slaBreach: boolean;
}

export interface Alert {
  id: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

export type LifecycleStage = 'recruitment' | 'onboarding' | 'training' | 'course_allocation' | 'teaching' | 'weekly_reports' | 'performance_review' | 'contract_renewal' | 'exit';
export type LifecycleStatus = 'locked' | 'current' | 'completed';

export interface FacultyLifecycleStage {
  facultyId: string;
  stage: LifecycleStage;
  status: LifecycleStatus;
}

export interface WeeklyReport {
  id: string;
  facultyId: string;
  weekNumber: number;
  classesConducted: number;
  status: 'draft' | 'submitted';
}

export const MOCK_LIFECYCLE_STAGES: FacultyLifecycleStage[] = [
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'recruitment', status: 'completed' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'onboarding', status: 'completed' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'training', status: 'completed' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'course_allocation', status: 'completed' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'teaching', status: 'current' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'weekly_reports', status: 'current' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'performance_review', status: 'locked' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'contract_renewal', status: 'locked' },
  { facultyId: '22222222-2222-2222-2222-222222222222', stage: 'exit', status: 'locked' },
];

export const MOCK_WEEKLY_REPORTS: WeeklyReport[] = [
  { id: 'wr1', facultyId: '22222222-2222-2222-2222-222222222222', weekNumber: 1, classesConducted: 4, status: 'submitted' },
  { id: 'wr2', facultyId: '22222222-2222-2222-2222-222222222222', weekNumber: 2, classesConducted: 5, status: 'draft' }
];

export const MOCK_PROFILES: Profile[] = [
  { id: '00000000-0000-0000-0000-000000000000', name: 'System Admin', email: 'admin@univ.edu', role: 'admin' },
  { id: '11111111-1111-1111-1111-111111111111', name: 'Dr. Alan Smith', email: 'alan.hod@univ.edu', role: 'hod', department: 'Computer Science' },
  { id: '22222222-2222-2222-2222-222222222222', name: 'Jane Doe', email: 'jane.adjunct@univ.edu', role: 'adjunct_faculty', department: 'Computer Science' },
  { id: '33333333-3333-3333-3333-333333333333', name: 'Mark Evans', email: 'mark.advisor@univ.edu', role: 'advisor', department: 'Computer Science' },
  { id: '44444444-4444-4444-4444-444444444444', name: 'Alice Wong', email: 'alice.student@univ.edu', role: 'student' },
  { id: '55555555-5555-5555-5555-555555555555', name: 'Alex Johnson', email: 'alex.student@univ.edu', role: 'student' },
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'al1', message: 'Workload critical: Jane Doe has >80 workload score (3 assigned courses).', severity: 'high', timestamp: '2026-08-29T08:00:00Z' },
  { id: 'al2', message: 'Advisor overload: Mark Evans has 260 assigned students (>250 limit).', severity: 'medium', timestamp: '2026-08-28T14:30:00Z' }
];

export const MOCK_COURSES: Course[] = [
  { id: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', title: 'Advanced Python Programming', code: 'CS301', category: 'Programming & Technical', credits: 4, instructorId: '22222222-2222-2222-2222-222222222222', studentsEnrolled: 120, nextSession: '2026-09-01T10:00:00Z' },
  { id: 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2', title: 'Machine Learning Basics', code: 'CS402', category: 'Programming & Technical', credits: 3, instructorId: '22222222-2222-2222-2222-222222222222', studentsEnrolled: 85, nextSession: '2026-09-02T14:00:00Z' },
  { id: 'c3', title: 'Startup Incubation', code: 'MGT301', category: 'Management & Business', credits: 2, instructorId: '22222222-2222-2222-2222-222222222222', studentsEnrolled: 50 },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  { id: 's1', assignmentId: 'a1', studentId: '44444444-4444-4444-4444-444444444444', studentName: 'Alice Wong', submittedAt: '2026-08-28T18:30:00Z', status: 'Pending' },
  { id: 's2', assignmentId: 'a1', studentId: '55555555-5555-5555-5555-555555555555', studentName: 'Alex Johnson', submittedAt: '2026-08-28T19:15:00Z', status: 'Pending' },
  { id: 's3', assignmentId: 'a1', studentId: 'stu3', studentName: 'Charlie Davis', submittedAt: '2026-08-28T10:00:00Z', status: 'Graded', score: 85, feedback: 'Good job!' },
];

export const MOCK_DOUBTS: Doubt[] = [
  { id: 'd1', courseId: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', studentId: '44444444-4444-4444-4444-444444444444', studentName: 'Alice Wong', question: 'Could you explain decorators again?', createdAt: '2026-08-29T10:00:00Z', status: 'Open', slaBreach: false },
  { id: 'd2', courseId: 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2', studentId: '55555555-5555-5555-5555-555555555555', studentName: 'Alex Johnson', question: 'Why use ReLU over Sigmoid in hidden layers?', createdAt: '2026-08-28T15:00:00Z', status: 'Open', slaBreach: true },
];
