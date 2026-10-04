import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';

function loadEnv() {
  const envPath = path.resolve('frontend/.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}
loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be set in frontend/.env or environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  const { data: gallery } = await supabase.from('gallery').select('*');
  console.log(`Gallery rows count: ${gallery?.length}`);
  gallery?.forEach(g => {
    const len = JSON.stringify(g).length;
    console.log(`Gallery [${g.id}] ${g.title}: ${Math.round(len/1024)} KB, img len: ${g.image_url?.length}, start: ${g.image_url?.substring(0, 30)}`);
  });

  const { data: services } = await supabase.from('services').select('*');
  console.log(`\nServices rows count: ${services?.length}`);
  services?.forEach(s => {
    const len = JSON.stringify(s).length;
    console.log(`Service [${s.id}] ${s.title}: ${Math.round(len/1024)} KB, img len: ${s.image_url?.length}, start: ${s.image_url?.substring(0, 30)}`);
  });

  const { data: profile } = await supabase.from('profile').select('*');
  console.log(`\nProfile rows count: ${profile?.length}`);
  profile?.forEach(p => {
    const len = JSON.stringify(p).length;
    console.log(`Profile [${p.id}]: ${Math.round(len/1024)} KB, cover len: ${p.cover_photo?.length}, about len: ${p.about_photo?.length}`);
  });
  process.exit(0);
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});
