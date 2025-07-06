import { createClient } from '@supabase/supabase-js'

// You need to replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://jpjoppwsmjjnfcutkfct.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwam9wcHdzbWpqbmZjdXRrZmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTAwNzIsImV4cCI6MjA2NzM4NjA3Mn0.RSRdP5hHQJb3w_qc5zASZf95WP_zDy3SgNxoXtf-IpE'

if(SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})