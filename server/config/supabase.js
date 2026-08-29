const fetch = require('node-fetch');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

// Simple REST query builder for Supabase PostgREST
function supabase(table) {
  const base = `${SUPABASE_URL}/rest/v1/${table}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  return {
    async select(params = '') {
      const res = await fetch(`${base}?${params}`, { headers });
      return res.json();
    },
    async selectOne(params = '') {
      const h = { ...headers, 'Accept': 'application/vnd.pgrst.object+json' };
      const res = await fetch(`${base}?${params}`, { headers: h });
      return res.json();
    },
    async insert(body) {
      const res = await fetch(base, { method: 'POST', headers, body: JSON.stringify(body) });
      return res.json();
    },
    async count() {
      const h = { ...headers, 'Prefer': 'count=exact', 'Accept': 'application/vnd.pgrst.object+json' };
      const res = await fetch(`${base}?select=count`, { headers: h });
      const ct = res.headers.get('content-range');
      return ct ? parseInt(ct.split('/')[1], 10) : 0;
    }
  };
}

module.exports = supabase;
