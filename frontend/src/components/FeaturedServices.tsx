import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MehndiService, ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatRupeeAmount } from '../lib/format';

interface FeaturedServicesProps {
  services: MehndiService[];
  profile: ProfileInfo;
  setView: (view: string) => void;
  previewOnly?: boolean;
}

export function FeaturedServices({ services, profile, setView, previewOnly = false }: FeaturedServicesProps) {
  // Use first 3 or 4 items for the preview on Home page, otherwise show everything
  const itemsToShow = previewOnly ? services.slice(0, 3) : services;
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  return (
    <section className={`py-12 lg:py-20 ${previewOnly ? 'bg-[#f5efe4]' : 'bg-[#faf7f2]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {previewOnly ? (
            <span className="text-xs font-bold tracking-widest uppercase text-[#875914] font-sans">
              ✨ Best Mehendi Artist in Varanasi • Doorstep Service
            </span>
          ) : (
            <span className="text-xs font-bold tracking-widest uppercase text-[#875914] font-sans">
              🌸 Comprehensive Wedding Mehendi Service &amp; Doorstep Service
            </span>
          )}
          {previewOnly ? (
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
              Popular Bridal Mehndi Design Services
            </h2>
          ) : (
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
              Bridal Mehndi Design Services &amp; Wedding Mehendi in Varanasi
            </h1>
          )}
          <p className="mt-4 text-[#2d2d2d] text-sm sm:text-base font-sans leading-relaxed opacity-90">
            {previewOnly
              ? "Every bridal sketch, Arabic floral vine, and festive motif is handcrafted with expert precision by artist Sandhya. We use fresh 100% natural organic mehendi cones to ensure deep maroon stains for your auspicious day."
              : "Welcome to Varanasi's leading destination for bridal mehndi design services, Arabic mehndi design services, Indo - Arabic mehndi design services, Indian mehendi, and doorstep service. Whether you need traditional bridal mehendi, customized wedding mehendi with portrait sketches, groom mehendi, family mehendi service, or festival henna, Sandhya delivers certified excellence across all of Varanasi."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itemsToShow.map((service, index) => (
            <div
              key={service.id || index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#c5a059]/15 flex flex-col group h-full"
            >
              {/* Image Cover */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={service.imageUrl}
                  alt={`${service.title} in Varanasi by Sandhya - Best Mehendi Artist`}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-750"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Badge */}
                {service.startingPrice && (
                  <div className="absolute top-4 right-4 bg-[#5d0e0e] text-[#faf3df] text-xs font-semibold py-1.5 px-3 rounded-full border border-[#c5a059]/30 shadow-md">
                    {formatRupeeAmount(service.startingPrice) ?? service.startingPrice}
                  </div>
                )}
              </div>

              {/* Text Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#5d0e0e] group-hover:text-[#c5a059] transition-colors flex items-center gap-2">
                    <Sparkles size={16} className="text-[#c5a059] shrink-0" />
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="mt-2.5 text-gray-650 text-xs sm:text-sm font-sans leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>

                {/* Card footer actions */}
                <div className="pt-4 border-t border-[#efe1b4]/40 mt-4">
                  {!previewOnly ? (
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20am%20interested%20in%20your%20"${encodeURIComponent(service.title)}"%20Mehndi%20service.%20Please%20share%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                          (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'contact_whatsapp_click', service: service.title });
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-[#faf7f2] font-sans font-semibold text-xs py-2.5 px-4 rounded-lg tracking-wider uppercase transition-colors"
                    >
                      <WhatsAppIcon size={12} />
                      <span>Inquire On WhatsApp</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[#875914] text-xs font-semibold tracking-wider uppercase">
                      <CheckCircle2 size={12} />
                      <span>100% Organic Mehendi Cones</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more triggers for Preview blocks */}
        {previewOnly && (
          <div className="mt-12 text-center">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                setView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-transparent hover:bg-[#5d0e0e] text-[#5d0e0e] hover:text-[#faf3df] border-2 border-[#5d0e0e] py-3.5 px-8 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-sm transition-all duration-300"
            >
              <span>View All Mehndi Services</span>
              <ArrowRight size={14} />
            </a>
          </div>
        )}

        {/* Detailed Design Styles & Services Directory on Dedicated Services Page */}
        {!previewOnly && (
          <div className="mt-16 pt-12 border-t border-[#c5a059]/20 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold tracking-widest uppercase text-[#875914] font-sans">
                👑 All Styles &amp; Occasions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mt-2">
                Complete Mehndi Design Styles &amp; Occasions Directory
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed">
                Explore our full spectrum of specialized mehndi designing across Varanasi. From royal wedding mehendi service to modern fusion aesthetics and certified mehendi cones, we cater to every ritual with utmost dedication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1: Bridal & Wedding */}
              <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/20 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#efe1b4]/40 text-[#5d0e0e] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 font-sans">
                    Wedding &amp; Bridal
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#5d0e0e] mb-2">Bridal Mehndi Design Services</h3>
                  <p className="text-xs text-gray-650 leading-relaxed font-sans mb-3">
                    Recognized for the <strong>best bridal mehendi design in Varanasi</strong>. Full elbow coverage, customized dulhan figures, and <strong>traditional bridal mehendi</strong>.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1.5 font-sans">
                    <li className="flex items-center gap-1.5">✓ <span><strong>Bride Mehendi &amp; Groom Mehendi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Customized Wedding Mehendi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Family Mehendi Service</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Guest Mehendi Service</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Engagement Mehendi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Sangeet &amp; Haldi Function Mehendi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Baby showermehendi</strong></span></li>
                  </ul>
                </div>
              </div>

              {/* Category 2: Arabic & Fusion */}
              <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/20 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#efe1b4]/40 text-[#5d0e0e] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 font-sans">
                    Arabic &amp; Fusion
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#5d0e0e] mb-2">Arabic &amp; Indo-Arabic Styles</h3>
                  <p className="text-xs text-gray-650 leading-relaxed font-sans mb-3">
                    Modern flowing diagonal vine trails with signature negative space. Varanasi's leading <strong>Arabic mehendi artist</strong>.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1.5 font-sans">
                    <li className="flex items-center gap-1.5">✓ <span><strong>Arabic Mehndi Design Services</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>mehendi arabic design in varanasi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Arabic Bridal Mehendi &amp; Arabic Mehandi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Indo - Arabic Mehndi Design Services</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Indo-Arabic Mehendi / Indo Arabic Mehandi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Indo Western Mehandi &amp; Western Mehandi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Moroccan Mehandi &amp; Pakistani Mehandi Design</strong></span></li>
                  </ul>
                </div>
              </div>

              {/* Category 3: Traditional & Festival */}
              <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/20 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#efe1b4]/40 text-[#5d0e0e] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 font-sans">
                    Traditional &amp; Festive
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#5d0e0e] mb-2">Indian Mehendi &amp; Festival Art</h3>
                  <p className="text-xs text-gray-650 leading-relaxed font-sans mb-3">
                    Classical Rajasthani &amp; Marwari motifs, kalash, peacocks, shehnai, and auspicious cultural ornamentation.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1.5 font-sans">
                    <li className="flex items-center gap-1.5">✓ <span><strong>Indian Mehendi &amp; Indian Mehandi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Indian Mehndi Design Services</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Traditional Designs &amp; Traditional Mehendi Artist</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Teej mehndi artist in varanasi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Occasionally and Festival Mehendi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Basic Mehndi &amp; Basic Mehandi</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Advanced Mehandi Art</strong></span></li>
                  </ul>
                </div>
              </div>

              {/* Category 4: Products & Doorstep Travel */}
              <div className="bg-white p-5 rounded-2xl border border-[#c5a059]/20 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="inline-block bg-[#efe1b4]/40 text-[#5d0e0e] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 font-sans">
                    Doorstep &amp; Cones
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#5d0e0e] mb-2">Doorstep Service &amp; Cones</h3>
                  <p className="text-xs text-gray-650 leading-relaxed font-sans mb-3">
                    Reliable on-time visits to your home or hotel suite in Varanasi with chemical-free organic henna.
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1.5 font-sans">
                    <li className="flex items-center gap-1.5">✓ <span><strong>Doorstep Service across Varanasi &amp; Banaras</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>100% Organic Mehendi Cones</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Bridal henna &amp; Henna designs</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Make-up Artist &amp; Special occasion makeup coordination</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Professional Mehendi Artist Sandhya</strong></span></li>
                    <li className="flex items-center gap-1.5">✓ <span><strong>Mehendi Designers &amp; Mehndi Designing</strong></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contextual internal links for the dedicated Services Page */}
        {!previewOnly && (
          <div className="mt-12 pt-8 border-t border-[#c5a059]/20 flex flex-wrap gap-3.5 justify-center text-xs font-semibold uppercase tracking-wider text-[#5d0e0e]">
            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                setView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              🌸 Explore Real Portfolio in Gallery
            </a>
            <a
              href="/classes"
              onClick={(e) => {
                e.preventDefault();
                setView('classes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              🎓 Certified Mehndi Classes in Varanasi
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              📞 Book Doorstep Home Visit
            </a>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              🌿 Back to Homepage
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
