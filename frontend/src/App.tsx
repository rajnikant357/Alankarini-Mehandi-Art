import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { useMehndiData } from './lib/store';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { 
  Phone, 
  MessageSquare, 
  Instagram, 
  MapPin, 
  Award, 
  Heart, 
  User, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

const FeaturedServices = lazy(() => import('./components/FeaturedServices').then(m => ({ default: m.FeaturedServices })));
const GallerySection = lazy(() => import('./components/GallerySection').then(m => ({ default: m.GallerySection })));
const ContactForm = lazy(() => import('./components/ContactForm').then(m => ({ default: m.ContactForm })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));

function SectionSkeleton() {
  return (
    <div className="py-16 text-center bg-[#faf7f2] flex flex-col justify-center items-center gap-3">
      <div className="w-8 h-8 border-3 border-[#5d0e0e] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-xs font-serif text-[#5d0e0e] font-semibold tracking-wider uppercase animate-pulse">Loading content...</span>
    </div>
  );
}

export default function App() {
  // URL-based & Hash-based routing: match pathnames (/about, /services, etc.) and hash (#/admin)
  const getViewFromLocation = (): string => {
    if (typeof window === 'undefined') return 'home';

    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (hash === 'admin') return 'admin';
    if (hash === 'about') return 'about';
    if (hash === 'services') return 'services';
    if (hash === 'gallery') return 'gallery';
    if (hash === 'contact') return 'contact';

    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    if (path === 'admin') return 'admin';
    if (path === 'about') return 'about';
    if (path === 'services') return 'services';
    if (path === 'gallery') return 'gallery';
    if (path === 'contact') return 'contact';

    return 'home';
  };

  const [currentView, setCurrentView] = useState<string>(getViewFromLocation);

  // Sync view state with browser URL path and history
  const setView = (view: string) => {
    setCurrentView(view);
    if (typeof window === 'undefined') return;

    let targetPath = '/';
    if (view === 'admin') {
      window.location.hash = '#/admin';
      return;
    } else if (view === 'about') {
      targetPath = '/about';
    } else if (view === 'services') {
      targetPath = '/services';
    } else if (view === 'gallery') {
      targetPath = '/gallery';
    } else if (view === 'contact') {
      targetPath = '/contact';
    }

    if (window.location.hash && view !== 'admin') {
      history.pushState(null, '', targetPath);
    } else if (window.location.pathname !== targetPath) {
      history.pushState(null, '', targetPath);
    }
  };

  // Listen for browser navigation (back/forward) and URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentView(getViewFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update dynamic page title for SEO on route change
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'Alankarini Mehndi Art - Sandhya | Varanasi',
      about: 'About Us | Alankarini Mehndi Art - Varanasi',
      services: 'Packages & Services | Alankarini Mehndi Art - Varanasi',
      gallery: 'Portfolio Gallery | Alankarini Mehndi Art - Varanasi',
      contact: 'Contact & Booking | Alankarini Mehndi Art - Varanasi',
      admin: 'Admin Panel | Alankarini Mehndi Art',
    };
    if (titles[currentView]) {
      document.title = titles[currentView];
    }
  }, [currentView]);
  const {
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
  } = useMehndiData();

  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#5d0e0e] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-[#5d0e0e] animate-pulse uppercase tracking-widest text-sm font-semibold">Alankarini Art is loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#faf7f2] transition-all selection:bg-[#c5a059]/30 selection:text-[#5d0e0e] relative font-sans">
      
      {/* Decorative background lines overlay */}
      <div className="fixed inset-0 mehndi-pattern-bg pointer-events-none z-0"></div>

      {/* Dynamic Header & Toolbar */}
      <div className="relative z-20">
        <Navbar profile={profile} currentView={currentView} setView={setView} />
      </div>

      <main className="flex-1 relative z-10">
        <Suspense fallback={<SectionSkeleton />}>
          {/* VIEW 1: HOME PANEL */}
        {currentView === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <Hero profile={profile} setView={setView} />

            {/* Elegant About Section brief */}
            <section className="py-12 bg-white border-y border-[#c5a059]/10 relative">
              <div className="max-w-5xl mx-auto px-4 text-center">
                <span className="text-[#c5a059] italic text-sm font-serif">Auspicious Art Traditions</span>
                <h3 className="font-serif text-3xl font-bold text-[#5d0e0e] mt-1.5 mb-6">Varanasi's Trusted Mehndi Artist</h3>
                <div className="max-w-3xl mx-auto text-gray-750 text-sm sm:text-base leading-relaxed font-sans mb-8">
                  {profile.bio}
                </div>

                {/* Grid items for specializations */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    'Bridal Specialist',
                    'Portrait Sketched',
                    'Indo-Arabic Fusion',
                    'Festival Layouts',
                    'Custom Name Accents'
                  ].map((specialty, i) => (
                    <div key={i} className="bg-[#f5efe4] p-3 rounded-xl border border-[#c5a059]/20 flex flex-col items-center justify-center text-center">
                      <Heart size={14} className="text-[#5d0e0e] mb-1.5" />
                      <span className="text-[#5d0e0e] font-sans font-bold text-xs uppercase tracking-wide">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Services Preview Section (Only 3 popular items) */}
            <FeaturedServices services={services} profile={profile} setView={setView} previewOnly={true} />

            {/* Gallery Preview Grid (Only first 4 items) */}
            <GallerySection gallery={gallery} profile={profile} setView={setView} previewOnly={true} />

            {/* Google Business Reviews Section (Social Proof Trust Building) */}
            <section className="py-16 lg:py-24 bg-[#faf7f2] border-y border-[#efe1b4]/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-72 h-72 bg-[#c5a059]/5 rounded-full filter blur-[60px] pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#5d0e0e]/5 rounded-full filter blur-[80px] pointer-events-none"></div>
              
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                  <span className="text-[#c5a059] text-xs font-bold uppercase tracking-widest block mb-2">⭐ Real Client Testimonials ⭐</span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#5d0e0e] tracking-tight">What Our Clients Say on Google</h3>
                  <div className="h-1 w-20 bg-[#c5a059] mx-auto mt-4 mb-6 rounded-full"></div>
                  
                  {/* Global Review Stats */}
                  <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-white px-6 py-3 rounded-2xl border border-[#efe1b4] shadow-sm">
                    <div className="flex items-center gap-1.5 font-sans font-black text-gray-800 text-2xl">
                      <span>{profile.gmbRating || '5.0'}</span>
                      <div className="flex text-amber-500 text-lg">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <div className="h-3 w-[1px] bg-gray-300 hidden sm:block"></div>
                    <p className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">
                      Google Verified Rating
                    </p>
                  </div>
                </div>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      name: "Kriti Sharma",
                      role: "Bridal Client (Varanasi)",
                      rating: 5,
                      text: "Sandhya is an absolute magician! My bridal mehndi was so dark and intricate. Everyone at my wedding was asking about the artist. It stained beautifully for my rituals.",
                      date: "1 week ago"
                    },
                    {
                      name: "Neha Mishra",
                      role: "Local Guide (Durgakund)",
                      rating: 5,
                      text: "Best portrait mehndi designer in Varanasi! The customized sketches of Radha-Krishna on my backhand were incredibly clean and artistic. Highly recommended for special occasions.",
                      date: "3 weeks ago"
                    },
                    {
                      name: "Priya Patel",
                      role: "Festival Booking (Nawabganj)",
                      rating: 5,
                      text: "Extremely professional service. Sandhya came directly to our home right on time. The henna paste is 100% organic with absolutely zero chemicals, giving a solid deep red color.",
                      date: "1 month ago"
                    }
                  ].map((review, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative">
                      <div className="absolute top-6 right-6 text-gray-150 font-serif text-5xl font-black pointer-events-none select-none opacity-20">”</div>
                      <div>
                        <div className="flex gap-1 text-amber-500 text-xs mb-3">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <p className="text-gray-700 font-sans text-sm italic leading-relaxed mb-6">
                          "{review.text}"
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                        <div>
                          <h4 className="font-sans font-bold text-xs text-gray-800 flex items-center gap-1">
                            {review.name}
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-normal">✓ Verified</span>
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">{review.role}</p>
                        </div>
                        <span className="text-[9px] font-medium text-gray-400 font-sans bg-gray-50 px-2 py-0.5 rounded-full">{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct GMB Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href={profile.gmbReviewLink || `https://search.google.com/local/writereview?fid=1987876352194443246`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#801414] text-[#faf3df] py-3.5 px-6 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-colors"
                  >
                    <span>Write a Google Review</span>
                  </a>
                  
                  <a
                    href={profile.gmbLink || `https://www.google.com/maps?cid=1987876352194443246`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#5d0e0e] border border-[#c5a059] py-3.5 px-6 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-colors"
                  >
                    <span>View Listing on Maps</span>
                  </a>
                </div>

              </div>
            </section>

            {/* Secondary Direct Contact CTA Section as requested */}
            <section className="bg-[#5d0e0e] py-16 text-[#faf3df] relative overflow-hidden border-t-4 border-[#c5a059]">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full filter blur-[80px]"></div>
              <div className="max-w-4xl mx-auto px-4 text-center relative">
                <span className="text-[#c5a059] text-xs font-bold uppercase tracking-widest">✨ Plan Your Styling Today ✨</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-black mt-2 leading-tight">Ready To Lock Your Big Day Appointment?</h3>
                <p className="mt-4 text-gray-300 font-sans text-sm sm:text-base">
                  Discuss your design suggestions, find pricing details, and block Sandhya's calendar! We offer flexible travel plans for brides, families, and weddings within Varanasi or nearby districts.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=Hi%20Sandhya,%20I%20want%20to%20reserve%20a%20bridal/festival%20mehndi%20session.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#0d695e] text-white py-4 px-8 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-transform active:scale-95"
                  >
                    <MessageSquare size={16} />
                    Book on WhatsApp
                  </a>
                  
                  <a
                    href={`tel:${cleanPhone}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d3b575] text-[#5d0e0e] py-4 px-8 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-transform active:scale-95"
                  >
                    <Phone size={16} />
                    Book on Call 
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
                {/* VIEW 2: PORTFOLIO GALLERY */}
        {currentView === 'gallery' && (
          <div className="animate-fade-in">
            <div className="bg-[#f5efe4] py-8 text-center border-b border-gray-200">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5d0e0e]">Mehndi Portfolios</h2>
              <p className="text-xs text-gray-600 font-sans mt-1">Explore our intricate patterns, bridal symmetry, and custom portrait details.</p>
            </div>
            <GallerySection gallery={gallery} profile={profile} setView={setView} previewOnly={false} />
          </div>
        )}

        {/* VIEW 3: DETAILED SERVICES LIST */}
        {currentView === 'services' && (
          <div className="animate-fade-in">
            <div className="bg-[#f5efe4] py-8 text-center border-b border-gray-200">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5d0e0e]">Available Services & Packages</h2>
              <p className="text-xs text-gray-650 font-sans mt-1">Check out our specialized packages optimized for Varanasi celebrations.</p>
            </div>
            <FeaturedServices services={services} profile={profile} setView={setView} previewOnly={false} />
          </div>
        )}

        {/* VIEW 4: ABOUT US — Artist Story + Business Mission */}
        {currentView === 'about' && (
          <div className="animate-fade-in">
            {/* Artist Profile Section (About Sandhya - TOP) */}
            <section className="py-12 lg:py-20 bg-[#faf7f2] border-b border-[#c5a059]/10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                  
                  {/* Image side left */}
                  <div className="md:col-span-5 relative flex justify-center">
                    <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-[#c5a059]/30 rounded-2xl transform translate-x-2.5 translate-y-2.5"></div>
                    <div className="relative aspect-[4/5] w-full max-w-md rounded-2xl overflow-hidden border-[6px] border-[#f5efe4] shadow-xl">
                      <img
                        src={profile.aboutPhoto}
                        alt="Sandhya - Alankarini Artist Head"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-[#5d0e0e]/90 text-[#faf3df] p-4 rounded-xl backdrop-blur-sm border border-[#c5a059]/20">
                        <p className="font-serif text-base font-bold leading-none">{profile.artistName}</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059] mt-1">Lead Henna Craftsman</p>
                      </div>
                    </div>
                  </div>

                  {/* Text Content right */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-1 bg-[#efe1b4]/40 text-[#5d0e0e] text-xs font-bold px-3 py-1 rounded-full border border-[#c5a059]/20 font-sans">
                      <Award size={14} className="text-[#c5a059]" />
                      <span>Certified Mehndi Artist in Varanasi</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e]">
                      Meet Artist {profile.artistName}
                    </h2>

                    <p className="text-[#2d2d2d] font-sans text-sm sm:text-base leading-relaxed">
                      Alankarini Mehndi Art represents the highest quality of traditional hand-drawn ornamentation. Artist Sandhya is a seasoned professional with more than three years of dedicated specialization within bridal sketches, portraits, baby shower patterns, and complex Rajasthani-Indian lattices.
                    </p>

                    <p className="text-[#2d2d2d] font-sans text-sm sm:text-base leading-relaxed">
                      Based in the holy city of Varanasi, Uttar Pradesh, Alankarini caters to national and local destination wedding ceremonies alike. Every single batch of Henna paste is mixed fresh in-studio using certified triple-filtered organic Lawsonia inermis powder, premium essential oils, and zero chemicals. This provides an eye-catching, robust maroon-black color shade that lasts beautifully over your auspicious rituals.
                    </p>

                    <div className="border-t border-[#efe1b4]/30 pt-6">
                      <h3 className="font-serif font-semibold text-lg text-[#5d0e0e] mb-4">Why Select Alankarini Henna Art?</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          'Over 3+ Years of Wedding Art Excellence',
                          'Expert custom bridal figures & portrait sketch drawings',
                          '100% natural, certified skin-friendly organic henna',
                          'Neat, precise geometric symmetry grids',
                          'Highly responsive Varanasi home travel service',
                          'Budget-friendly packages for every family event'
                        ].map((item, index) => (
                          <li key={index} className="flex gap-2 items-start text-xs text-[#2d2d2d] font-sans">
                            <CheckCircle2 size={14} className="text-[#c5a059] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setView('contact')}
                        className="bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                      >
                        Book Free consultation
                      </button>
                      <button
                        onClick={() => setView('gallery')}
                        className="bg-transparent hover:bg-gray-100 text-[#5d0e0e] border border-gray-300 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                      >
                        View Real Masterpieces
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* About Us Business Section (BOTTOM) */}
            <section className="py-14 lg:py-20 bg-white">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-[#c5a059] italic text-sm font-serif">Our Story & Mission</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5d0e0e] mt-2 mb-6">About Alankarini Mehndi Art</h2>
                <p className="text-[#2d2d2d] font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-6">
                  Alankarini Mehndi Art was born from a deep-rooted love for the ancient art of henna — a tradition that has graced celebrations across generations. Founded in the heart of Varanasi, one of India's most sacred and culturally rich cities, Alankarini carries forward the timeless beauty of Mehndi with a commitment to precision, creativity, and authenticity.
                </p>
                <p className="text-[#2d2d2d] font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-8">
                  Our mission is simple: to transform your most cherished occasions — weddings, engagements, festivals, and family celebrations — into visually stunning memories through the art of henna. We believe every design tells a story, and every hand we adorn becomes a canvas of love, tradition, and joy.
                </p>

                {/* Values grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: <Heart size={20} className="text-[#5d0e0e]" />, title: 'Passion & Craft', desc: 'Every stroke is hand-drawn with love and meticulous attention to detail.' },
                    { icon: <Sparkles size={20} className="text-[#5d0e0e]" />, title: '100% Organic Henna', desc: 'Premium Lawsonia inermis powder mixed fresh — zero chemicals, deep lasting stain.' },
                    { icon: <Award size={20} className="text-[#5d0e0e]" />, title: 'Trusted Excellence', desc: '3+ years of bridal art expertise with hundreds of happy clients across Varanasi.' }
                  ].map((value, i) => (
                    <div key={i} className="bg-[#faf7f2] p-6 rounded-2xl border border-[#c5a059]/15 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-full bg-[#efe1b4]/40 flex items-center justify-center">{value.icon}</div>
                      <h4 className="font-serif font-bold text-[#5d0e0e] text-sm">{value.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed font-sans">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 5: CONTACT & BOOKING FORM */}
        {currentView === 'contact' && (
          <div className="animate-fade-in">
            <ContactForm profile={profile} />
          </div>
        )}

        {/* VIEW 6: SECURE ADMIN CATALOG MANAGEMENT */}
        {currentView === 'admin' && (
          <div className="animate-fade-in">
            <AdminPanel 
              profile={profile}
              services={services}
              gallery={gallery}
              updateProfile={updateProfile}
              addGalleryItem={addGalleryItem}
              editGalleryItem={editGalleryItem}
              deleteGalleryItem={deleteGalleryItem}
              addService={addService}
              updateService={updateService}
              deleteService={deleteService}
              resetToDefaults={resetToDefaults}
            />
          </div>
        )}
        </Suspense>
      </main>

      {/* MAJESTIC GOLD & MAROON FOOTER */}
      <footer className="bg-[#3a050a] text-[#faf3df]/90 py-12 px-4 relative overflow-hidden border-t-8 border-[#c5a059] z-20">
        
        {/* Decorative separator line */}
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] bg-[#c5a059]/30 flex-1"></div>
          <span className="text-[#c5a059] tracking-widest text-lg font-serif">🌸 ❊ 🌸</span>
          <div className="h-[1px] bg-[#c5a059]/30 flex-1"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 text-center md:text-left">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-serif font-black text-[#faf3df] tracking-wide">
              {profile.businessName}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Transforming holy rituals and weddings values across Varanasi into breathtaking, deep-staining, organic henna canvas masterpieces. Developed with love by artist Sandhya.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-2 text-[#c5a059] text-xs font-semibold uppercase tracking-wider">
              <Award size={14} />
              <span>Varanasi's Top Bridal Mehandi Designer</span>
            </div>
          </div>

          {/* Quick Tabs Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#c5a059]">Explore Website</h4>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-gray-400 tracking-wide">
              <button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="hover:text-[#faf3df] transition-colors text-left self-center md:self-start">🌿 Home Dashboard</button>
              <button onClick={() => { setView('gallery'); window.scrollTo(0,0); }} className="hover:text-[#faf3df] transition-colors text-left self-center md:self-start">🌸 Portfolio Gallery</button>
              <button onClick={() => { setView('services'); window.scrollTo(0,0); }} className="hover:text-[#faf3df] transition-colors text-left self-center md:self-start">🌿 Services & Prices</button>
              <button onClick={() => { setView('about'); window.scrollTo(0,0); }} className="hover:text-[#faf3df] transition-colors text-left self-center md:self-start">🌸 About Us</button>
              <button onClick={() => { setView('contact'); window.scrollTo(0,0); }} className="hover:text-[#faf3df] transition-colors text-left self-center md:self-start">📞 Coordinate Bookings</button>
            </div>
          </div>

          {/* Contacts Details Col */}
          <div className="md:col-span-4 space-y-4 text-xs font-sans">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#c5a059]">Contact Sandhya</h4>
            
            <div className="space-y-3 font-medium text-gray-400">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin size={14} className="text-[#c5a059]" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone size={14} className="text-[#c5a059]" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white hover:underline">{profile.phone}</a>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <WhatsAppIcon size={14} className="text-emerald-500 inline shrink-0" />
                <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">Instant WhatsApp</a>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Instagram size={14} className="text-purple-400" />
                <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">{profile.instagram}</a>
              </div>
            </div>
          </div>

        </div>

        {/* copyright */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#faf3df]/10 text-center text-[10px] text-gray-550 font-sans tracking-wide flex flex-col sm:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Alankarini Mehndi Art • All Rights Reserved.</p>
          <div className="flex justify-center items-center gap-4 text-gray-550">
            <span>By Sandhya Mehndi artist Varanasi</span>
            {/* <span>•</span>
            <button onClick={() => { setView('admin'); window.scrollTo(0,0); }} className="text-[#c5a059] font-bold uppercase tracking-wider flex items-center gap-1 hover:underline cursor-pointer">
              <Bookmark size={10} />
              <span>Admin Login</span>
            </button> */}
          </div>
        </div>

      </footer>

    </div>
  );
}
