-- ========================================================
-- ALANKARINI MEHNDI ART - SUPABASE DATABASE SCHEMA
-- Execute this script in Supabase SQL Editor
-- ========================================================

-- Enable extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. PROFILE TABLE
-- Stores artist business info & profile metadata
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile (
  id TEXT PRIMARY KEY DEFAULT 'default',
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. SERVICES TABLE
-- Stores offered Mehndi service packages
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  starting_price TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 3. GALLERY TABLE
-- Stores showcase gallery images & categories
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price TEXT,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- 4. BOOKINGS TABLE
-- Stores client booking requests & appointment proposals
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  phone TEXT,
  event_date DATE,
  event_location TEXT,
  service_type TEXT NOT NULL,
  guest_count TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------------------------------------------------
-- AUTOMATED UPDATED_AT TRIGGER FUNCTION
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
DROP TRIGGER IF EXISTS set_profile_updated_at ON public.profile;
CREATE TRIGGER set_profile_updated_at
  BEFORE UPDATE ON public.profile
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_services_updated_at ON public.services;
CREATE TRIGGER set_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_gallery_updated_at ON public.gallery;
CREATE TRIGGER set_gallery_updated_at
  BEFORE UPDATE ON public.gallery
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_bookings_updated_at ON public.bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- --------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profile Policies
DROP POLICY IF EXISTS "Public Profile Read" ON public.profile;
CREATE POLICY "Public Profile Read" ON public.profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service Role / Authenticated Profile Manage" ON public.profile;
CREATE POLICY "Service Role / Authenticated Profile Manage" ON public.profile
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Services Policies
DROP POLICY IF EXISTS "Public Services Read" ON public.services;
CREATE POLICY "Public Services Read" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service Role / Authenticated Services Manage" ON public.services;
CREATE POLICY "Service Role / Authenticated Services Manage" ON public.services
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Gallery Policies
DROP POLICY IF EXISTS "Public Gallery Read" ON public.gallery;
CREATE POLICY "Public Gallery Read" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service Role / Authenticated Gallery Manage" ON public.gallery;
CREATE POLICY "Service Role / Authenticated Gallery Manage" ON public.gallery
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Bookings Policies
DROP POLICY IF EXISTS "Public Bookings Insert" ON public.bookings;
CREATE POLICY "Public Bookings Insert" ON public.bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Service Role / Authenticated Bookings Manage" ON public.bookings;
CREATE POLICY "Service Role / Authenticated Bookings Manage" ON public.bookings
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- --------------------------------------------------------
-- SEED INITIAL DATA
-- --------------------------------------------------------

-- Insert Profile Seed Data
INSERT INTO public.profile (
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
  'Alankarini Mehndi Art',
  'Sandhya',
  '+919336814631',
  '+919336814631',
  '@alankarini_mehandi_art',
  'https://instagram.com/alankarini_mehandi_art',
  'Varanasi, Uttar Pradesh, India',
  '3+ Years',
  'Certified Mehndi Artist with 3+ years of experience specializing in exquisite bridal, portrait, and ritual henna ornaments. Based in the pious city of Varanasi, we turn your celebratory moments into exquisite, timeless, and deep-staining masterpieces, honoring ancient traditional values with premium modern artistry.',
  '/Alankarini logo.png'
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
  updated_at = NOW();

-- Insert Services Seed Data
INSERT INTO public.services (id, title, description, image_url, starting_price, sort_order) VALUES
('service-1', 'Bridal Mehndi', 'Premium, ultra-intricate custom-designed masterpieces running from fingertips up to the elbows on both sides. Captures beautiful royal story elements and motifs with longlasting dark henna stain.', '/bride.jpeg', '10000', 0),
('service-2', 'Custom Mehndi', 'Intricately detailed customized hand-drawn sketches of the bride and groom, divine figures like Radha-Krishna, baby shower sketches, or custom portraits merged in traditional bridal lore.', '/custom design.jpeg', '6000', 1),
('service-3', 'Arabic Mehndi', 'Modern, flowing, and bold floral diagonal clusters with exquisite shaded negative spaces. This minimalist and sleek choice is ideal for bridesmaids, siblings, and guest packages.', '/arabic.jpeg', '1500', 2),
('service-4', 'Indo-Arabic Mehndi', 'A gorgeous fusion celebrating bold, broad Arabic floral outlines combined with ultra-dense, detailed micro-fillers characteristic of classic Rajasthani and Indian patterns.', '/indo arabic.jpeg', '2500', 3),
('service-5', 'Engagement Mehndi', 'Neat, delightful semi-bridal layouts optimized for engagement rings and photoshoot aesthetics, highlighting beautiful mandala centerpieces and custom wrist cuffs.', '/engagement.jpeg', '3100', 4),
('service-6', 'Festival Mehndi', 'Quick, auspicious, and beautiful traditional henna patterns applied during special Indian cultural festivals like Karwa Chauth, Teej, Eid, Diwali, and Hariyali Teej.', '/festival design.jpeg', '500', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  starting_price = EXCLUDED.starting_price,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Insert Gallery Seed Data
INSERT INTO public.gallery (id, title, category, description, price, image_url, sort_order) VALUES
('gallery-1', 'Royal Indian Bridal Mehndi', 'bridal', 'Symmetrical front-back elbow layout with detailed elephant and peacock patterns.', '5100', '/Royal Indian Bridal Mehndi.jpeg', 0),
('gallery-2', 'Intricate Palm Finery', 'bridal', 'Dense traditional grid layout showcasing incredible geometry and perfect lace accents.', '3500', '/bride.jpeg', 1),
('gallery-3', 'Bride & Groom Portrait Hand', 'portrait', 'Customized bride and groom sketch detailed with traditional floral vine motifs.', '11000', '/Bride & Groom Portrait Hand.jpg', 2),
('gallery-4', 'Radha Krishna Custom Portrait', 'portrait', 'Exquisite backhand sketch mapping divine figures for a religious ceremony.', '12500', '/Radha Krishna Custom Portrait.webp', 3),
('gallery-5', 'Elegant Bold Arabic vine', 'arabic', 'Charming minimalist leafy trails on the fingers with neat negative space styling.', '1500', '/Elegant Bold Arabic vine.jpeg', 4),
('gallery-6', 'Modern Indo-Arabic Fusion', 'indo-arabic', 'Combining broad shaded leaves with delicate Rajasthani lattice fillings.', '2500', '/Modern Indo-Arabic Fusion.webp', 5),
('gallery-7', 'Karwa Chauth Diya Scene', 'festival', 'Traditional circular mandala pattern beautifully celebrating marital bliss.', '1500', '/Karwa Chauth Diya Scene.jpeg', 6),
('gallery-8', 'Bespoke Henna Artist Craft', 'customized', 'Fully styled personalization displaying clients'' requested hobbies and pets.', '3100', '/Bespoke Henna Artist Craft.webp', 7)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
