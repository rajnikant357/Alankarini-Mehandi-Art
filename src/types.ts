export interface ProfileInfo {
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
}

export type GalleryCategory = 'bridal' | 'portrait' | 'arabic' | 'indo-arabic' | 'festival' | 'customized';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: GalleryCategory;
  title: string;
  description?: string;
  price?: string;
}

export interface MehndiService {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice?: string;
}
