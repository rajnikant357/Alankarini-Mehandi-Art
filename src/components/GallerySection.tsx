import { useState } from 'react';
import { Sparkles, Eye, X, MessageSquare, Tag, ImageOff } from 'lucide-react';
import { GalleryItem, GalleryCategory, ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface GallerySectionProps {
  gallery: GalleryItem[];
  profile: ProfileInfo;
  setView: (view: string) => void;
  previewOnly?: boolean;
}

export function GallerySection({ gallery, profile, setView, previewOnly = false }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

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
            <span className="text-xs font-bold tracking-widest uppercase text-[#c5a059] font-sans">
              ✨ Henna Portfolios
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
              {previewOnly ? 'Gallery Masterpieces' : 'Our Design Gallery'}
            </h2>
            <p className="mt-2 text-gray-650 text-xs sm:text-sm font-sans">
              Take a look through our real catalog of traditional art, created for real clients and brides.
            </p>
          </div>

          {/* View more buttons on Home preview */}
          {previewOnly && (
            <button
              onClick={() => {
                setView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold tracking-widest uppercase text-[#5d0e0e] hover:text-[#c5a059] font-sans flex items-center gap-1 cursor-pointer select-none transition-colors mt-2"
            >
              <span>Explore All Masterpieces</span>
              <Sparkles size={14} />
            </button>
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
                onClick={() => setActiveLightbox(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#f5efe4] border border-[#c5a059]/10 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-750 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Backdrop Overlay */}
                  <div className="absolute inset-0 bg-[#5d0e0e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 bg-[#faf3df] text-[#5d0e0e] rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye size={18} />
                    </span>
                  </div>
                </div>

                {/* Info Bar */}
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-1">
                      <Tag size={10} />
                      {item.category}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-[#5d0e0e] flex items-center justify-between gap-1">
                      <span className="line-clamp-1">{item.title}</span>
                      {item.price && (
                        <span className="text-xs font-semibold text-[#c5a059] shrink-0 font-sans">{item.price}</span>
                      )}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-[11px] text-gray-500 font-sans line-clamp-1 mt-1 font-light">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer trigger on Home preview */}
        {previewOnly && gallery.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setView('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-[#faf7f2] py-3.5 px-8 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Explore Entire Work Portfolio</span>
              <Sparkles size={14} />
            </button>
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-fade-in transition-all">
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-[#faf3df] hover:text-white p-3 rounded-full transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <div className="max-w-4xl w-full flex flex-col md:flex-row overflow-hidden bg-[#faf7f2] rounded-3xl shadow-2xl border border-[#c5a059]/30 max-h-[90vh]">
            {/* Visuals left */}
            <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden aspect-square md:aspect-auto md:h-[65vh]">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Typography right */}
            <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between h-auto md:h-[65vh] overflow-y-auto">
              <div>
                <span className="inline-flex items-center gap-1 bg-[#efe1b4]/60 text-[#5d0e0e] text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md mb-4 border border-[#c5a059]/20 font-sans">
                  <Tag size={10} />
                  Category: {activeLightbox.category}
                </span>

                <h3 className="text-2xl font-serif font-black text-[#5d0e0e] leading-snug flex items-center justify-between gap-2">
                  <span>{activeLightbox.title}</span>
                  {activeLightbox.price && (
                    <span className="text-lg font-bold text-[#c5a059] shrink-0 font-sans bg-[#efe1b4]/30 px-2 py-0.5 rounded-lg border border-[#c5a059]/15">{activeLightbox.price}</span>
                  )}
                </h3>

                <div className="h-1 w-12 bg-[#c5a059] my-4 rounded-full"></div>

                <p className="text-[#2d2d2d] font-sans text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {activeLightbox.description || 'Stunning traditional design hand-crafted in Varanasi by master artisan Sandhya. Designed using pure natural organic henna for a deep red and healthy skin-friendly stain.'}
                </p>
              </div>

              {/* Instant WhatsApp booking with reference to exact image title! */}
              <div className="pt-4 border-t border-[#efe1b4]/40 mt-auto">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20am%20interested%20in%20the%20"${encodeURIComponent(activeLightbox.title)}"%20design%20(${activeLightbox.id})%20from%20your%20website%20gallery.%20Please%20share%20pricing%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3.5 px-4 rounded-xl font-sans font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
                >
                  <WhatsAppIcon size={14} />
                  <span>Enquire This Style</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
