/**
 * Supabase Client Queries for Student Dashboard
 * Note: Assumes a configured Supabase client instance.
 * Replace `any` with actual Supabase client type in production.
 */

export const getStudentOverview = async (supabase: any, studentId: string) => {
  // 1. Get Attendance
  const { data: attendance } = await supabase
    .from('attendance')
    .select('percentage')
    .eq('student_id', studentId)
    .single();

  // 2. Get Pending Assignments Count
  const { count: pendingAssignments } = await supabase
    .from('submissions')
    .select('id', { count: 'exact' })
    .eq('student_id', studentId)
    .eq('status', 'pending');

  // 3. Get Upcoming Classes Count (Today)
  const today = new Date().toISOString().split('T')[0];
  const { count: upcomingClasses } = await supabase
    .from('schedule_events')
    .select('id', { count: 'exact' })
    .eq('student_id', studentId)
    .eq('type', 'class')
    .gte('start_time', `${today}T00:00:00Z`)
    .lte('start_time', `${today}T23:59:59Z`);

  // 4. Get Student Profile (CGPA, SGPA, Career Score)
  const { data: profile } = await supabase
    .from('students')
    .select('cgpa, sgpa, credits_completed, career_score, advisor_id')
    .eq('id', studentId)
    .single();

  return {
    attendance: attendance?.percentage || 0,
    pendingAssignments: pendingAssignments || 0,
    upcomingClasses: upcomingClasses || 0,
    profile
  };
};

export const getAcademicProgress = async (supabase: any, studentId: string) => {
  const { data: courses } = await supabase
    .from('student_courses')
    .select(`
      progress_percent,
      status,
      course_id,
      courses ( name, code )
    `)
    .eq('student_id', studentId);
  return courses;
};

export const getSmartSchedule = async (supabase: any, studentId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const { data: events } = await supabase
    .from('schedule_events')
    .select('*')
    .eq('student_id', studentId)
    .gte('start_time', `${today}T00:00:00Z`)
    .lte('start_time', `${today}T23:59:59Z`)
    .order('start_time', { ascending: true });
  return events;
};

export const getAssignmentCenter = async (supabase: any, studentId: string) => {
  // Joins submissions with assignments to get details
  const { data: submissions } = await supabase
    .from('submissions')
    .select(`
      id,
      status,
      grade,
      feedback_text,
      assignments ( id, title, due_date, course_id, courses(name) )
    `)
    .eq('student_id', studentId)
    .order('assignments(due_date)', { ascending: true });
  return submissions;
};

export const getCareerAndSkills = async (supabase: any, studentId: string) => {
  const { data: skills } = await supabase
    .from('skills')
    .select('skill_name, proficiency_percent')
    .eq('student_id', studentId);
    
  // Mock AI recommendations for now
  const aiRecommendations = [
    { title: 'Advanced Data Structures', reason: 'Matches your high proficiency in algorithms.' },
    { title: 'Public Speaking Seminars', reason: 'Recommended to boost your overall career score.' }
  ];

  return { skills, aiRecommendations };
};

export const submitFeedback = async (supabase: any, studentId: string, targetType: 'faculty' | 'advisor', targetId: string, rating: number, comments: string) => {
  const { data, error } = await supabase
    .from('student_feedback')
    .insert([{
      student_id: studentId,
      target_type: targetType,
      target_id: targetId,
      rating,
      comments
    }]);
  return { data, error };
};

export const bookAdvisorMeeting = async (supabase: any, studentId: string, advisorId: string, notes: string) => {
  const { data, error } = await supabase
    .from('advisor_meetings')
    .insert([{
      student_id: studentId,
      advisor_id: advisorId,
      notes,
      status: 'requested'
    }]);
  return { data, error };
};

export const getLearningResources = async (supabase: any, studentId: string) => {
  // 1. Get enrolled course IDs
  const { data: enrollments } = await supabase
    .from('student_courses')
    .select('course_id')
    .eq('student_id', studentId)
    .eq('status', 'enrolled');
    
  if (!enrollments || enrollments.length === 0) return [];
  
  const courseIds = enrollments.map((e: any) => e.course_id);
  
  // 2. Fetch resources for those courses
  const { data: resources } = await supabase
    .from('learning_resources')
    .select('*, courses(name)')
    .in('course_id', courseIds);
    
  return resources;
};
