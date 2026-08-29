const supabase = require('../config/supabase');

// HOD Dashboard: Department-wide KPIs + Alerts
const getHODStats = async (req, res) => {
  const [facultyCount, alerts] = await Promise.all([
    supabase('adjunct_faculty').count(),
    supabase('alerts').select('select=*&order=timestamp.desc&limit=10'),
  ]);
  return res.json({ facultyCount, alerts: Array.isArray(alerts) ? alerts : [] });
};

// HOD Dashboard: Faculty Roster
const getFacultyRoster = async (req, res) => {
  const data = await supabase('profiles').select('select=*&role=in.(adjunct_faculty,hod,advisor)&order=role.asc');
  return res.json({ roster: Array.isArray(data) ? data : [] });
};

// Advisor Dashboard: Assigned Students
const getAdvisorStudents = async (req, res) => {
  const { advisorId } = req.params;
  const data = await supabase('advisor_student_mapping').select(
    `select=*,students(profile_id,semester,cgpa,attendance)&advisor_id=eq.${advisorId}&status=eq.active`
  );
  return res.json({ students: Array.isArray(data) ? data : [] });
};

// Student Dashboard: Attendance and course data
const getStudentData = async (req, res) => {
  const { studentId } = req.params;
  const data = await supabase('students').selectOne(`select=*&id=eq.${studentId}`);
  return res.json({ student: data });
};

// Submit faculty feedback
const submitFeedback = async (req, res) => {
  const payload = req.body;
  const result = await supabase('faculty_feedback').insert(payload);
  if (result && result.code) return res.status(500).json({ error: result.message });
  return res.json({ success: true });
};

module.exports = { getHODStats, getFacultyRoster, getAdvisorStudents, getStudentData, submitFeedback };
