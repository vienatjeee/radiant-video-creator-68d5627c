
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbpgiquegzqvbtyfkhuh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGdpcXVlZ3pxdmJ0eWZraHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNzk0NDcsImV4cCI6MjA1Njc1NTQ0N30.spf4rlORZVykfy03LYOMK0Qn9EdhuRN_oMY33xrJx1k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
