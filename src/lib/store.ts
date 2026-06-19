import { useState, useEffect } from 'react';
import { ProfileInfo, GalleryItem, MehndiService } from '../types';
import { DEFAULT_PROFILE, DEFAULT_SERVICES, DEFAULT_GALLERY } from '../data/defaultData';

const LOCAL_PROFILE_KEY = 'alankarini_profile_v1';
const LOCAL_SERVICES_KEY = 'alankarini_services_v1';
const LOCAL_GALLERY_KEY = 'alankarini_gallery_v1';
const ADMIN_PASSCODE_KEY = 'mehndi_admin_passcode';

export function getStoredProfile(): ProfileInfo {
  const data = localStorage.getItem(LOCAL_PROFILE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing stored profile, resetting to default.", e);
    }
  }
  return DEFAULT_PROFILE;
}

export function getStoredServices(): MehndiService[] {
  const data = localStorage.getItem(LOCAL_SERVICES_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing stored services, resetting to default.", e);
    }
  }
  return DEFAULT_SERVICES;
}

export function getStoredGallery(): GalleryItem[] {
  const data = localStorage.getItem(LOCAL_GALLERY_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing stored gallery, resetting to default.", e);
    }
  }
  return DEFAULT_GALLERY;
}

export function useMehndiData() {
  const [profile, setProfile] = useState<ProfileInfo>(DEFAULT_PROFILE);
  const [services, setServices] = useState<MehndiService[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    setProfile(getStoredProfile());
    setServices(getStoredServices());
    setGallery(getStoredGallery());
    setLoading(false);
  }, []);

  const saveProfile = (updated: ProfileInfo) => {
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updated));
    setProfile(updated);
  };

  const saveServices = (updated: MehndiService[]) => {
    localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(updated));
    setServices(updated);
  };

  const saveGallery = (updated: GalleryItem[]) => {
    localStorage.setItem(LOCAL_GALLERY_KEY, JSON.stringify(updated));
    setGallery(updated);
  };

  // Profile actions
  const updateProfile = (fields: Partial<ProfileInfo>) => {
    const updated = { ...profile, ...fields };
    saveProfile(updated);
  };

  // Gallery actions
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gallery-custom-${Date.now()}`
    };
    const updated = [newItem, ...gallery];
    saveGallery(updated);
    return newItem;
  };

  const editGalleryItem = (id: string, fields: Partial<GalleryItem>) => {
    const updated = gallery.map(item => item.id === id ? { ...item, ...fields } : item);
    saveGallery(updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter(item => item.id !== id);
    saveGallery(updated);
  };

  // Service actions
  const addService = (service: Omit<MehndiService, 'id'>) => {
    const newService: MehndiService = {
      ...service,
      id: `service-custom-${Date.now()}`
    };
    const updated = [...services, newService];
    saveServices(updated);
    return newService;
  };

  const updateService = (id: string, fields: Partial<MehndiService>) => {
    const updated = services.map(srv => srv.id === id ? { ...srv, ...fields } : srv);
    saveServices(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter(srv => srv.id !== id);
    saveServices(updated);
  };

  // Reset all to default entries
  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_PROFILE_KEY);
    localStorage.removeItem(LOCAL_SERVICES_KEY);
    localStorage.removeItem(LOCAL_GALLERY_KEY);
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
    resetToDefaults
  };
}

export const DEFAULT_PASSCODE = "Sandhya@Myweb1819";

export function checkAdminPasscode(entered: string): boolean {
  const stored = localStorage.getItem(ADMIN_PASSCODE_KEY) || DEFAULT_PASSCODE;
  return entered === stored;
}

export function setAdminPasscode(newPasscode: string) {
  localStorage.setItem(ADMIN_PASSCODE_KEY, newPasscode);
}
