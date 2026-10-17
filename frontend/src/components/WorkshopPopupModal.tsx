import { useEffect } from 'react';
import { X, Phone, Sparkles } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WorkshopPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileInfo;
}

export function WorkshopPopupModal({ isOpen, onClose, profile }: WorkshopPopupModalProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const whatsappMessage = encodeURIComponent(
    'Hello Sandhya, I saw the 15-Day Advance Mehandi Workshop popup on your website. I want to Join Now! Please share seat availability, fees, and batch details.'
  );

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-3 sm:p-5 backdrop-blur-sm animate-fade-in transition-all"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="15-Day Advance Mehndi Workshop Announcement"
    >
      <div
        className="relative max-w-lg w-full bg-[#faf7f2] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c5a059]/50 flex flex-col my-auto max-h-[92vh] z-10 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button Top-Right */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-30 bg-black/75 hover:bg-black text-[#faf3df] hover:text-white p-2 rounded-full transition-all cursor-pointer shadow-lg active:scale-95 border border-white/25 flex items-center justify-center"
          aria-label="Close Announcement"
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        {/* Top Announcement Ribbon */}
        <div className="bg-[#5d0e0e] text-[#faf3df] px-4 sm:px-5 py-2.5 flex items-center justify-between border-b border-[#c5a059]/30 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0"></span>
            <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider text-[#efe1b4]">
              🎉 Special Workshop Announcement
            </span>
          </div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#c5a059]/25 text-[#faf3df] border border-[#c5a059]/35 mr-7">
            Limited Seats
          </span>
        </div>

        {/* Poster Image Section */}
        <div className="relative overflow-hidden bg-[#1f0305] flex items-center justify-center max-h-[60vh] sm:max-h-[65vh]">
          <img
            src="/workshop.png"
            alt="15-Day Advance Mehndi Workshop by Sandhya Chauhan - Alankarini Mehndi Art"
            width={1024}
            height={1536}
            loading="eager"
            decoding="async"
            className="w-full h-auto max-h-[60vh] sm:max-h-[65vh] object-contain select-none"
          />
        </div>

        {/* Bottom CTA Action Bar */}
        <div className="bg-[#f5efe4] px-4 sm:px-5 py-3 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-bold text-xs sm:text-sm text-[#5d0e0e] leading-tight">
              15-Day Advance Mehandi Workshop
            </h4>
            <p className="text-[10px] sm:text-[11px] text-gray-700 font-sans font-medium mt-0.5">
              ⚡ Studio &amp; Online Batches • Hands-on Certificate Training
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Join Now WhatsApp Button */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onClose();
                if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                  (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'workshop_popup_join_click' });
                }
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-[#0d695e] hover:bg-[#075e54] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 cursor-pointer border border-[#25D366]/40"
            >
              <WhatsAppIcon size={14} />
              <span>Join Now</span>
            </a>

            {/* Quick Call Button */}
            <a
              href={`tel:${cleanPhone}`}
              onClick={() => {
                onClose();
                if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                  (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'workshop_popup_call_click' });
                }
              }}
              className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#5d0e0e] border border-[#c5a059]/40 text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs cursor-pointer shrink-0"
              title="Call Sandhya"
            >
              <Phone size={13} className="text-[#c5a059]" />
              <span className="hidden sm:inline">Call</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
