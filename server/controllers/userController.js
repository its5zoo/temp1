const supabase = require('../config/supabase');

const getAllUsers = async (req, res) => {
  const data = await supabase('profiles').select('select=*&order=name.asc');
  return res.json({ users: Array.isArray(data) ? data : [] });
};

const getFacultyProfile = async (req, res) => {
  const { id } = req.params;
  const profile = await supabase('profiles').selectOne(`select=*&id=eq.${id}`);
  if (!profile || profile.code) return res.status(404).json({ error: 'Profile not found.' });

  let details = null;
  if (profile.role === 'adjunct_faculty') {
    const adjunctData = await supabase('adjunct_faculty').select(
      `select=*,departments(department_name)&profile_id=eq.${id}`
    );
    details = Array.isArray(adjunctData) ? adjunctData[0] : null;
  }
  return res.json({ profile, details });
};

module.exports = { getAllUsers, getFacultyProfile };
