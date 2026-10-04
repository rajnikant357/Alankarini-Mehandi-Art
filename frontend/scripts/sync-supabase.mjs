import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtqwtkhywqvtbcikqwbs.supabase.co';
const supabaseAnonKey = 'sb_publishable_qrTMkEA57JlKIr_SqXsYfg_KC3f3uf0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('Connecting to Supabase...');
  
  // 1. Update Profile cover_photo and about_photo
  const { error: profileErr } = await supabase.from('profile').update({
    cover_photo: '/images/cover.webp',
    about_photo: '/images/about.webp',
    updated_at: new Date().toISOString(),
  }).eq('id', 'default');
  console.log('Profile update result:', profileErr ? profileErr.message : 'SUCCESS');

  // 2. Update Services images
  const services = [
    { id: 'service-1', image_url: '/images/services/service-1.webp' },
    { id: 'service-2', image_url: '/images/services/service-2.webp' },
    { id: 'service-3', image_url: '/images/services/service-3.webp' },
    { id: 'service-4', image_url: '/images/services/service-4.webp' },
    { id: 'service-5', image_url: '/images/services/service-5.webp' },
    { id: 'service-6', image_url: '/images/services/service-6.webp' },
  ];
  for (const s of services) {
    const { error } = await supabase.from('services').update({
      image_url: s.image_url,
      updated_at: new Date().toISOString(),
    }).eq('id', s.id);
    console.log(`Service ${s.id} update:`, error ? error.message : 'SUCCESS');
  }

  // 3. Update Gallery images
  const gallery = [
    { id: 'gallery-1', image_url: '/images/gallery/gallery-1.webp' },
    { id: 'gallery-2', image_url: '/images/gallery/gallery-2.webp' },
    { id: 'gallery-3', image_url: '/images/gallery/gallery-3.webp' },
    { id: 'gallery-4', image_url: '/images/gallery/gallery-4.webp' },
    { id: 'gallery-5', image_url: '/images/gallery/gallery-5.webp' },
    { id: 'gallery-6', image_url: '/images/gallery/gallery-6.webp' },
    { id: 'gallery-7', image_url: '/images/gallery/gallery-7.webp' },
    { id: 'gallery-8', image_url: '/images/gallery/gallery-8.webp' },
  ];
  for (const g of gallery) {
    const { error } = await supabase.from('gallery').update({
      image_url: g.image_url,
      updated_at: new Date().toISOString(),
    }).eq('id', g.id);
    console.log(`Gallery ${g.id} update:`, error ? error.message : 'SUCCESS');
  }

  console.log('Finished updating Supabase data.');
  process.exit(0);
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
