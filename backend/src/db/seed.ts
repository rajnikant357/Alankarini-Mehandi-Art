import { supabaseAdmin } from './supabase.js';
import { DEFAULT_GALLERY, DEFAULT_PROFILE, DEFAULT_SERVICES } from './seedData.js';

async function seed() {
  console.log('Seeding Supabase database...');

  // 1. Seed Profile if default does not exist
  const { data: existingProfile } = await supabaseAdmin
    .from('profile')
    .select('*')
    .eq('id', 'default')
    .maybeSingle();

  if (!existingProfile) {
    console.log('Inserting default profile into Supabase...');
    const { error: profileError } = await supabaseAdmin.from('profile').insert({
      id: 'default',
      business_name: DEFAULT_PROFILE.businessName,
      artist_name: DEFAULT_PROFILE.artistName,
      phone: DEFAULT_PROFILE.phone,
      whatsapp: DEFAULT_PROFILE.whatsapp,
      instagram: DEFAULT_PROFILE.instagram,
      instagram_url: DEFAULT_PROFILE.instagramUrl,
      location: DEFAULT_PROFILE.location,
      experience: DEFAULT_PROFILE.experience,
      bio: DEFAULT_PROFILE.bio,
      cover_photo: DEFAULT_PROFILE.coverPhoto,
      about_photo: DEFAULT_PROFILE.aboutPhoto,
    });
    if (profileError) console.error('Profile seed error:', profileError);
  } else {
    console.log('Profile already exists in Supabase.');
  }

  // 2. Seed Services if empty
  const { data: existingServices } = await supabaseAdmin.from('services').select('id');
  if (!existingServices || existingServices.length === 0) {
    console.log('Inserting default services into Supabase...');
    const { error: servicesError } = await supabaseAdmin.from('services').insert(
      DEFAULT_SERVICES.map((s, idx) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        image_url: s.imageUrl,
        starting_price: s.startingPrice ?? null,
        sort_order: idx,
      }))
    );
    if (servicesError) console.error('Services seed error:', servicesError);
  } else {
    console.log(`Supabase already has ${existingServices.length} services.`);
  }

  // 3. Seed Gallery if empty
  const { data: existingGallery } = await supabaseAdmin.from('gallery').select('id');
  if (!existingGallery || existingGallery.length === 0) {
    console.log('Inserting default gallery items into Supabase...');
    const { error: galleryError } = await supabaseAdmin.from('gallery').insert(
      DEFAULT_GALLERY.map((g, idx) => ({
        id: g.id,
        title: g.title,
        category: g.category,
        description: g.description ?? null,
        price: g.price ?? null,
        image_url: g.imageUrl,
        sort_order: idx,
      }))
    );
    if (galleryError) console.error('Gallery seed error:', galleryError);
  } else {
    console.log(`Supabase already has ${existingGallery.length} gallery items.`);
  }

  console.log('Supabase database seeding process finished successfully!');
}

seed().catch((err) => {
  console.error('Seed execution error:', err);
  process.exit(1);
});
