const supabase = require('../config/supabase');

// Simulated Auth: Look up user by email via Supabase REST
const loginByEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  const data = await supabase('profiles').selectOne(`email=eq.${encodeURIComponent(email)}&select=*`);
  if (!data || data.code) {
    return res.status(401).json({ error: 'No account found for this email.' });
  }
  return res.json({ user: data });
};

// Get all demo accounts for the login screen
const getDemoAccounts = async (req, res) => {
  const data = await supabase('profiles').select('select=id,name,email,role&order=role.asc');
  return res.json({ accounts: Array.isArray(data) ? data : [] });
};

module.exports = { loginByEmail, getDemoAccounts };
