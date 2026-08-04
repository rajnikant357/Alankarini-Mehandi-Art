import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

export const supabaseConfig = {
  url: env.supabaseUrl,
  publishableKey: env.supabasePublishableKey,
  secretKey: env.supabaseSecretKey,
  jwksUrl: env.supabaseJwksUrl,
};

export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
