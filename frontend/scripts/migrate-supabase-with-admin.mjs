import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://jtqwtkhywqvtbcikqwbs.supabase.co';
const supabaseSecretKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseSecretKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required to run this script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseSecretKey);

async function run() {
  console.log('Connecting to Supabase with Admin Secret Key...');

  // 1. Fetch gallery-custom item to extract and optimize its image
  const { data: customItems } = await supabase.from('gallery').select('*').eq('id', 'gallery-custom-1785827571616');
  if (customItems && customItems.length > 0) {
    const item = customItems[0];
    if (item.image_url && item.image_url.startsWith('data:image/')) {
      console.log('Found custom gallery item with base64 image. Optimizing with sharp...');
      const base64Data = item.image_url.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      const outDir = path.resolve('frontend/public/images/gallery');
      const fullPath = path.join(outDir, 'gallery-custom-1.webp');
      const thumbPath = path.join(outDir, 'gallery-custom-1-thumb.webp');

      await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(fullPath);

      await sharp(buffer)
        .resize({ width: 400, height: 400, fit: 'cover' })
        .webp({ quality: 75 })
        .toFile(thumbPath);

      console.log(`Saved optimized custom image to ${fullPath}`);
    }
  }

  // 2. Update Profile
  console.log('Updating profile in Supabase...');
  const { data: profData, error: profErr } = await supabase.from('profile').update({
    cover_photo: '/images/cover.webp',
    about_photo: '/images/about.webp',
    updated_at: new Date().toISOString(),
  }).eq('id', 'default').select();
  console.log('Profile update result:', profErr ? profErr.message : `OK (${profData?.length} rows affected)`);

  // 3. Update Services
  console.log('Updating services in Supabase...');
  for (let i = 1; i <= 6; i++) {
    const id = `service-${i}`;
    const { data: servData, error: servErr } = await supabase.from('services').update({
      image_url: `/images/services/service-${i}.webp`,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select();
    console.log(`Service ${id}:`, servErr ? servErr.message : `OK (${servData?.length} rows affected)`);
  }

  // 4. Update Gallery
  console.log('Updating gallery in Supabase...');
  for (let i = 1; i <= 8; i++) {
    const id = `gallery-${i}`;
    const { data: galData, error: galErr } = await supabase.from('gallery').update({
      image_url: `/images/gallery/gallery-${i}.webp`,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select();
    console.log(`Gallery ${id}:`, galErr ? galErr.message : `OK (${galData?.length} rows affected)`);
  }

  // Update custom gallery item
  const { data: custData, error: custErr } = await supabase.from('gallery').update({
    image_url: '/images/gallery/gallery-custom-1.webp',
    updated_at: new Date().toISOString(),
  }).eq('id', 'gallery-custom-1785827571616').select();
  console.log(`Gallery custom:`, custErr ? custErr.message : `OK (${custData?.length} rows affected)`);

  console.log('\n--- VERIFYING NEW SIZES IN SUPABASE ---');
  const { data: finalGal } = await supabase.from('gallery').select('*');
  console.log(`Gallery rows total JSON size: ${Math.round(JSON.stringify(finalGal).length / 1024)} KB`);

  const { data: finalServ } = await supabase.from('services').select('*');
  console.log(`Services rows total JSON size: ${Math.round(JSON.stringify(finalServ).length / 1024)} KB`);

  const { data: finalProf } = await supabase.from('profile').select('*');
  console.log(`Profile row total JSON size: ${Math.round(JSON.stringify(finalProf).length / 1024)} KB`);

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
