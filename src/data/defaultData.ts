import { ProfileInfo, GalleryItem, MehndiService } from '../types';

export const DEFAULT_PROFILE: ProfileInfo = {
  businessName: "Alankarini Mehndi Art",
  artistName: "Sandhya",
  phone: "+919336814631",
  whatsapp: "+919336814631",
  instagram: "@alankarini_mehandi_art",
  instagramUrl: "https://instagram.com/alankarini_mehandi_art",
  location: "Varanasi, Uttar Pradesh, India",
  experience: "3+ Years",
  bio: "Certified Mehndi Artist with 3+ years of experience specializing in exquisite bridal, portrait, and ritual henna ornaments. Based in the pious city of Varanasi, we turn your celebratory moments into exquisite, timeless, and deep-staining masterpieces, honoring ancient traditional values with premium modern artistry.",
  coverPhoto: "C:\Rajnikant\programs\alankarini-mehndi-art\public\Alankarini logo.png"
};

export const DEFAULT_SERVICES: MehndiService[] = [
  {
    id: "service-1",
    title: "Bridal Mehndi",
    description: "Premium, ultra-intricate custom-designed masterpieces running from fingertips up to the elbows on both sides. Captures beautiful royal story elements and motifs with longlasting dark henna stain.",
    imageUrl: "public/bride.jpeg",
    startingPrice: "Starting from ₹10,000"
  },
  {
    id: "service-2",
    title: "Custom Mehndi",
    description: "Intricately detailed customized hand-drawn sketches of the bride and groom, divine figures like Radha-Krishna, baby shower sketches, or custom portraits merged in traditional bridal lore.",
    imageUrl: "public/custom design.jpeg",
    startingPrice: "Starting from ₹6,000"
  },
  {
    id: "service-3",
    title: "Arabic Mehndi",
    description: "Modern, flowing, and bold floral diagonal clusters with exquisite shaded negative spaces. This minimalist and sleek choice is ideal for bridesmaids, siblings, and guest packages.",
    imageUrl: "public/arabic.jpeg",
    startingPrice: "Starting from ₹1,500"
  },
  {
    id: "service-4",
    title: "Indo-Arabic Mehndi",
    description: "A gorgeous fusion celebrating bold, broad Arabic floral outlines combined with ultra-dense, detailed micro-fillers characteristic of classic Rajasthani and Indian patterns.",
    imageUrl: "public/indo arabic.jpeg",
    startingPrice: "Starting from ₹2,500"
  },
  {
    id: "service-5",
    title: "Engagement Mehndi",
    description: "Neat, delightful semi-bridal layouts optimized for engagement rings and photoshoot aesthetics, highlighting beautiful mandala centerpieces and custom wrist cuffs.",
    imageUrl: "public/engagement.jpeg",
    startingPrice: "Starting from ₹3,100"
  },
  {
    id: "service-6",
    title: "Festival Mehndi",
    description: "Quick, auspicious, and beautiful traditional henna patterns applied during special Indian cultural festivals like Karwa Chauth, Teej, Eid, Diwali, and Hariyali Teej.",
    imageUrl: "public/festival design.jpeg",
    startingPrice: "Starting from ₹500"
  },
  
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gallery-1",
    imageUrl: "public/Royal Indian Bridal Mehndi.jpeg",
    category: "bridal",
    title: "Royal Indian Bridal Mehndi",
    description: "Symmetrical front-back elbow layout with detailed elephant and peacock patterns.",
    price: "₹5,100"
  },
  {
    id: "gallery-2",
    imageUrl: "public/bride.jpeg",
    category: "bridal",
    title: "Intricate Palm Finery",
    description: "Dense traditional grid layout showcasing incredible geometry and perfect lace accents.",
    price: "₹3,500"
  },
  {
    id: "gallery-3",
    imageUrl: "public/Bride & Groom Portrait Hand.jpg",
    category: "portrait",
    title: "Bride & Groom Portrait Hand",
    description: "Customized bride and groom sketch detailed with traditional floral vine motifs.",
    price: "₹11,000"
  },
  {
    id: "gallery-4",
    imageUrl: "public/Radha Krishna Custom Portrait.webp",
    category: "portrait",
    title: "Radha Krishna Custom Portrait",
    description: "Exquisite backhand sketch mapping divine figures for a religious ceremony.",
    price: "₹12,500"
  },
  {
    id: "gallery-5",
    imageUrl: "public/Elegant Bold Arabic vine.jpeg",
    category: "arabic",
    title: "Elegant Bold Arabic vine",
    description: "Charming minimalist leafy trails on the fingers with neat negative space styling.",
    price: "₹1,500"
  },
  {
    id: "gallery-6",
    imageUrl: "public/Modern Indo-Arabic Fusion.webp",
    category: "indo-arabic",
    title: "Modern Indo-Arabic Fusion",
    description: "Combining broad shaded leaves with delicate Rajasthani lattice fillings.",
    price: "₹2,500"
  },
  {
    id: "gallery-7",
    imageUrl: "public/Karwa Chauth Diya Scene.jpeg",
    category: "festival",
    title: "Karwa Chauth Diya Scene",
    description: "Traditional circular mandala pattern beautifully celebrating marital bliss.",
    price: "₹1500"
  },
  {
    id: "gallery-8",
    imageUrl: "public/Bespoke Henna Artist Craft.webp",
    category: "customized",
    title: "Bespoke Henna Artist Craft",
    description: "Fully styled personalization displaying clients' requested hobbies and pets.",
    price: "₹3,100"
  }
];
