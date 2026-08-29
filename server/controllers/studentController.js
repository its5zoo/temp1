// In-memory Stateful Store for Student Portal (Aarav Sharma - 2024CS101)

const studentProfile = {
  id: 'u_stu_1',
  name: 'Aarav Sharma',
  rollNo: '2024CS101',
  email: 'aarav.student@univ.edu.in',
  department: 'Computer Science & Engineering',
  batch: '2022 - 2026',
  currentSemester: 5,
  section: 'A',
  cgpa: 8.74,
  sgpa: 8.90,
  earnedCredits: 118,
  totalCreditsRequired: 160,
  semesterCredits: 22,
  academicStanding: "Dean's List (Top 5%)",
  overallAttendance: 78.2, // Below 80% to demonstrate dynamic calculator
  attendanceCriteria: 80.0
};

// 6 Max Enrolled Subjects for Semester 5
let studentCourses = [
  {
    id: 'crs_1',
    code: 'CS301',
    title: 'Advanced Cloud Computing',
    credits: 4,
    type: 'Core Theory',
    instructor: 'Prof. Priya Sharma (Adjunct Faculty)',
    room: 'Lecture Hall 4B',
    schedule: 'Mon, Wed, Fri (09:30 AM - 11:00 AM)',
    attendance: 76.5,
    totalClasses: 34,
    attendedClasses: 26,
    classesNeededFor80: 6, // (26 + x) / (34 + x) >= 0.8 => 26 + x >= 27.2 + 0.8x => 0.2x >= 1.2 => x = 6
    syllabusPercent: 64,
    completedWeeks: 9,
    totalWeeks: 14,
    assignmentsDue: 1,
    nextAssignment: 'Kubernetes Multi-Pod Helm Deployment',
    dueDate: 'Sep 02, 2026'
  },
  {
    id: 'crs_2',
    code: 'CS204',
    title: 'Distributed Systems Practicum',
    credits: 3,
    type: 'Lab Practical',
    instructor: 'Prof. Priya Sharma (Adjunct Faculty)',
    room: 'Lab Complex 201',
    schedule: 'Tue, Thu (11:30 AM - 01:00 PM)',
    attendance: 82.1,
    totalClasses: 28,
    attendedClasses: 23,
    classesNeededFor80: 0,
    syllabusPercent: 71,
    completedWeeks: 10,
    totalWeeks: 14,
    assignmentsDue: 0,
    nextAssignment: 'Raft Consensus Protocol Verification',
    dueDate: 'Sep 08, 2026'
  },
  {
    id: 'crs_3',
    code: 'CS402',
    title: 'High Performance Computing',
    credits: 4,
    type: 'Elective Theory',
    instructor: 'Dr. Rajesh Sharma (HOD)',
    room: 'Seminar Hall 1',
    schedule: 'Mon, Thu (02:00 PM - 03:30 PM)',
    attendance: 85.0,
    totalClasses: 20,
    attendedClasses: 17,
    classesNeededFor80: 0,
    syllabusPercent: 57,
    completedWeeks: 8,
    totalWeeks: 14,
    assignmentsDue: 1,
    nextAssignment: 'CUDA Matrix Multiplication Kernel Benchmarking',
    dueDate: 'Sep 05, 2026'
  },
  {
    id: 'crs_4',
    code: 'CS305',
    title: 'Database Engineering & Indexing',
    credits: 4,
    type: 'Core Theory',
    instructor: 'Dr. Suresh Verma',
    room: 'Hall 3A',
    schedule: 'Tue, Fri (09:00 AM - 10:30 AM)',
    attendance: 74.0,
    totalClasses: 31,
    attendedClasses: 23,
    classesNeededFor80: 9,
    syllabusPercent: 68,
    completedWeeks: 9,
    totalWeeks: 14,
    assignmentsDue: 1,
    nextAssignment: 'B+ Tree Concurrency & Write-Ahead Logging',
    dueDate: 'Sep 04, 2026'
  },
  {
    id: 'crs_5',
    code: 'MA201',
    title: 'Discrete Mathematics & Graph Theory',
    credits: 4,
    type: 'Foundational Theory',
    instructor: 'Prof. Ananya Roy',
    room: 'Hall 2B',
    schedule: 'Wed, Fri (11:30 AM - 01:00 PM)',
    attendance: 80.0,
    totalClasses: 25,
    attendedClasses: 20,
    classesNeededFor80: 0,
    syllabusPercent: 75,
    completedWeeks: 10,
    totalWeeks: 14,
    assignmentsDue: 0,
    nextAssignment: 'Eulerian Graphs & Chromatic Polynomials',
    dueDate: 'Sep 10, 2026'
  },
  {
    id: 'crs_6',
    code: 'HU102',
    title: 'Technical Ethics & Cyber Jurisprudence',
    credits: 3,
    type: 'Humanities Core',
    instructor: 'Dr. Vikram Malhotra',
    room: 'Hall 1C',
    schedule: 'Thu (03:30 PM - 05:00 PM)',
    attendance: 90.0,
    totalClasses: 10,
    attendedClasses: 9,
    classesNeededFor80: 0,
    syllabusPercent: 80,
    completedWeeks: 11,
    totalWeeks: 14,
    assignmentsDue: 0,
    nextAssignment: 'Case Analysis on Algorithmic Bias in Hiring',
    dueDate: 'Sep 12, 2026'
  }
];

// Evaluation Marks for 6 Subjects
let studentResults = [
  {
    courseCode: 'CS301',
    courseTitle: 'Advanced Cloud Computing',
    instructor: 'Prof. Priya Sharma',
    credits: 4,
    classTest1: 18, // out of 20
    cycleTest2: 27, // out of 30
    midterm: 28,   // out of 30
    internals: 19, // out of 20
    totalMarks: 92, // out of 100
    grade: 'A',
    status: 'Excellent'
  },
  {
    courseCode: 'CS204',
    courseTitle: 'Distributed Systems Practicum',
    instructor: 'Prof. Priya Sharma',
    credits: 3,
    classTest1: 19,
    cycleTest2: 28,
    midterm: 27,
    internals: 18,
    totalMarks: 92,
    grade: 'A',
    status: 'Excellent'
  },
  {
    courseCode: 'CS402',
    courseTitle: 'High Performance Computing',
    instructor: 'Dr. Rajesh Sharma',
    credits: 4,
    classTest1: 16,
    cycleTest2: 24,
    midterm: 26,
    internals: 17,
    totalMarks: 83,
    grade: 'A',
    status: 'Good Standing'
  },
  {
    courseCode: 'CS305',
    courseTitle: 'Database Engineering & Indexing',
    instructor: 'Dr. Suresh Verma',
    credits: 4,
    classTest1: 15,
    cycleTest2: 23,
    midterm: 25,
    internals: 16,
    totalMarks: 79,
    grade: 'B',
    status: 'Needs Polish'
  },
  {
    courseCode: 'MA201',
    courseTitle: 'Discrete Mathematics',
    instructor: 'Prof. Ananya Roy',
    credits: 4,
    classTest1: 17,
    cycleTest2: 25,
    midterm: 28,
    internals: 18,
    totalMarks: 88,
    grade: 'A',
    status: 'Strong'
  },
  {
    courseCode: 'HU102',
    courseTitle: 'Technical Ethics',
    instructor: 'Dr. Vikram Malhotra',
    credits: 3,
    classTest1: 18,
    cycleTest2: 26,
    midterm: 27,
    internals: 19,
    totalMarks: 90,
    grade: 'A',
    status: 'Excellent'
  }
];

// Multi-Tier Performance Progression Data (Recharts)
const performanceTrends = {
  monthlyTests: [
    { month: 'Jun', classTestAvg: 78.5, cycleTestAvg: 80.0, benchmark: 75.0 },
    { month: 'Jul', classTestAvg: 82.0, cycleTestAvg: 84.5, benchmark: 75.0 },
    { month: 'Aug', classTestAvg: 86.8, cycleTestAvg: 89.2, benchmark: 75.0 },
    { month: 'Sep (Proj)', classTestAvg: 88.5, cycleTestAvg: 91.0, benchmark: 75.0 }
  ],
  semesterProgression: [
    { semester: 'Sem 1', sgpa: 8.42, cgpa: 8.42, creditsEarned: 24 },
    { semester: 'Sem 2', sgpa: 8.60, cgpa: 8.51, creditsEarned: 24 },
    { semester: 'Sem 3', sgpa: 8.85, cgpa: 8.62, creditsEarned: 24 },
    { semester: 'Sem 4', sgpa: 8.95, cgpa: 8.70, creditsEarned: 24 },
    { semester: 'Sem 5 (Current)', sgpa: 8.90, cgpa: 8.74, creditsEarned: 22 }
  ],
  subjectComparison: [
    { subject: 'CS301 (Cloud)', score: 92, classAvg: 78 },
    { subject: 'CS204 (Dist Sys)', score: 92, classAvg: 80 },
    { subject: 'CS402 (HPC)', score: 83, classAvg: 74 },
    { subject: 'CS305 (DBMS)', score: 79, classAvg: 72 },
    { subject: 'MA201 (Math)', score: 88, classAvg: 76 },
    { subject: 'HU102 (Ethics)', score: 90, classAvg: 82 }
  ]
};

// Weekly Schedule Matrix (Mon - Fri)
const weeklyTimetable = [
  { day: 'Monday', time: '09:30 AM - 11:00 AM', course: 'CS301: Cloud Computing', room: 'Lecture Hall 4B', instructor: 'Prof. Priya Sharma', type: 'Lecture' },
  { day: 'Monday', time: '02:00 PM - 03:30 PM', course: 'CS402: HPC Systems', room: 'Seminar Hall 1', instructor: 'Dr. Rajesh Sharma', type: 'Lecture' },
  
  { day: 'Tuesday', time: '09:00 AM - 10:30 AM', course: 'CS305: Database Engineering', room: 'Hall 3A', instructor: 'Dr. Suresh Verma', type: 'Lecture' },
  { day: 'Tuesday', time: '11:30 AM - 01:00 PM', course: 'CS204: Distributed Systems Lab', room: 'Lab Complex 201', instructor: 'Prof. Priya Sharma', type: 'Lab' },

  { day: 'Wednesday', time: '09:30 AM - 11:00 AM', course: 'CS301: Cloud Computing', room: 'Lecture Hall 4B', instructor: 'Prof. Priya Sharma', type: 'Lecture' },
  { day: 'Wednesday', time: '11:30 AM - 01:00 PM', course: 'MA201: Discrete Mathematics', room: 'Hall 2B', instructor: 'Prof. Ananya Roy', type: 'Lecture' },

  { day: 'Thursday', time: '11:30 AM - 01:00 PM', course: 'CS204: Distributed Systems Lab', room: 'Lab Complex 201', instructor: 'Prof. Priya Sharma', type: 'Lab' },
  { day: 'Thursday', time: '02:00 PM - 03:30 PM', course: 'CS402: HPC Systems', room: 'Seminar Hall 1', instructor: 'Dr. Rajesh Sharma', type: 'Lecture' },
  { day: 'Thursday', time: '03:30 PM - 05:00 PM', course: 'HU102: Technical Ethics', room: 'Hall 1C', instructor: 'Dr. Vikram Malhotra', type: 'Lecture' },

  { day: 'Friday', time: '09:00 AM - 10:30 AM', course: 'CS305: Database Engineering', room: 'Hall 3A', instructor: 'Dr. Suresh Verma', type: 'Lecture' },
  { day: 'Friday', time: '09:30 AM - 11:00 AM', course: 'CS301: Cloud Computing', room: 'Lecture Hall 4B', instructor: 'Prof. Priya Sharma', type: 'Lecture' },
  { day: 'Friday', time: '11:30 AM - 01:00 PM', course: 'MA201: Discrete Mathematics', room: 'Hall 2B', instructor: 'Prof. Ananya Roy', type: 'Lecture' }
];

// Day-wise Attendance Records (Last 14 Sessions)
let daywiseAttendance = [
  { date: '2026-08-29', day: 'Friday', course: 'CS301', status: 'Present', time: '09:30 AM', room: 'Hall 4B' },
  { date: '2026-08-29', day: 'Friday', course: 'MA201', status: 'Present', time: '11:30 AM', room: 'Hall 2B' },
  { date: '2026-08-28', day: 'Thursday', course: 'CS204', status: 'Absent', time: '11:30 AM', room: 'Lab 201' },
  { date: '2026-08-28', day: 'Thursday', course: 'CS402', status: 'Present', time: '02:00 PM', room: 'Seminar 1' },
  { date: '2026-08-27', day: 'Wednesday', course: 'CS301', status: 'Present', time: '09:30 AM', room: 'Hall 4B' },
  { date: '2026-08-27', day: 'Wednesday', course: 'MA201', status: 'Present', time: '11:30 AM', room: 'Hall 2B' },
  { date: '2026-08-26', day: 'Tuesday', course: 'CS305', status: 'Absent', time: '09:00 AM', room: 'Hall 3A' },
  { date: '2026-08-26', day: 'Tuesday', course: 'CS204', status: 'Present', time: '11:30 AM', room: 'Lab 201' },
  { date: '2026-08-25', day: 'Monday', course: 'CS301', status: 'Present', time: '09:30 AM', room: 'Hall 4B' },
  { date: '2026-08-25', day: 'Monday', course: 'CS402', status: 'Present', time: '02:00 PM', room: 'Seminar 1' },
  { date: '2026-08-22', day: 'Friday', course: 'CS301', status: 'Absent', time: '09:30 AM', room: 'Hall 4B' },
  { date: '2026-08-22', day: 'Friday', course: 'CS305', status: 'Present', time: '09:00 AM', room: 'Hall 3A' },
  { date: '2026-08-21', day: 'Thursday', course: 'CS204', status: 'Present', time: '11:30 AM', room: 'Lab 201' },
  { date: '2026-08-20', day: 'Wednesday', course: 'CS301', status: 'Present', time: '09:30 AM', room: 'Hall 4B' }
];

// Fee Structure & Ledger
let studentFees = {
  semester: 'Semester 5 (Fall 2026)',
  totalTuition: 125000,
  scholarshipDiscount: 15000,
  netPayable: 110000,
  amountPaid: 85000,
  balanceDue: 25000,
  dueDate: 'Sep 15, 2026',
  status: 'Overdue (₹25,000)',
  ledger: [
    { id: 'tx_1', item: 'Semester 5 Tuition Fee', amount: 95000, type: 'Charge', date: '2026-07-15', status: 'Applied' },
    { id: 'tx_2', item: 'Specialized Cloud & HPC Lab Fee', amount: 20000, type: 'Charge', date: '2026-07-15', status: 'Applied' },
    { id: 'tx_3', item: 'Examination & Evaluation Fee', amount: 10000, type: 'Charge', date: '2026-07-15', status: 'Applied' },
    { id: 'tx_4', item: 'Merit Scholarship Concession', amount: -15000, type: 'Credit', date: '2026-07-20', status: 'Applied' },
    { id: 'tx_5', item: 'Online Fee Installment 1 (NetBanking)', amount: -85000, type: 'Payment', date: '2026-07-25', status: 'Success (Ref: TXN94812)' }
  ]
};

// Feedback Submissions Store
let facultyFeedbackList = [
  {
    id: 'fb_1',
    facultyName: 'Prof. Priya Sharma (Adjunct Faculty)',
    courseCode: 'CS301',
    courseTitle: 'Advanced Cloud Computing',
    rating: 5,
    clarityRating: 5,
    doubtSupportRating: 5,
    comments: 'Excellent industry perspectives and real-world Kubernetes hands-on labs.',
    date: '2026-08-24'
  }
];

// Doubts & AI Inquiries Store
let studentDoubts = [
  {
    id: 'dbt_1',
    courseCode: 'CS301',
    subject: 'Kubernetes Pod Scheduling Ingress Routing Doubt',
    instructor: 'Prof. Priya Sharma',
    question: 'How do we handle custom TLS termination when routing via Traefik Ingress controller in the Lab 4 environment?',
    status: 'Resolved',
    timestamp: 'Yesterday at 04:15 PM',
    reply: 'Refer to Slide 24 in Module 4 catalog. You need to bind the cert-manager Secret object to the Ingress TLS spec block.',
    aiAssistance: 'Suggested configuration: `tls: - hosts: [app.univ.in] secretName: univ-tls-cert`'
  },
  {
    id: 'dbt_2',
    courseCode: 'CS204',
    subject: 'Raft Log Replication Split-Brain Scenarios',
    instructor: 'Prof. Priya Sharma',
    question: 'In edge cases where a network partition occurs with an even number of nodes, how does quorum election prevent split-brain?',
    status: 'Pending',
    timestamp: 'Today at 10:20 AM',
    reply: null,
    aiAssistance: 'Raft requires strict majority `(N/2 + 1)`. In an even split (e.g. 2 vs 2 on 4 nodes), neither partition achieves 3 votes, thus halting election safely.'
  }
];

// Controller Handlers
exports.getStudentOverview = (req, res) => {
  // Calculate total classes needed across courses where attendance < 80%
  const lowAttendanceCourses = studentCourses.filter(c => c.attendance < 80);
  const totalClassesToAttend = lowAttendanceCourses.reduce((sum, c) => sum + c.classesNeededFor80, 0);

  res.json({
    success: true,
    profile: studentProfile,
    coursesSummary: {
      totalCourses: studentCourses.length,
      lowAttendanceCount: lowAttendanceCourses.length,
      totalClassesToAttend,
      assignmentsDue: studentCourses.reduce((sum, c) => sum + c.assignmentsDue, 0)
    },
    feesSummary: {
      balanceDue: studentFees.balanceDue,
      dueDate: studentFees.dueDate,
      status: studentFees.status
    },
    upcomingLectures: weeklyTimetable.slice(0, 3)
  });
};

exports.getStudentCourses = (req, res) => {
  res.json({
    success: true,
    courses: studentCourses
  });
};

exports.getStudentResults = (req, res) => {
  res.json({
    success: true,
    results: studentResults,
    trends: performanceTrends,
    cgpa: studentProfile.cgpa,
    sgpa: studentProfile.sgpa
  });
};

exports.getStudentTimetable = (req, res) => {
  res.json({
    success: true,
    timetable: weeklyTimetable
  });
};

exports.getStudentAttendance = (req, res) => {
  res.json({
    success: true,
    overallAttendance: studentProfile.overallAttendance,
    criteria: studentProfile.attendanceCriteria,
    courseAttendance: studentCourses.map(c => ({
      code: c.code,
      title: c.title,
      attendance: c.attendance,
      attended: c.attendedClasses,
      total: c.totalClasses,
      neededFor80: c.classesNeededFor80,
      isEligible: c.attendance >= 80
    })),
    daywiseLog: daywiseAttendance
  });
};

exports.getStudentFees = (req, res) => {
  res.json({
    success: true,
    fees: studentFees
  });
};

exports.payStudentFee = (req, res) => {
  const { amount } = req.body;
  const payAmt = Number(amount) || studentFees.balanceDue;
  studentFees.amountPaid += payAmt;
  studentFees.balanceDue = Math.max(0, studentFees.balanceDue - payAmt);
  studentFees.status = studentFees.balanceDue === 0 ? 'All Paid' : `Partial (₹${studentFees.balanceDue} Due)`;
  studentFees.ledger.push({
    id: `tx_${Date.now()}`,
    item: 'Online Tuition Payment (UPI / NetBanking)',
    amount: -payAmt,
    type: 'Payment',
    date: new Date().toISOString().split('T')[0],
    status: `Success (Ref: TXN${Math.floor(100000 + Math.random() * 900000)})`
  });

  res.json({
    success: true,
    message: `Payment of ₹${payAmt.toLocaleString('en-IN')} processed successfully.`,
    fees: studentFees
  });
};

exports.submitFacultyFeedback = (req, res) => {
  const { facultyName, courseCode, rating, clarityRating, doubtSupportRating, comments } = req.body;
  const newFb = {
    id: `fb_${Date.now()}`,
    facultyName: facultyName || 'Prof. Priya Sharma',
    courseCode: courseCode || 'CS301',
    courseTitle: studentCourses.find(c => c.code === courseCode)?.title || 'Course Evaluation',
    rating: Number(rating) || 5,
    clarityRating: Number(clarityRating) || 5,
    doubtSupportRating: Number(doubtSupportRating) || 5,
    comments: comments || 'Very effective pedagogy and practical exercises.',
    date: new Date().toISOString().split('T')[0]
  };

  facultyFeedbackList.unshift(newFb);
  res.json({
    success: true,
    message: 'Feedback submitted anonymously to Department Quality Cell.',
    feedback: newFb
  });
};

exports.getStudentDoubts = (req, res) => {
  res.json({
    success: true,
    doubts: studentDoubts
  });
};

exports.createStudentDoubt = (req, res) => {
  const { courseCode, subject, question } = req.body;
  const targetCourse = studentCourses.find(c => c.code === courseCode) || studentCourses[0];
  
  const newDoubt = {
    id: `dbt_${Date.now()}`,
    courseCode: targetCourse.code,
    subject: subject || 'Conceptual Query',
    instructor: targetCourse.instructor,
    question: question || '',
    status: 'Pending',
    timestamp: 'Just now',
    reply: null,
    aiAssistance: `AI Academic Copilot Insight for ${targetCourse.code}: Please check key theorem proofs and prerequisite slides in Chapter 3.`
  };

  studentDoubts.unshift(newDoubt);
  res.json({
    success: true,
    message: 'Doubt ticket submitted to course instructor.',
    doubt: newDoubt
  });
};
