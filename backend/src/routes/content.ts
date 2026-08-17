import { Router } from 'express';
import { supabaseAdmin } from '../db/supabase.js';
import { DEFAULT_GALLERY, DEFAULT_PROFILE, DEFAULT_SERVICES } from '../db/seedData.js';

type ProfilePayload = {
  businessName: string;
  artistName: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  location: string;
  experience: string;
  bio: string;
  coverPhoto: string;
  aboutPhoto?: string;
  gmbLink?: string;
  gmbReviewLink?: string;
  gmbReviewsCount?: string;
  gmbRating?: string;
};

type ServicePayload = {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice?: string;
};

type GalleryPayload = {
  id?: string;
  title: string;
  category: string;
  description?: string;
  price?: string;
  imageUrl: string;
};

export const contentRouter = Router();

// GET /api/content
contentRouter.get('/content', async (_req, res, next) => {
  try {
    const { data: profileRow } = await supabaseAdmin
      .from('profile')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    const { data: servicesRows } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    const { data: galleryRows } = await supabaseAdmin
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    const profile = profileRow
      ? {
          businessName: profileRow.business_name,
          artistName: profileRow.artist_name,
          phone: profileRow.phone,
          whatsapp: profileRow.whatsapp,
          instagram: profileRow.instagram,
          instagramUrl: profileRow.instagram_url,
          location: profileRow.location,
          experience: profileRow.experience,
          bio: profileRow.bio,
          coverPhoto: profileRow.cover_photo,
          aboutPhoto: profileRow.about_photo || profileRow.cover_photo,
          gmbLink: profileRow.gmb_link || DEFAULT_PROFILE.gmbLink,
          gmbReviewLink: profileRow.gmb_review_link || DEFAULT_PROFILE.gmbReviewLink,
          gmbReviewsCount: profileRow.gmb_reviews_count || DEFAULT_PROFILE.gmbReviewsCount,
          gmbRating: profileRow.gmb_rating || DEFAULT_PROFILE.gmbRating,
        }
      : null;

    const services = (servicesRows || []).map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      imageUrl: s.image_url,
      startingPrice: s.starting_price,
    }));

    const gallery = (galleryRows || []).map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      description: g.description,
      price: g.price,
      imageUrl: g.image_url,
    }));

    res.json({
      profile,
      services,
      gallery,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/profile
contentRouter.put('/profile', async (req, res, next) => {
  try {
    const body = req.body as ProfilePayload;

    const upsertObj: Record<string, any> = {
      id: 'default',
      business_name: body.businessName,
      artist_name: body.artistName,
      phone: body.phone,
      whatsapp: body.whatsapp,
      instagram: body.instagram,
      instagram_url: body.instagramUrl,
      location: body.location,
      experience: body.experience,
      bio: body.bio,
      cover_photo: body.coverPhoto,
      about_photo: body.aboutPhoto || body.coverPhoto,
      gmb_link: body.gmbLink,
      gmb_review_link: body.gmbReviewLink,
      gmb_reviews_count: body.gmbReviewsCount,
      gmb_rating: body.gmbRating,
      updated_at: new Date().toISOString(),
    };

    let { data, error } = await supabaseAdmin
      .from('profile')
      .upsert(upsertObj, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.warn('Initial profile upsert failed, attempting schema fallback...', error.message);
      // Fallback 1: Try without GMB columns (if only about_photo is in place)
      const cleanGmb = { ...upsertObj };
      delete cleanGmb.gmb_link;
      delete cleanGmb.gmb_review_link;
      delete cleanGmb.gmb_reviews_count;
      delete cleanGmb.gmb_rating;

      let retry = await supabaseAdmin
        .from('profile')
        .upsert(cleanGmb, { onConflict: 'id' })
        .select()
        .single();

      if (retry.error) {
        console.warn('Second profile upsert failed, attempting legacy fallback...', retry.error.message);
        // Fallback 2: Try without about_photo too
        const cleanAll = { ...cleanGmb };
        delete cleanAll.about_photo;

        retry = await supabaseAdmin
          .from('profile')
          .upsert(cleanAll, { onConflict: 'id' })
          .select()
          .single();
      }

      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Supabase profile save error:', error);
      throw error;
    }

    res.json(
      data
        ? {
            businessName: data.business_name,
            artistName: data.artist_name,
            phone: data.phone,
            whatsapp: data.whatsapp,
            instagram: data.instagram,
            instagramUrl: data.instagram_url,
            location: data.location,
            experience: data.experience,
            bio: data.bio,
            coverPhoto: data.cover_photo,
            aboutPhoto: data.about_photo || data.cover_photo,
            gmbLink: data.gmb_link || DEFAULT_PROFILE.gmbLink,
            gmbReviewLink: data.gmb_review_link || DEFAULT_PROFILE.gmbReviewLink,
            gmbReviewsCount: data.gmb_reviews_count || DEFAULT_PROFILE.gmbReviewsCount,
            gmbRating: data.gmb_rating || DEFAULT_PROFILE.gmbRating,
          }
        : null
    );
  } catch (error) {
    next(error);
  }
});

// POST /api/services
contentRouter.post('/services', async (req, res, next) => {
  try {
    const body = req.body as ServicePayload;
    const serviceId = body.id ?? `service-custom-${Date.now()}`;

    const { data, error } = await supabaseAdmin
      .from('services')
      .insert({
        id: serviceId,
        title: body.title,
        description: body.description,
        image_url: body.imageUrl,
        starting_price: body.startingPrice ?? null,
        sort_order: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase create service error:', error);
      throw error;
    }

    res.status(201).json(
      data
        ? {
            id: data.id,
            title: data.title,
            description: data.description,
            imageUrl: data.image_url,
            startingPrice: data.starting_price,
          }
        : null
    );
  } catch (error) {
    next(error);
  }
});

// PUT /api/services/:id
contentRouter.put('/services/:id', async (req, res, next) => {
  try {
    const body = req.body as ServicePayload;
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('services')
      .update({
        title: body.title,
        description: body.description,
        image_url: body.imageUrl,
        starting_price: body.startingPrice ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update service error:', error);
      throw error;
    }

    res.json(
      data
        ? {
            id: data.id,
            title: data.title,
            description: data.description,
            imageUrl: data.image_url,
            startingPrice: data.starting_price,
          }
        : null
    );
  } catch (error) {
    next(error);
  }
});

// DELETE /api/services/:id
contentRouter.delete('/services/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete service error:', error);
      throw error;
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// POST /api/gallery
contentRouter.post('/gallery', async (req, res, next) => {
  try {
    const body = req.body as GalleryPayload;
    const galleryId = body.id ?? `gallery-custom-${Date.now()}`;

    const { data, error } = await supabaseAdmin
      .from('gallery')
      .insert({
        id: galleryId,
        title: body.title,
        category: body.category,
        description: body.description ?? null,
        price: body.price ?? null,
        image_url: body.imageUrl,
        sort_order: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase create gallery item error:', error);
      throw error;
    }

    res.status(201).json(
      data
        ? {
            id: data.id,
            title: data.title,
            category: data.category,
            description: data.description,
            price: data.price,
            imageUrl: data.image_url,
          }
        : null
    );
  } catch (error) {
    next(error);
  }
});

// PUT /api/gallery/:id
contentRouter.put('/gallery/:id', async (req, res, next) => {
  try {
    const body = req.body as GalleryPayload;
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('gallery')
      .update({
        title: body.title,
        category: body.category,
        description: body.description ?? null,
        price: body.price ?? null,
        image_url: body.imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update gallery item error:', error);
      throw error;
    }

    res.json(
      data
        ? {
            id: data.id,
            title: data.title,
            category: data.category,
            description: data.description,
            price: data.price,
            imageUrl: data.image_url,
          }
        : null
    );
  } catch (error) {
    next(error);
  }
});

// DELETE /api/gallery/:id
contentRouter.delete('/gallery/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id);
    if (error) {
      console.error('Supabase delete gallery item error:', error);
      throw error;
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// POST /api/content/reset
contentRouter.post('/content/reset', async (_req, res, next) => {
  try {
    await supabaseAdmin.from('gallery').delete().neq('id', '');
    await supabaseAdmin.from('services').delete().neq('id', '');
    await supabaseAdmin.from('profile').delete().neq('id', '');

    try {
      await supabaseAdmin.from('profile').insert({
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
        gmb_link: DEFAULT_PROFILE.gmbLink,
        gmb_review_link: DEFAULT_PROFILE.gmbReviewLink,
        gmb_reviews_count: DEFAULT_PROFILE.gmbReviewsCount,
        gmb_rating: DEFAULT_PROFILE.gmbRating,
      });
    } catch (e) {
      console.warn('Profile reset failed with full GMB details, falling back to legacy profile columns...', e);
      try {
        await supabaseAdmin.from('profile').insert({
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
      } catch (e2) {
        console.warn('Profile reset failed with about_photo, falling back to completely basic profile...', e2);
        await supabaseAdmin.from('profile').insert({
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
        });
      }
    }

    await supabaseAdmin.from('services').insert(
      DEFAULT_SERVICES.map((s, idx) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        image_url: s.imageUrl,
        starting_price: s.startingPrice ?? null,
        sort_order: idx,
      }))
    );

    await supabaseAdmin.from('gallery').insert(
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

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
