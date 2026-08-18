import { supabase } from './supabase';
import { DEFAULT_PROFILE } from '../data/defaultData';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'https://alankarini-mehandi-art.onrender.com').replace(/\/$/, '');

type ApiContent = {
  profile: Record<string, unknown> | null;
  services: Array<Record<string, unknown>>;
  gallery: Array<Record<string, unknown>>;
};

async function requestJson<T>(path: string, init?: RequestInit, timeoutMs = 2000): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}/api${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      signal: controller.signal,
      ...init,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function fetchContent(): Promise<ApiContent> {
  if (supabase) {
    try {
      const { data: profileRow } = await supabase.from('profile').select('*').eq('id', 'default').maybeSingle();
      const { data: servicesRows } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
      const { data: galleryRows } = await supabase.from('gallery').select('*').order('sort_order', { ascending: true });

      if (profileRow || (servicesRows && servicesRows.length > 0) || (galleryRows && galleryRows.length > 0)) {
        return {
          profile: profileRow
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
            : null,
          services: (servicesRows || []).map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            imageUrl: s.image_url,
            startingPrice: s.starting_price,
          })),
          gallery: (galleryRows || []).map((g) => ({
            id: g.id,
            title: g.title,
            category: g.category,
            description: g.description,
            price: g.price,
            imageUrl: g.image_url,
          })),
        };
      }
    } catch (supabaseErr) {
      console.warn('Direct Supabase fetch failed, trying API endpoint:', supabaseErr);
    }
  }

  try {
    return await requestJson<ApiContent>('/content');
  } catch (err) {
    console.warn('API request failed:', err);
    return { profile: null, services: [], gallery: [] };
  }
}

export async function saveProfile(payload: any) {
  // Write to Supabase database directly
  if (supabase) {
    try {
      const profileObj: Record<string, any> = {
        id: 'default',
        business_name: payload.businessName,
        artist_name: payload.artistName,
        phone: payload.phone,
        whatsapp: payload.whatsapp,
        instagram: payload.instagram,
        instagram_url: payload.instagramUrl,
        location: payload.location,
        experience: payload.experience,
        bio: payload.bio,
        cover_photo: payload.coverPhoto,
        about_photo: payload.aboutPhoto || payload.coverPhoto,
        gmb_link: payload.gmbLink,
        gmb_review_link: payload.gmbReviewLink,
        gmb_reviews_count: payload.gmbReviewsCount,
        gmb_rating: payload.gmbRating,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profile').upsert(profileObj);
      if (error) {
        console.warn('Initial profile upsert failed, attempting fallback...', error.message);
        // Fallback 1: Try without GMB columns
        const cleanGmb = { ...profileObj };
        delete cleanGmb.gmb_link;
        delete cleanGmb.gmb_review_link;
        delete cleanGmb.gmb_reviews_count;
        delete cleanGmb.gmb_rating;
        
        const { error: errorGmb } = await supabase.from('profile').upsert(cleanGmb);
        if (errorGmb) {
          console.warn('Second profile upsert failed, attempting legacy fallback...', errorGmb.message);
          // Fallback 2: Try without about_photo too
          const cleanAll = { ...cleanGmb };
          delete cleanAll.about_photo;
          await supabase.from('profile').upsert(cleanAll);
        }
      }
    } catch (e) {
      console.warn('Supabase direct profile update error:', e);
    }
  }

  try {
    return await requestJson('/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return payload;
  }
}

export async function createService(payload: any) {
  // Write to Supabase database directly
  if (supabase) {
    try {
      await supabase.from('services').insert({
        id: payload.id ?? `service-custom-${Date.now()}`,
        title: payload.title,
        description: payload.description,
        image_url: payload.imageUrl,
        starting_price: payload.startingPrice ?? null,
      });
    } catch (e) {
      console.warn('Supabase direct service create error:', e);
    }
  }

  try {
    return await requestJson('/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return payload;
  }
}

export async function updateServiceOnServer(id: string, payload: any) {
  if (supabase) {
    try {
      await supabase.from('services').update({
        title: payload.title,
        description: payload.description,
        image_url: payload.imageUrl,
        starting_price: payload.startingPrice ?? null,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    } catch (e) {
      console.warn('Supabase direct service update error:', e);
    }
  }

  try {
    return await requestJson(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return payload;
  }
}

export async function deleteServiceOnServer(id: string) {
  if (supabase) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase direct service delete error:', e);
    }
  }

  try {
    return await requestJson(`/services/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    return undefined;
  }
}

export async function createGalleryItem(payload: any) {
  // Write to Supabase database directly
  if (supabase) {
    try {
      await supabase.from('gallery').insert({
        id: payload.id ?? `gallery-custom-${Date.now()}`,
        title: payload.title,
        category: payload.category,
        description: payload.description ?? null,
        price: payload.price ?? null,
        image_url: payload.imageUrl,
      });
    } catch (e) {
      console.warn('Supabase direct gallery create error:', e);
    }
  }

  try {
    return await requestJson('/gallery', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return payload;
  }
}

export async function updateGalleryItemOnServer(id: string, payload: any) {
  if (supabase) {
    try {
      await supabase.from('gallery').update({
        title: payload.title,
        category: payload.category,
        description: payload.description ?? null,
        price: payload.price ?? null,
        image_url: payload.imageUrl,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    } catch (e) {
      console.warn('Supabase direct gallery update error:', e);
    }
  }

  try {
    return await requestJson(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return payload;
  }
}

export async function deleteGalleryItemOnServer(id: string) {
  if (supabase) {
    try {
      await supabase.from('gallery').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase direct gallery delete error:', e);
    }
  }

  try {
    return await requestJson(`/gallery/${id}`, {
      method: 'DELETE',
    });
  } catch (e) {
    return undefined;
  }
}

export async function resetContentOnServer() {
  return requestJson('/content/reset', {
    method: 'POST',
  });
}
