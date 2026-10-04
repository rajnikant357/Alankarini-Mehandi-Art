import { useEffect, useState } from 'react';
import { DEFAULT_GALLERY, DEFAULT_PROFILE, DEFAULT_SERVICES } from '../data/defaultData';
import { GalleryItem, MehndiService, ProfileInfo } from '../types';
import {
  createGalleryItem,
  createService,
  deleteGalleryItemOnServer,
  deleteServiceOnServer,
  fetchContent,
  resetContentOnServer,
  saveProfile as saveProfileOnServer,
  updateGalleryItemOnServer,
  updateServiceOnServer,
} from './api';



function normalizeProfile(data: Partial<ProfileInfo> & Record<string, unknown>): ProfileInfo {
  let coverPhoto = String(data.coverPhoto ?? data.cover_photo ?? DEFAULT_PROFILE.coverPhoto);
  let aboutPhoto = String(data.aboutPhoto ?? data.about_photo ?? coverPhoto);

  if (coverPhoto.startsWith('data:image/')) {
    coverPhoto = DEFAULT_PROFILE.coverPhoto;
  }
  if (aboutPhoto.startsWith('data:image/')) {
    aboutPhoto = DEFAULT_PROFILE.aboutPhoto;
  }

  return {
    ...DEFAULT_PROFILE,
    ...data,
    businessName: String(data.businessName ?? data.business_name ?? DEFAULT_PROFILE.businessName),
    artistName: String(data.artistName ?? data.artist_name ?? DEFAULT_PROFILE.artistName),
    phone: String(data.phone ?? DEFAULT_PROFILE.phone),
    whatsapp: String(data.whatsapp ?? DEFAULT_PROFILE.whatsapp),
    instagram: String(data.instagram ?? DEFAULT_PROFILE.instagram),
    instagramUrl: String(data.instagramUrl ?? data.instagram_url ?? DEFAULT_PROFILE.instagramUrl),
    location: String(data.location ?? DEFAULT_PROFILE.location),
    experience: String(data.experience ?? DEFAULT_PROFILE.experience),
    bio: String(data.bio ?? DEFAULT_PROFILE.bio),
    coverPhoto,
    aboutPhoto,
    gmbLink: String(data.gmbLink ?? data.gmb_link ?? DEFAULT_PROFILE.gmbLink),
    gmbReviewLink: String(data.gmbReviewLink ?? data.gmb_review_link ?? DEFAULT_PROFILE.gmbReviewLink),
    gmbReviewsCount: String(data.gmbReviewsCount ?? data.gmb_reviews_count ?? DEFAULT_PROFILE.gmbReviewsCount),
    gmbRating: String(data.gmbRating ?? data.gmb_rating ?? DEFAULT_PROFILE.gmbRating),
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function normalizeService(data: unknown): MehndiService {
  const record = asRecord(data);
  const id = String(record.id ?? `service-${Date.now()}`);
  let imageUrl = String(record.imageUrl ?? record.image_url ?? '');
  
  if (imageUrl.startsWith('data:image/')) {
    const defaultMatch = DEFAULT_SERVICES.find(s => s.id === id);
    if (defaultMatch) {
      imageUrl = defaultMatch.imageUrl;
    }
  }

  return {
    id,
    title: String(record.title ?? ''),
    description: String(record.description ?? ''),
    imageUrl,
    startingPrice: record.startingPrice
      ? String(record.startingPrice)
      : record.starting_price
        ? String(record.starting_price)
        : undefined,
  };
}

function normalizeGalleryItem(data: unknown): GalleryItem {
  const record = asRecord(data);
  const id = String(record.id ?? `gallery-${Date.now()}`);
  let imageUrl = String(record.imageUrl ?? record.image_url ?? '');
  const defaultMatch = DEFAULT_GALLERY.find(g => g.id === id);

  if (imageUrl.startsWith('data:image/') && defaultMatch) {
    imageUrl = defaultMatch.imageUrl;
  }

  const thumbnailUrl = record.thumbnailUrl
    ? String(record.thumbnailUrl)
    : defaultMatch?.thumbnailUrl;

  return {
    id,
    title: String(record.title ?? ''),
    category: String(record.category ?? 'bridal') as GalleryItem['category'],
    description: record.description ? String(record.description) : undefined,
    price: record.price ? String(record.price) : undefined,
    imageUrl,
    thumbnailUrl,
  };
}

export function useMehndiData() {
  const [profile, setProfile] = useState<ProfileInfo>(DEFAULT_PROFILE);
  const [services, setServices] = useState<MehndiService[]>(DEFAULT_SERVICES);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        const content = await fetchContent();
        if (cancelled) return;

        if (content.profile) {
          setProfile(normalizeProfile(content.profile));
        }
        if (content.services && content.services.length > 0) {
          setServices(content.services.map((item) => normalizeService(item)));
        }
        if (content.gallery && content.gallery.length > 0) {
          setGallery(content.gallery.map((item) => normalizeGalleryItem(item)));
        }
      } catch (error) {
        console.warn('Backend unavailable, using seeded defaults.', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (typeof window !== 'undefined') {
      const isAdmin = window.location.hash.includes('admin') || window.location.pathname.includes('admin');
      if (isAdmin) {
        void loadContent();
        return () => {
          cancelled = true;
        };
      }

      let triggered = false;
      const triggerLoad = () => {
        if (triggered || cancelled) return;
        triggered = true;
        cleanListeners();
        void loadContent();
      };

      const events = ['scroll', 'touchstart', 'pointerdown', 'mousemove', 'keydown'];
      const cleanListeners = () => {
        events.forEach((evt) => window.removeEventListener(evt, triggerLoad));
      };

      events.forEach((evt) => window.addEventListener(evt, triggerLoad, { passive: true, once: true }));

      let idleTimer: any = null;
      if ('requestIdleCallback' in window) {
        idleTimer = (window as any).requestIdleCallback(triggerLoad, { timeout: 8000 });
      } else {
        idleTimer = setTimeout(triggerLoad, 8000);
      }

      return () => {
        cancelled = true;
        cleanListeners();
        if (idleTimer) {
          if ('cancelIdleCallback' in window) {
            (window as any).cancelIdleCallback(idleTimer);
          } else {
            clearTimeout(idleTimer);
          }
        }
      };
    }
  }, []);

  const updateProfile = async (fields: Partial<ProfileInfo>) => {
    const updated = normalizeProfile({ ...profile, ...fields });
    setProfile(updated);
    const saved = await saveProfileOnServer(updated);
    if (saved) {
      setProfile(normalizeProfile(saved as Partial<ProfileInfo> & Record<string, unknown>));
    }
    return updated;
  };

  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const payload = {
      ...item,
      id: `gallery-custom-${Date.now()}`,
    };
    const created = await createGalleryItem(payload);
    const nextItem = normalizeGalleryItem(created ?? payload);
    setGallery((current) => [nextItem, ...current]);
    return nextItem;
  };

  const editGalleryItem = async (id: string, fields: Partial<GalleryItem>) => {
    const updatedItem = normalizeGalleryItem({ id, ...gallery.find((item) => item.id === id), ...fields });
    const saved = await updateGalleryItemOnServer(id, updatedItem);
    const nextItem = normalizeGalleryItem(saved ?? updatedItem);
    setGallery((current) => current.map((item) => (item.id === id ? nextItem : item)));
    return nextItem;
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteGalleryItemOnServer(id);
    setGallery((current) => current.filter((item) => item.id !== id));
  };

  const addService = async (service: Omit<MehndiService, 'id'>) => {
    const payload = {
      ...service,
      id: `service-custom-${Date.now()}`,
    };
    const created = await createService(payload);
    const nextService = normalizeService(created ?? payload);
    setServices((current) => [...current, nextService]);
    return nextService;
  };

  const updateService = async (id: string, fields: Partial<MehndiService>) => {
    const updatedService = normalizeService({ id, ...services.find((item) => item.id === id), ...fields });
    const saved = await updateServiceOnServer(id, updatedService);
    const nextService = normalizeService(saved ?? updatedService);
    setServices((current) => current.map((item) => (item.id === id ? nextService : item)));
    return nextService;
  };

  const deleteService = async (id: string) => {
    await deleteServiceOnServer(id);
    setServices((current) => current.filter((item) => item.id !== id));
  };

  const resetToDefaults = async () => {
    await resetContentOnServer();
    setProfile(DEFAULT_PROFILE);
    setServices(DEFAULT_SERVICES);
    setGallery(DEFAULT_GALLERY);
  };

  return {
    profile,
    services,
    gallery,
    loading,
    updateProfile,
    addGalleryItem,
    editGalleryItem,
    deleteGalleryItem,
    addService,
    updateService,
    deleteService,
    resetToDefaults,
  };
}
