import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jtqwtkhywqvtbcikqwbs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_qrTMkEA57JlKIr_SqXsYfg_KC3f3uf0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
