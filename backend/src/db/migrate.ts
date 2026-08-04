import { sql } from './database.js';
import { DEFAULT_GALLERY, DEFAULT_PROFILE, DEFAULT_SERVICES } from './seedData.js';

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS profile (
      id TEXT PRIMARY KEY,
      business_name TEXT NOT NULL,
      artist_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      instagram TEXT NOT NULL,
      instagram_url TEXT NOT NULL,
      location TEXT NOT NULL,
      experience TEXT NOT NULL,
      bio TEXT NOT NULL,
      cover_photo TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    starting_price TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      price TEXT,
      image_url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO profile (
      id,
      business_name,
      artist_name,
      phone,
      whatsapp,
      instagram,
      instagram_url,
      location,
      experience,
      bio,
      cover_photo
    ) VALUES (
      'default',
      ${DEFAULT_PROFILE.businessName},
      ${DEFAULT_PROFILE.artistName},
      ${DEFAULT_PROFILE.phone},
      ${DEFAULT_PROFILE.whatsapp},
      ${DEFAULT_PROFILE.instagram},
      ${DEFAULT_PROFILE.instagramUrl},
      ${DEFAULT_PROFILE.location},
      ${DEFAULT_PROFILE.experience},
      ${DEFAULT_PROFILE.bio},
      ${DEFAULT_PROFILE.coverPhoto}
    )
    ON CONFLICT (id) DO UPDATE SET
      business_name = EXCLUDED.business_name,
      artist_name = EXCLUDED.artist_name,
      phone = EXCLUDED.phone,
      whatsapp = EXCLUDED.whatsapp,
      instagram = EXCLUDED.instagram,
      instagram_url = EXCLUDED.instagram_url,
      location = EXCLUDED.location,
      experience = EXCLUDED.experience,
      bio = EXCLUDED.bio,
      cover_photo = EXCLUDED.cover_photo,
      updated_at = NOW()
  `;

  for (const [index, service] of DEFAULT_SERVICES.entries()) {
    await sql`
      INSERT INTO services (
        id,
        title,
        description,
        image_url,
        starting_price,
        sort_order
      ) VALUES (
        ${service.id},
        ${service.title},
      ${service.description},
      ${service.imageUrl},
      ${service.startingPrice ?? null},
        ${index}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        image_url = EXCLUDED.image_url,
        starting_price = EXCLUDED.starting_price,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW()
    `;
  }

  for (const [index, item] of DEFAULT_GALLERY.entries()) {
    await sql`
      INSERT INTO gallery (
        id,
        title,
        category,
        description,
        price,
        image_url,
        sort_order
      ) VALUES (
        ${item.id},
        ${item.title},
        ${item.category},
      ${item.description ?? null},
      ${item.price ?? null},
        ${item.imageUrl},
        ${index}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        sort_order = EXCLUDED.sort_order,
        updated_at = NOW()
    `;
  }

  return {
    profile: 1,
    services: DEFAULT_SERVICES.length,
    gallery: DEFAULT_GALLERY.length,
  };
}

const entryPoint = process.argv[1] ?? '';

if (entryPoint.endsWith('migrate.ts') || entryPoint.endsWith('migrate.js')) {
  migrate()
    .then((result) => {
      console.log('Database migration complete:', result);
    })
    .catch((error) => {
      console.error('Database migration failed:', error);
      process.exitCode = 1;
    });
}

export { migrate };
