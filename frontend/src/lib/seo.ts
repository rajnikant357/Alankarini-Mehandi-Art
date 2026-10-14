export interface RouteSeoConfig {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: object[];
}

export const SITE_ORIGIN = 'https://alankarini-mehandi-art.vercel.app';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/Alankarini%20Banner.png`;

export const COMMON_LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'BeautySalon', 'ProfessionalService'],
  '@id': `${SITE_ORIGIN}/#business`,
  name: 'Alankarini Mehandi Art',
  alternateName: [
    'Alankarini Mehndi Art',
    'Best Mehendi Artist in Varanasi',
    'Best Mehandi Artist in Varanasi',
    'Sandhya Mehandi Artist Varanasi',
    'Professional Bridal Mehendi Artist Varanasi',
    'Mehndi Designer in Varanasi',
  ],
  description: 'Best mehandi artist and mehendi designer in Varanasi by Sandhya with 3+ years experience. Specializing in bridal mehndi design services, Arabic mehndi design services, Indian mehendi, Indo-Arabic mehendi, doorstep service, wedding mehendi service, groom mehendi, organic mehendi cones, and certified mehendi classes across Varanasi and Banaras.',
  url: `${SITE_ORIGIN}/`,
  telephone: '+919336814631',
  priceRange: '₹₹',
  image: `${SITE_ORIGIN}/images/cover.webp`,
  logo: `${SITE_ORIGIN}/Alankarini%20icon.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Nawabganj, Jawahar Nagar Colony, Durgakund',
    addressLocality: 'Varanasi',
    addressRegion: 'Uttar Pradesh',
    postalCode: '221005',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.299534,
    longitude: 82.984066,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '08:00',
    closes: '21:00',
  },
  founder: {
    '@type': 'Person',
    name: 'Sandhya',
    jobTitle: 'Lead Mehndi Artist & Instructor',
    telephone: '+919336814631',
  },
  areaServed: [
    { '@type': 'City', name: 'Varanasi' },
    { '@type': 'City', name: 'Banaras' },
    { '@type': 'AdministrativeArea', name: 'Durgakund' },
    { '@type': 'AdministrativeArea', name: 'Lanka' },
    { '@type': 'AdministrativeArea', name: 'Assi Ghat' },
    { '@type': 'AdministrativeArea', name: 'Sigra' },
    { '@type': 'AdministrativeArea', name: 'Bhelupur' },
    { '@type': 'AdministrativeArea', name: 'Godowlia' },
    { '@type': 'AdministrativeArea', name: 'Mahmoorganj' },
    { '@type': 'AdministrativeArea', name: 'Shivpur' },
    { '@type': 'AdministrativeArea', name: 'Sarnath' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mehndi Services & Classes Directory',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bridal Mehndi Design Services',
          description: 'Best bridal mehendi design in Varanasi including traditional bridal mehendi, customized wedding mehendi, bride mehendi, and groom mehendi with doorstep service.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Arabic Mehndi Design Services',
          description: 'Contemporary Arabic mehendi artist styling, mehendi arabic design in Varanasi, Arabic bridal mehendi, floral trails, and negative space patterns.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Indo - Arabic & Fusion Mehndi Design Services',
          description: 'Indo - Arabic mehndi design services, Indo-Arabic mehendi, Indo Arabic mehandi, Indo Western mehandi, Moroccan mehandi, Pakistani mehandi design, and Western mehandi.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Doorstep Wedding & Event Mehndi Service',
          description: 'Doorstep service in Varanasi for wedding mehendi service, family mehendi service, guest mehendi service, engagement mehendi, sangeet mehendi, haldi function mehendi, and baby showermehendi.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Teej & Festival Mehndi Service in Varanasi',
          description: 'Special teej mehndi artist in Varanasi, occasionally and festival mehendi, Karwa Chauth, and Diwali celebration henna designs.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '100% Organic Mehendi Cones & Bridal Henna',
          description: 'Handcrafted fresh triple-filtered organic mehendi cones, chemical-free bridal henna, dark stain formulas, and henna designs.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: 'Beginner to Advanced Mehendi Classes & Training',
          description: 'Certified 35-day professional mehendi course, mehandi class, heena class, henna course, bridal mehendi classes, Arabic mehendi classes, online mehendi classes, and kids mehandi classes.',
        },
      },
    ],
  },
  sameAs: [
    'https://instagram.com/alankarini_mehandi_art',
    'https://www.google.com/maps?cid=1987876352194443246',
  ],
};

export const COMMON_WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  name: 'Alankarini Mehandi Art',
  alternateName: ['Alankarini Mehndi Art', 'Best Mehendi Artist in Varanasi', 'Sandhya Mehandi Artist Varanasi'],
  url: `${SITE_ORIGIN}/`,
};

export const COURSES_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online Mehendi Classes (35-Day Certified Beginner to Advanced Course)',
    description: 'Comprehensive 35-day online mehandi class training covering basic mehandi, bridal mehendi classes, Arabic mehendi classes, advanced mehandi, henna course mixology & organic mehendi cones, and Instagram growth. ₹1,500 (Classes only) or ₹2,000 (With Mehndi Starter Kit & Completion Certificate).',
    provider: {
      '@type': 'Organization',
      name: 'Alankarini Mehandi Art',
      url: `${SITE_ORIGIN}/`,
      telephone: '+919336814631',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Online Class (Classes Only)',
        price: '1500',
        priceCurrency: 'INR',
        category: 'Online Mehandi Course',
      },
      {
        '@type': 'Offer',
        name: 'Online Class (With Mehndi Kit & Certificate)',
        price: '2000',
        priceCurrency: 'INR',
        category: 'Certified Online Mehandi Course',
      },
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'P35D',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Offline Mehandi Class in Banaras (35-Day Varanasi Studio Course)',
    description: 'Hands-on 35-day offline studio training in Durgakund, Varanasi. Practical beginner to advanced mehendi classes, bridal mehendi classes, Arabic mehendi classes, kids mehandi classes, cone handling mastery, and live model practice. ₹3,500 (Classes only) or ₹4,000 (With Take-Home Mehndi Kit & Completion Certificate).',
    provider: {
      '@type': 'Organization',
      name: 'Alankarini Mehandi Art',
      url: `${SITE_ORIGIN}/`,
      telephone: '+919336814631',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Offline Studio (Classes Only)',
        price: '3500',
        priceCurrency: 'INR',
        category: 'Offline Mehandi Studio Course',
      },
      {
        '@type': 'Offer',
        name: 'Offline Studio (With Mehndi Kit & Certificate)',
        price: '4000',
        priceCurrency: 'INR',
        category: 'Certified Offline Mehandi Studio Course',
      },
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      location: 'Durgakund, Varanasi, Uttar Pradesh 221005',
      courseWorkload: 'P35D',
    },
  },
];

export const HOMEPAGE_FAQS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is the best mehendi artist in Varanasi for bridal mehndi design services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sandhya Chauhan at Alankarini Mehandi Art is recognized as the best mehendi artist in Varanasi, offering specialized bridal mehndi design services, traditional bridal mehendi, customized wedding mehendi, bride mehendi, groom mehendi, and 100% natural organic mehendi cones for dark stains. Call +91 9336814631 to book.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide doorstep service for wedding mehendi service in Varanasi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Alankarini Mehandi Art provides dedicated doorstep service across all Varanasi and Banaras localities including Durgakund, Lanka, Assi Ghat, Sigra, Bhelupur, Godowlia, Mahmoorganj, Shivpur, and Sarnath. Our doorstep wedding mehendi service covers bride mehendi, family mehendi service, guest mehendi service, engagement mehendi, sangeet mehendi, and haldi function mehendi.',
      },
    },
    {
      '@type': 'Question',
      name: 'What styles of mehndi design services do you offer in Varanasi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide Arabic mehndi design services, Indian mehndi design services, Indo - Arabic mehndi design services, Indo-Arabic mehendi, Indo Western mehandi, Moroccan mehandi, Pakistani mehandi design, Western mehandi, traditional designs, baby showermehendi, and customized wedding mehendi.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you available as a teej mehndi artist in Varanasi and for festivals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Sandhya is a highly sought-after teej mehndi artist in Varanasi and offers festive mehendi services for Karwa Chauth, Diwali, Hariyali Teej, Hartalika Teej, Eid, and special occasion family gatherings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the options and fees for mehendi classes in Varanasi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer beginner to advanced mehendi classes both online and offline (35-day certified professional mehendi course). Online Mehendi Classes: ₹1,500 (Classes only) or ₹2,000 (With Mehndi Starter Kit & Certificate). Offline Studio Classes in Durgakund, Varanasi: ₹3,500 (Classes only) or ₹4,000 (With Take-Home Kit & Certificate). Call/WhatsApp +91 9336814631.',
      },
    },
  ],
};

export const GUIDE_ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Complete Varanasi Mehndi Guide: Top Artists, Home Service, Course Fees & Design Directory',
  description: 'Comprehensive guide to hiring top mehndi artists in Varanasi, booking doorstep mehndi home service, comparing transparent charges with prices, and enrolling in 35-day professional mehndi classes.',
  image: DEFAULT_OG_IMAGE,
  author: {
    '@type': 'Person',
    name: 'Sandhya',
    jobTitle: 'Lead Bridal Mehndi Artist',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Alankarini Mehandi Art',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/Alankarini%20icon.png`,
    },
  },
  datePublished: '2026-09-18',
  dateModified: '2026-10-14',
  mainEntityOfPage: `${SITE_ORIGIN}/guide`,
};

export function makeBreadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const SEO_ROUTES: Record<string, RouteSeoConfig> = {
  home: {
    title: 'Best Mehendi Artist in Varanasi | Mehandi Artist & Doorstep Service',
    description: 'Looking for the best mehendi & mehandi artist in Varanasi? Alankarini offers bridal mehndi design services, Arabic mehendi, doorstep service, wedding mehendi, & certified mehendi courses.',
    canonical: `${SITE_ORIGIN}/`,
    h1: 'Best Mehendi Artist in Varanasi | Professional Mehandi Artist',
    ogTitle: 'Best Mehendi Artist in Varanasi | Professional Mehandi Artist',
    ogDescription: 'Looking for the best mehandi artist in Varanasi? Alankarini Mehandi Art offers bridal mehndi design services, Arabic mehendi, doorstep service, and certified courses.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'business.business',
    twitterTitle: 'Best Mehendi Artist in Varanasi | Mehandi Artist & Doorstep Service',
    twitterDescription: 'Best mehandi & mehendi artist in Varanasi by Sandhya. Bridal mehndi design services, Arabic mehendi, doorstep service & 35-day classes.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      COMMON_WEBSITE_SCHEMA,
      COMMON_LOCAL_BUSINESS_SCHEMA,
      HOMEPAGE_FAQS_SCHEMA,
    ],
  },

  classes: {
    title: 'Mehndi Classes in Varanasi | Beginner to Advanced Mehendi Course',
    description: 'Join top mehandi classes in Varanasi & certified online mehendi classes. Learn basic mehandi, bridal mehendi classes, Arabic mehendi classes, advanced mehandi & cone making.',
    canonical: `${SITE_ORIGIN}/classes`,
    h1: 'Mehndi Classes & Certified Courses in Varanasi',
    ogTitle: 'Mehndi Classes in Varanasi | Beginner to Advanced Mehendi Course',
    ogDescription: 'Learn professional mehndi designing with beginner to advanced mehendi classes, bridal mehendi classes, Arabic mehendi classes, and online henna courses.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    twitterTitle: 'Mehndi Classes in Varanasi | Beginner to Advanced Mehendi Course',
    twitterDescription: 'Certified 35-day beginner to advanced mehendi classes in Varanasi. Hands-on bridal mehendi, Arabic mehendi classes, henna mixology & certificates.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      ...COURSES_SCHEMA,
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Mehndi Classes', url: `${SITE_ORIGIN}/classes` },
      ]),
      HOMEPAGE_FAQS_SCHEMA,
    ],
  },

  gallery: {
    title: 'Mehndi Designs Gallery | Alankarini Mehandi Art Varanasi',
    description: 'Explore original bridal, Arabic, Indo-Arabic and customized mehndi designs by Alankarini Mehandi Art in Varanasi. View our portfolio and enquire about your preferred design.',
    canonical: `${SITE_ORIGIN}/gallery`,
    h1: 'Mehndi Designs Gallery',
    ogTitle: 'Mehndi Designs Gallery | Alankarini Mehandi Art Varanasi',
    ogDescription: 'Explore original bridal, Arabic, Indo-Arabic and customized mehndi designs by Alankarini Mehandi Art in Varanasi. View our portfolio and enquire about your preferred design.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    twitterTitle: 'Mehndi Designs Gallery | Alankarini Mehandi Art Varanasi',
    twitterDescription: 'Explore original bridal, Arabic, Indo-Arabic & customized mehndi portfolio by Alankarini Mehandi Art in Varanasi.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Mehndi Designs Gallery',
        description: 'Original portfolio of bridal, Arabic, Indo-Arabic, portrait, and festival mehndi designs by Alankarini Mehandi Art in Varanasi.',
        url: `${SITE_ORIGIN}/gallery`,
      },
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Gallery', url: `${SITE_ORIGIN}/gallery` },
      ]),
    ],
  },

  contact: {
    title: 'Contact Mehndi Artist in Varanasi | Alankarini',
    description: 'Contact Alankarini Mehandi Art in Varanasi for bridal, Arabic and customized mehndi bookings. Enquire about services, availability and appointments.',
    canonical: `${SITE_ORIGIN}/contact`,
    h1: 'Contact Alankarini Mehandi Art',
    ogTitle: 'Contact Mehndi Artist in Varanasi | Alankarini',
    ogDescription: 'Contact Alankarini Mehandi Art in Varanasi for bridal, Arabic and customized mehndi bookings. Enquire about services, availability and appointments.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'business.business',
    twitterTitle: 'Contact Mehndi Artist in Varanasi | Alankarini',
    twitterDescription: 'Contact Alankarini Mehandi Art in Varanasi for bridal, Arabic & customized mehndi appointments, home service & class admissions.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      COMMON_LOCAL_BUSINESS_SCHEMA,
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Contact', url: `${SITE_ORIGIN}/contact` },
      ]),
    ],
  },

  services: {
    title: 'Bridal Mehndi Design Services in Varanasi | Best Mehendi Artist',
    description: 'Best bridal mehendi design in Varanasi & doorstep service. Arabic mehndi design services, Indian mehndi, Indo-Arabic, wedding mehendi service & organic mehendi cones.',
    canonical: `${SITE_ORIGIN}/services`,
    h1: 'Bridal Mehndi Design Services & Doorstep Wedding Service in Varanasi',
    ogTitle: 'Bridal Mehndi Design Services in Varanasi | Best Mehendi Artist',
    ogDescription: 'Best bridal mehendi design in Varanasi, Arabic mehndi design services, wedding mehendi service, groom mehendi, and doorstep service across Banaras.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    twitterTitle: 'Bridal Mehndi Design Services in Varanasi | Best Mehendi Artist',
    twitterDescription: 'Best bridal mehendi design in Varanasi & doorstep service. Arabic mehndi design services, Indo-Arabic, groom mehendi & organic cones.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      COMMON_LOCAL_BUSINESS_SCHEMA,
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Services', url: `${SITE_ORIGIN}/services` },
      ]),
      HOMEPAGE_FAQS_SCHEMA,
    ],
  },

  about: {
    title: 'About Sandhya - Professional Mehndi Artist | Alankarini Mehandi Art',
    description: 'Meet Sandhya, certified professional mehndi artist with 3+ years experience in Varanasi offering authentic, organic henna artistry for weddings and events.',
    canonical: `${SITE_ORIGIN}/about`,
    h1: 'About Alankarini Mehandi Art - Sandhya',
    ogTitle: 'About Sandhya - Professional Mehndi Artist | Alankarini Mehandi Art',
    ogDescription: 'Meet Sandhya, certified professional mehndi artist with 3+ years experience in Varanasi offering authentic, organic henna artistry for weddings and events.',
    ogImage: `${SITE_ORIGIN}/images/about.webp`,
    ogType: 'profile',
    twitterTitle: 'About Sandhya - Mehndi Artist in Varanasi | Alankarini',
    twitterDescription: 'Certified professional mehndi artist in Varanasi with 3+ years experience in royal bridal, portrait, and ritual henna ornaments.',
    twitterImage: `${SITE_ORIGIN}/images/about.webp`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Alankarini Mehandi Art & Artist Sandhya',
        description: 'Story, certifications, and artistic philosophy of Alankarini Mehandi Art and artist Sandhya in Varanasi.',
        url: `${SITE_ORIGIN}/about`,
        mainEntity: {
          '@type': 'Person',
          name: 'Sandhya',
          jobTitle: 'Lead Mehndi Artist',
          worksFor: {
            '@type': 'LocalBusiness',
            name: 'Alankarini Mehandi Art',
          },
        },
      },
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'About', url: `${SITE_ORIGIN}/about` },
      ]),
    ],
  },

  guide: {
    title: 'Varanasi Mehndi Guide & Rates | Alankarini Mehandi Art',
    description: 'Complete guide to mehndi services, bridal packages, doorstep home visits, rates, and training classes in Varanasi by Alankarini Mehandi Art.',
    canonical: `${SITE_ORIGIN}/guide`,
    h1: 'Complete Varanasi Mehndi Guide & Directory',
    ogTitle: 'Varanasi Mehndi Guide & Rates | Alankarini Mehandi Art',
    ogDescription: 'Complete guide to mehndi services, bridal packages, doorstep home visits, rates, and training classes in Varanasi by Alankarini Mehandi Art.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'article',
    twitterTitle: 'Varanasi Mehndi Guide & Rates | Alankarini Mehandi Art',
    twitterDescription: 'Hiring top mehndi artists, doorstep home visits, transparent charges & 35-day classes in Varanasi.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      GUIDE_ARTICLE_SCHEMA,
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Guide', url: `${SITE_ORIGIN}/guide` },
      ]),
    ],
  },

  blog: {
    title: 'Mehndi Art Blog & Bridal Inspiration | Alankarini Varanasi',
    description: 'Explore bridal mehndi inspiration, design guides, training course details, and preparation advice from Alankarini Mehandi Art in Varanasi.',
    canonical: `${SITE_ORIGIN}/blog`,
    h1: 'Mehndi Art Guides, Bridal Tips & Insights',
    ogTitle: 'Mehndi Art Blog & Bridal Inspiration | Alankarini Varanasi',
    ogDescription: 'Explore bridal mehndi inspiration, design guides, training course details, and preparation advice from Alankarini Mehandi Art in Varanasi.',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
    twitterTitle: 'Mehndi Art Blog & Bridal Inspiration | Alankarini Varanasi',
    twitterDescription: 'Explore bridal mehndi design ideas, expert artist tips, course guides & preparation advice.',
    twitterImage: DEFAULT_OG_IMAGE,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Alankarini Mehndi Art Blog & Design Journal',
        description: 'Editorial articles, bridal inspiration, and training guides from Alankarini Mehandi Art in Varanasi.',
        url: `${SITE_ORIGIN}/blog`,
      },
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
      ]),
    ],
  },

  'blog:bridal-mehndi-artist-varanasi': {
    title: 'Bridal Mehndi Artist in Varanasi | Alankarini Guide',
    description: 'Practical guide to choosing a professional bridal mehndi artist in Varanasi. Evaluate portfolios, stain safety, travel service, rates, and booking checklists.',
    canonical: `${SITE_ORIGIN}/blog/bridal-mehndi-artist-varanasi`,
    h1: 'How to Choose the Best Bridal Mehndi Artist in Varanasi',
    ogTitle: 'Bridal Mehndi Artist in Varanasi | Alankarini Guide',
    ogDescription: 'Practical guide to choosing a professional bridal mehndi artist in Varanasi. Evaluate portfolios, stain safety, travel service, rates, and booking checklists.',
    ogImage: `${SITE_ORIGIN}/images/gallery/gallery-1.webp`,
    ogType: 'article',
    twitterTitle: 'Bridal Mehndi Artist in Varanasi | Alankarini Guide',
    twitterDescription: 'Practical guide to choosing a professional bridal mehndi artist in Varanasi. Evaluate portfolios, stain safety, travel service, rates, and booking checklists.',
    twitterImage: `${SITE_ORIGIN}/images/gallery/gallery-1.webp`,
    structuredData: [
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: 'How to Choose the Best Bridal Mehndi Artist in Varanasi', url: `${SITE_ORIGIN}/blog/bridal-mehndi-artist-varanasi` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Choose the Best Bridal Mehndi Artist in Varanasi',
        description: 'Practical guide to choosing a professional bridal mehndi artist in Varanasi. Evaluate portfolios, stain safety, travel service, rates, and booking checklists.',
        image: `${SITE_ORIGIN}/images/gallery/gallery-1.webp`,
        datePublished: '2026-10-11',
        dateModified: '2026-10-11',
        author: {
          '@type': 'Person',
          name: 'Sandhya',
          jobTitle: 'Lead Bridal Mehndi Artist',
          url: `${SITE_ORIGIN}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alankarini Mehandi Art',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/Alankarini%20icon.png`,
          },
        },
        mainEntityOfPage: `${SITE_ORIGIN}/blog/bridal-mehndi-artist-varanasi`,
      },
    ],
  },

  'blog:latest-bridal-mehndi-designs': {
    title: 'Latest Bridal Mehndi Designs | Alankarini Inspiration',
    description: 'Explore the latest bridal mehndi designs for modern and traditional weddings. From royal figures to minimalist mandalas, discover motifs, styling ideas, and tips.',
    canonical: `${SITE_ORIGIN}/blog/latest-bridal-mehndi-designs`,
    h1: 'Latest Bridal Mehndi Designs for Weddings: Ideas and Inspiration',
    ogTitle: 'Latest Bridal Mehndi Designs | Alankarini Inspiration',
    ogDescription: 'Explore the latest bridal mehndi designs for modern and traditional weddings. From royal figures to minimalist mandalas, discover motifs, styling ideas, and tips.',
    ogImage: `${SITE_ORIGIN}/images/services/service-1.webp`,
    ogType: 'article',
    twitterTitle: 'Latest Bridal Mehndi Designs | Alankarini Inspiration',
    twitterDescription: 'Explore the latest bridal mehndi designs for modern and traditional weddings. Discover motifs, styling ideas, and tips.',
    twitterImage: `${SITE_ORIGIN}/images/services/service-1.webp`,
    structuredData: [
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: 'Latest Bridal Mehndi Designs for Weddings: Ideas and Inspiration', url: `${SITE_ORIGIN}/blog/latest-bridal-mehndi-designs` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Latest Bridal Mehndi Designs for Weddings: Ideas and Inspiration',
        description: 'Explore the latest bridal mehndi designs for modern and traditional weddings. From royal figures to minimalist mandalas, discover motifs, styling ideas, and tips.',
        image: `${SITE_ORIGIN}/images/services/service-1.webp`,
        datePublished: '2026-10-11',
        dateModified: '2026-10-11',
        author: {
          '@type': 'Person',
          name: 'Sandhya',
          jobTitle: 'Lead Bridal Mehndi Artist',
          url: `${SITE_ORIGIN}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alankarini Mehandi Art',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/Alankarini%20icon.png`,
          },
        },
        mainEntityOfPage: `${SITE_ORIGIN}/blog/latest-bridal-mehndi-designs`,
      },
    ],
  },

  'blog:mehndi-classes-varanasi-guide': {
    title: 'Mehndi Classes in Varanasi | Course Selection Guide',
    description: 'Comprehensive guide to choosing professional mehndi classes in Varanasi. Compare beginner to bridal modules, studio vs online training, syllabus, kit, and fees.',
    canonical: `${SITE_ORIGIN}/blog/mehndi-classes-varanasi-guide`,
    h1: 'Mehndi Classes in Varanasi: Courses, Training and What to Learn',
    ogTitle: 'Mehndi Classes in Varanasi | Course Selection Guide',
    ogDescription: 'Comprehensive guide to choosing professional mehndi classes in Varanasi. Compare beginner to bridal modules, studio vs online training, syllabus, kit, and fees.',
    ogImage: `${SITE_ORIGIN}/images/about.webp`,
    ogType: 'article',
    twitterTitle: 'Mehndi Classes in Varanasi | Course Selection Guide',
    twitterDescription: 'Comprehensive guide to choosing professional mehndi classes in Varanasi. Compare modules, training, kit & fees.',
    twitterImage: `${SITE_ORIGIN}/images/about.webp`,
    structuredData: [
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: 'Mehndi Classes in Varanasi: Courses, Training and What to Learn', url: `${SITE_ORIGIN}/blog/mehndi-classes-varanasi-guide` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Mehndi Classes in Varanasi: Courses, Training and What to Learn',
        description: 'Comprehensive guide to choosing professional mehndi classes in Varanasi. Compare beginner to bridal modules, studio vs online training, syllabus, kit, and fees.',
        image: `${SITE_ORIGIN}/images/about.webp`,
        datePublished: '2026-10-11',
        dateModified: '2026-10-11',
        author: {
          '@type': 'Person',
          name: 'Sandhya',
          jobTitle: 'Lead Mehndi Artist & Instructor',
          url: `${SITE_ORIGIN}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alankarini Mehandi Art',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/Alankarini%20icon.png`,
          },
        },
        mainEntityOfPage: `${SITE_ORIGIN}/blog/mehndi-classes-varanasi-guide`,
      },
    ],
  },

  'blog:arabic-mehndi-designs-guide': {
    title: 'Arabic Mehndi Designs | Patterns and Inspiration',
    description: 'Discover iconic Arabic mehndi designs: bold florals, flowing vine trails, negative-space shading, and occasion styling for bridesmaids, parties, and festive celebrations.',
    canonical: `${SITE_ORIGIN}/blog/arabic-mehndi-designs-guide`,
    h1: 'Arabic Mehndi Designs: Beautiful Patterns for Every Occasion',
    ogTitle: 'Arabic Mehndi Designs | Patterns and Inspiration',
    ogDescription: 'Discover iconic Arabic mehndi designs: bold florals, flowing vine trails, negative-space shading, and occasion styling for bridesmaids, parties, and festive celebrations.',
    ogImage: `${SITE_ORIGIN}/images/services/service-3.webp`,
    ogType: 'article',
    twitterTitle: 'Arabic Mehndi Designs | Patterns and Inspiration',
    twitterDescription: 'Discover iconic Arabic mehndi designs: bold florals, flowing vine trails & negative-space shading.',
    twitterImage: `${SITE_ORIGIN}/images/services/service-3.webp`,
    structuredData: [
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: 'Arabic Mehndi Designs: Beautiful Patterns for Every Occasion', url: `${SITE_ORIGIN}/blog/arabic-mehndi-designs-guide` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Arabic Mehndi Designs: Beautiful Patterns for Every Occasion',
        description: 'Discover iconic Arabic mehndi designs: bold florals, flowing vine trails, negative-space shading, and occasion styling for bridesmaids, parties, and festive celebrations.',
        image: `${SITE_ORIGIN}/images/services/service-3.webp`,
        datePublished: '2026-10-11',
        dateModified: '2026-10-11',
        author: {
          '@type': 'Person',
          name: 'Sandhya',
          jobTitle: 'Lead Bridal Mehndi Artist',
          url: `${SITE_ORIGIN}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alankarini Mehandi Art',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/Alankarini%20icon.png`,
          },
        },
        mainEntityOfPage: `${SITE_ORIGIN}/blog/arabic-mehndi-designs-guide`,
      },
    ],
  },

  'blog:bridal-mehndi-appointment-preparation': {
    title: 'Bridal Mehndi Appointment in Varanasi | Preparation Guide',
    description: 'Essential preparation guide for your bridal mehndi ceremony in Varanasi. Timeline planning, skin prep, design references, appointment comfort, and natural aftercare.',
    canonical: `${SITE_ORIGIN}/blog/bridal-mehndi-appointment-preparation`,
    h1: 'How to Prepare for Your Bridal Mehndi Appointment in Varanasi',
    ogTitle: 'Bridal Mehndi Appointment in Varanasi | Preparation Guide',
    ogDescription: 'Essential preparation guide for your bridal mehndi ceremony in Varanasi. Timeline planning, skin prep, design references, appointment comfort, and natural aftercare.',
    ogImage: `${SITE_ORIGIN}/images/gallery/gallery-3.webp`,
    ogType: 'article',
    twitterTitle: 'Bridal Mehndi Appointment in Varanasi | Preparation Guide',
    twitterDescription: 'Essential preparation guide for your bridal mehndi ceremony in Varanasi. Timeline planning, skin prep & natural aftercare.',
    twitterImage: `${SITE_ORIGIN}/images/gallery/gallery-3.webp`,
    structuredData: [
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: 'How to Prepare for Your Bridal Mehndi Appointment in Varanasi', url: `${SITE_ORIGIN}/blog/bridal-mehndi-appointment-preparation` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Prepare for Your Bridal Mehndi Appointment in Varanasi',
        description: 'Essential preparation guide for your bridal mehndi ceremony in Varanasi. Timeline planning, skin prep, design references, appointment comfort, and natural aftercare.',
        image: `${SITE_ORIGIN}/images/gallery/gallery-3.webp`,
        datePublished: '2026-10-11',
        dateModified: '2026-10-11',
        author: {
          '@type': 'Person',
          name: 'Sandhya',
          jobTitle: 'Lead Bridal Mehndi Artist',
          url: `${SITE_ORIGIN}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alankarini Mehandi Art',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORIGIN}/Alankarini%20icon.png`,
          },
        },
        mainEntityOfPage: `${SITE_ORIGIN}/blog/bridal-mehndi-appointment-preparation`,
      },
    ],
  },

  'blog:rajnikant-gaurav': {
    title: 'Rajnikant Gaurav - Independent Developer & Founder | Platform Profile',
    description: 'Biographical overview of Rajnikant Gaurav: independent software developer, AI explorer, and technical architect of Alankarini Mehandi Art.',
    canonical: `${SITE_ORIGIN}/blog/rajnikant-gaurav`,
    h1: 'Rajnikant Gaurav: Technical Architecture & Platform Profile',
    ogTitle: 'Rajnikant Gaurav - Platform Architect Profile',
    ogDescription: 'Biographical overview of Rajnikant Gaurav: independent software developer, AI explorer, and technical architect.',
    ogImage: `${SITE_ORIGIN}/rajnikant1.png`,
    ogType: 'profile',
    twitterTitle: 'Rajnikant Gaurav - Platform Architect Profile',
    twitterDescription: 'Independent software developer, founder of Prometrion, and platform architect.',
    twitterImage: `${SITE_ORIGIN}/rajnikant1.png`,
    structuredData: [
      makeBreadcrumb([
        { name: 'Home', url: `${SITE_ORIGIN}/` },
        { name: 'Blog', url: `${SITE_ORIGIN}/blog` },
        { name: 'Rajnikant Gaurav Profile', url: `${SITE_ORIGIN}/blog/rajnikant-gaurav` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Rajnikant Gaurav Biography',
        url: `${SITE_ORIGIN}/blog/rajnikant-gaurav`,
        mainEntity: {
          '@type': 'Person',
          '@id': 'https://www.rajnikantg.in/#person',
          name: 'Rajnikant Gaurav',
          alternateName: [
            'Rajnikant',
            'Rajnikant Gaurav Ballia',
            'Rajnikant Prometrion',
            'Rajnikant Gaurav Developer',
          ],
          birthDate: '2005-09-20',
          birthPlace: {
            '@type': 'Place',
            name: 'Dadar, Ballia, Uttar Pradesh, India',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dadar',
              addressRegion: 'Ballia, Uttar Pradesh',
              addressCountry: 'IN',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 25.7583,
              longitude: 84.1482,
            },
          },
          homeLocation: {
            '@type': 'Place',
            name: 'Ballia, Uttar Pradesh, India',
          },
          nationality: 'Indian',
          gender: 'Male',
          jobTitle: 'Independent Software Developer & Platform Architect',
          worksFor: {
            '@type': 'Organization',
            name: 'Prometrion',
            url: 'https://www.prometrion.com',
          },
          url: 'https://www.rajnikantg.in',
          image: [
            `${SITE_ORIGIN}/rajnikant1.png`,
            `${SITE_ORIGIN}/rajnikant2.jpg`,
          ],
          sameAs: [
            'https://www.rajnikantg.in',
            'https://www.prometrion.com',
          ],
          description: 'Rajnikant Gaurav is an independent software developer, AI explorer, and founder of Prometrion, born in Dadar, Ballia, Uttar Pradesh, India.',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${SITE_ORIGIN}/blog/rajnikant-gaurav#article`,
        headline: 'Rajnikant Gaurav: Biographical Profile of an Independent Developer & Founder',
        alternativeHeadline: 'The Journey of Rajnikant Gaurav: Technology, Artificial Intelligence, and Prometrion',
        description: 'Comprehensive encyclopedia-style biography of Rajnikant Gaurav: early life in Dadar, Ballia, Uttar Pradesh, education in Computer Science, full-stack development, and founding of Prometrion.',
        author: {
          '@type': 'Person',
          name: 'Rajnikant Gaurav',
          url: 'https://www.rajnikantg.in',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Prometrion',
          url: 'https://www.prometrion.com',
        },
        datePublished: '2025-01-01T00:00:00+05:30',
        dateModified: '2026-09-19T12:00:00+05:30',
        mainEntityOfPage: `${SITE_ORIGIN}/blog/rajnikant-gaurav`,
        image: `${SITE_ORIGIN}/rajnikant1.png`,
        inLanguage: 'en-US',
        spatialCoverage: {
          '@type': 'Place',
          name: 'Dadar, Ballia, Uttar Pradesh, India',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 25.7583,
            longitude: 84.1482,
          },
        },
      },
    ],
  },
};

/**
 * Client-side DOM updater for title, meta tags, canonical link, and JSON-LD
 */
export function applyRouteMetadata(view: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const normalizedKey = view.startsWith('blog/') ? `blog:${view.slice(5)}` : view;
  const config = SEO_ROUTES[normalizedKey] || SEO_ROUTES[view] || SEO_ROUTES.home;

  // 1. Title
  document.title = config.title;

  // 2. Helper to set or create a meta tag
  const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attribute, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Meta description
  setMeta('name', 'description', config.description);

  // 4. Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', config.canonical);

  // 5. Open Graph tags
  setMeta('property', 'og:title', config.ogTitle);
  setMeta('property', 'og:description', config.ogDescription);
  setMeta('property', 'og:url', config.canonical);
  setMeta('property', 'og:image', config.ogImage);
  setMeta('property', 'og:type', config.ogType);
  setMeta('property', 'og:site_name', 'Alankarini Mehandi Art');

  // 6. Twitter Card tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.twitterTitle);
  setMeta('name', 'twitter:description', config.twitterDescription);
  setMeta('name', 'twitter:image', config.twitterImage);

  // 7. Dynamic JSON-LD structured data
  const existingJsonLd = document.querySelectorAll('script[data-seo-jsonld="true"]');
  existingJsonLd.forEach(el => el.remove());

  config.structuredData.forEach((schemaObj) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(schemaObj);
    document.head.appendChild(script);
  });
}
