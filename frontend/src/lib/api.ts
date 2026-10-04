import { getSupabase } from './supabase';
import { DEFAULT_PROFILE } from '../data/defaultData';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'https://alankarini-mehandi-art.onrender.com').replace(/\/$/, '');

export type ApiContent = {
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

// Single-flight deduplication and cache layer to eliminate duplicate network requests
let inFlightContentPromise: Promise<ApiContent> | null = null;
let cachedContent: ApiContent | null = null;

export async function fetchContent(forceRefresh = false): Promise<ApiContent> {
  if (cachedContent && !forceRefresh) {
    return cachedContent;
  }
  if (inFlightContentPromise && !forceRefresh) {
    return inFlightContentPromise;
  }

  inFlightContentPromise = (async () => {
    try {
      const client = await getSupabase();
      if (client) {
        // Parallel fetch using Promise.all to prevent sequential waterfalls
        const [profileRes, servicesRes, galleryRes] = await Promise.all([
          client.from('profile').select('*').eq('id', 'default').maybeSingle(),
          client.from('services').select('*').order('sort_order', { ascending: true }),
          client.from('gallery').select('*').order('sort_order', { ascending: true }),
        ]);

        const profileRow = profileRes.data;
        const servicesRows = servicesRes.data;
        const galleryRows = galleryRes.data;

        if (profileRow || (servicesRows && servicesRows.length > 0) || (galleryRows && galleryRows.length > 0)) {
          const result: ApiContent = {
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
          cachedContent = result;
          return result;
        }
      }
    } catch (supabaseErr) {
      console.warn('Direct Supabase fetch failed, trying API endpoint:', supabaseErr);
    }

    try {
      const result = await requestJson<ApiContent>('/content');
      cachedContent = result;
      return result;
    } catch (err) {
      console.warn('API request failed:', err);
      return { profile: null, services: [], gallery: [] };
    } finally {
      inFlightContentPromise = null;
    }
  })();

  return inFlightContentPromise;
}

export async function saveProfile(payload: any) {
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
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

      const { error } = await client.from('profile').upsert(profileObj);
      if (error) {
        console.warn('Initial profile upsert failed, attempting fallback...', error.message);
        const cleanGmb = { ...profileObj };
        delete cleanGmb.gmb_link;
        delete cleanGmb.gmb_review_link;
        delete cleanGmb.gmb_reviews_count;
        delete cleanGmb.gmb_rating;

        const { error: errorGmb } = await client.from('profile').upsert(cleanGmb);
        if (errorGmb) {
          console.warn('Second profile upsert failed, attempting legacy fallback...', errorGmb.message);
          const cleanAll = { ...cleanGmb };
          delete cleanAll.about_photo;
          await client.from('profile').upsert(cleanAll);
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
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
    try {
      await client.from('services').insert({
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
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
    try {
      await client.from('services').update({
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
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
    try {
      await client.from('services').delete().eq('id', id);
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
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
    try {
      await client.from('gallery').insert({
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
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
    try {
      await client.from('gallery').update({
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
  cachedContent = null;
  const client = await getSupabase();
  if (client) {
    try {
      await client.from('gallery').delete().eq('id', id);
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
  cachedContent = null;
  return requestJson('/content/reset', {
    method: 'POST',
  });
}
