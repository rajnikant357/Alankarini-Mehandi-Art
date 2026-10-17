import { useState, useEffect } from 'react';
import { Sparkles, Eye, X, MessageSquare, Tag, ImageOff } from 'lucide-react';
import { GalleryItem, GalleryCategory, ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatRupeeAmount } from '../lib/format';

interface GallerySectionProps {
  gallery: GalleryItem[];
  profile: ProfileInfo;
  setView: (view: string) => void;
  previewOnly?: boolean;
}

export function GallerySection({ gallery, profile, setView, previewOnly = false }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!activeLightbox) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightbox(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox]);

  const categories: { label: string; value: string }[] = [
    { label: 'All Designs', value: 'all' },
    { label: 'Bridal', value: 'bridal' },
    { label: 'Portrait', value: 'portrait' },
    { label: 'Arabic', value: 'arabic' },
    { label: 'Indo-Arabic', value: 'indo-arabic' },
    { label: 'Festival', value: 'festival' },
    { label: 'Customized', value: 'customized' },
  ];

  // Filtering logic
  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  // Home preview gets only first 4 items, full page shows everything
  const itemsToShow = previewOnly ? gallery.slice(0, 4) : filteredGallery;

  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  return (
    <section className="py-12 lg:py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-[#875914] font-sans">
              ✨ Henna Portfolios
            </span>
            {previewOnly ? (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
                Gallery Masterpieces
              </h2>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
                Mehndi Designs Gallery
              </h1>
            )}
            <p className="mt-2 text-gray-650 text-xs sm:text-sm font-sans">
              Explore original bridal, Arabic, Indo-Arabic, and customized mehndi designs handcrafted by artist Sandhya in Varanasi. Every photo showcases real client artistry made with 100% natural organic henna.
            </p>
          </div>

          {/* View more links on Home preview */}
          {previewOnly && (
            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                setView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold tracking-widest uppercase text-[#5d0e0e] hover:text-[#c5a059] font-sans flex items-center gap-1 cursor-pointer select-none transition-colors mt-2"
            >
              <span>Explore All Masterpieces</span>
              <Sparkles size={14} />
            </a>
          )}
        </div>

        {/* Tab filters (only visible on the Gallery Page) */}
        {!previewOnly && (
          <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-200 shrink-0 select-none cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#5d0e0e] text-[#faf3df] shadow-md border border-[#c5a059]/30'
                    : 'bg-[#f5efe4] hover:bg-[#efe1b4]/40 text-[#2d2d2d] border border-[#c5a059]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid (masonry style feel via gap and aspect variation) */}
        {itemsToShow.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <ImageOff className="mx-auto text-gray-400 mb-4" size={40} />
            <h3 className="font-serif text-lg font-bold text-gray-750">No designs uploaded yet</h3>
            <p className="text-sm text-gray-500 font-sans mt-1">Check back later or contact Sandhya for fresh custom patterns!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {itemsToShow.map((item, index) => (
              <div
                key={item.id || index}
                className="group relative overflow-hidden rounded-2xl bg-[#f5efe4] border border-[#c5a059]/10 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
              >
                {/* Image */}
                <div 
                  onClick={() => setActiveLightbox(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View enlarged photo and details for ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLightbox(item);
                    }
                  }}
                  className="aspect-square relative overflow-hidden bg-gray-50 cursor-pointer"
                >
                  <img
                    src={item.thumbnailUrl || item.imageUrl}
                    alt={`${item.title} - ${item.category} mehndi design by Sandhya Varanasi`}
                    width={300}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-750 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Backdrop Overlay */}
                  <div className="absolute inset-0 bg-[#5d0e0e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-[#faf3df] text-[#5d0e0e] rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                      <Eye size={16} />
                      <span>View</span>
                    </span>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#875914] font-bold mb-1">
                      <Tag size={10} />
                      {item.category}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-[#5d0e0e] flex items-center justify-between gap-1">
                      <span className="line-clamp-1">{item.title}</span>
                      {item.price && (
                        <span className="text-xs font-semibold text-[#875914] shrink-0 font-sans">{formatRupeeAmount(item.price) ?? item.price}</span>
                      )}
                    </h3>
                  </div>

                  {/* Action Buttons: View and Inquire */}
                  <div className="pt-3 border-t border-[#efe1b4]/40 mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveLightbox(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#f5efe4] hover:bg-[#efe1b4] text-[#5d0e0e] border border-[#c5a059]/30 font-sans font-semibold text-xs py-2 px-2.5 rounded-lg tracking-wider uppercase transition-colors cursor-pointer"
                      title="View Design"
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </button>
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20am%20interested%20in%20the%20"${encodeURIComponent(item.title)}"%20design%20(${item.id})%20from%20your%20website%20gallery.%20Please%20share%20pricing%20details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                          (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'gallery_inquire_click', design: item.title });
                        }
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white font-sans font-semibold text-xs py-2 px-2.5 rounded-lg tracking-wider uppercase transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
                      title="Inquire on WhatsApp"
                    >
                      <WhatsAppIcon size={13} />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer trigger on Home preview */}
        {previewOnly && gallery.length > 0 && (
          <div className="mt-12 text-center">
            <a
              href="/gallery"
              onClick={(e) => {
                e.preventDefault();
                setView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-[#faf7f2] py-3.5 px-8 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Explore Entire Work Portfolio</span>
              <Sparkles size={14} />
            </a>
          </div>
        )}

        {/* Contextual internal links for the dedicated Gallery Page */}
        {!previewOnly && (
          <div className="mt-12 pt-8 border-t border-[#c5a059]/20 flex flex-wrap gap-3.5 justify-center text-xs font-semibold uppercase tracking-wider text-[#5d0e0e]">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                setView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              🌿 View Mehndi Services &amp; Packages
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
              🎓 Learn Mehndi in 35-Day Classes
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
              📞 Book an Appointment in Varanasi
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

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-sm animate-fade-in transition-all"
          onClick={() => setActiveLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.title}
        >
          {/* Viewport Top-Right Close Button */}
          <button
            onClick={() => setActiveLightbox(null)}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[120] bg-black/80 hover:bg-black text-[#faf3df] hover:text-white p-2.5 sm:p-3 rounded-full transition-all border border-white/25 cursor-pointer shadow-xl flex items-center gap-1.5 active:scale-95"
            aria-label="Close Lightbox"
            title="Close (Esc)"
          >
            <X size={20} className="sm:w-5 sm:h-5" />
            <span className="text-xs font-sans uppercase font-bold tracking-wider hidden sm:inline">Close</span>
          </button>

          <div 
            className="relative max-w-4xl w-full flex flex-col md:flex-row overflow-hidden bg-[#faf7f2] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#c5a059]/30 max-h-[92vh] z-[110]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Card Top-Right Close Button (Prominently visible directly on the dialog) */}
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-3 right-3 z-30 bg-[#5d0e0e]/85 hover:bg-[#5d0e0e] text-[#faf3df] hover:text-white p-2 rounded-full transition-all shadow-md border border-[#c5a059]/40 cursor-pointer flex items-center justify-center active:scale-95"
              aria-label="Close"
              title="Close"
            >
              <X size={18} />
            </button>

            {/* Visuals left */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden aspect-square md:aspect-auto md:h-[65vh]">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Typography right */}
            <div className="md:w-2/5 p-5 sm:p-6 md:p-8 flex flex-col justify-between h-auto md:h-[65vh] overflow-y-auto">
              <div>
                <span className="inline-flex items-center gap-1 bg-[#efe1b4]/60 text-[#5d0e0e] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md mb-3 border border-[#c5a059]/20 font-sans">
                  <Tag size={10} />
                  Category: {activeLightbox.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#5d0e0e] leading-snug flex items-center justify-between gap-2">
                  <span>{activeLightbox.title}</span>
                  {activeLightbox.price && (
                    <span className="text-base sm:text-lg font-bold text-[#c5a059] shrink-0 font-sans bg-[#efe1b4]/30 px-2 py-0.5 rounded-lg border border-[#c5a059]/15">{formatRupeeAmount(activeLightbox.price) ?? activeLightbox.price}</span>
                  )}
                </h3>

                <div className="h-1 w-12 bg-[#c5a059] my-3 rounded-full"></div>

                <p className="text-[#2d2d2d] font-sans text-xs sm:text-sm leading-relaxed mb-5 font-light">
                  Stunning traditional design hand-crafted in Varanasi by master artisan Sandhya. Designed using pure natural organic henna for a deep red and healthy skin-friendly stain.
                </p>
              </div>

              {/* Instant WhatsApp booking with reference to exact image title! */}
              <div className="pt-4 border-t border-[#efe1b4]/40 mt-auto flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20am%20interested%20in%20the%20"${encodeURIComponent(activeLightbox.title)}"%20design%20(${activeLightbox.id})%20from%20your%20website%20gallery.%20Please%20share%20pricing%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
                >
                  <WhatsAppIcon size={14} />
                  <span>Enquire This Style</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-sans font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <X size={14} />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
