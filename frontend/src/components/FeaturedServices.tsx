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
              ✨ Traditional Specialties
            </span>
          ) : (
            <span className="text-xs font-bold tracking-widest uppercase text-[#875914] font-sans">
              🌸 Bridal & Festival Packages
            </span>
          )}
          {previewOnly ? (
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
              Popular Mehndi Services
            </h2>
          ) : (
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
              Mehndi Services &amp; Packages in Varanasi
            </h1>
          )}
          <p className="mt-4 text-[#2d2d2d] text-sm sm:text-base font-sans leading-relaxed opacity-90">
            Every bridal sketch &amp; festive motif is hand-drawn with expert perfection. We select and mix high-grade organic henna raw powder to guarantee healthy deep maroon stains for your special day.
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
                  alt={`${service.title} in Varanasi by Sandhya`}
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
                      <span>Perfect organic stain</span>
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
              <span>View All Services</span>
              <ArrowRight size={14} />
            </a>
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
