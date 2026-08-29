import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://psbntblozdxlwdkvcdmo.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzYm50YmxvemR4bHdka3ZjZG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMDMwODQsImV4cCI6MjEwMzU3OTA4NH0.LmfN_4axcGNuN-Th4wlbNQ6KOMR_iHBBNltMpmt62EI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
