import type { SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;
let supabasePromise: Promise<SupabaseClient | null> | null = null;

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (supabaseInstance) return supabaseInstance;
  if (supabasePromise) return supabasePromise;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  supabasePromise = (async () => {
    try {
      // Dynamically import Supabase only when an authenticated or database operation is invoked.
      // This completely decouples initial critical rendering (Hero, Navbar) from the Supabase bundle.
      const { createClient } = await import('@supabase/supabase-js');
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
      return supabaseInstance;
    } catch (err) {
      console.warn('Failed to dynamically load Supabase client:', err);
      return null;
    }
  })();

  return supabasePromise;
}
