import { Phone, Sparkles, ArrowRight } from 'lucide-react';
import { ProfileInfo } from '../types';

interface WorkshopAnnouncementBannerProps {
  profile: ProfileInfo;
  setView?: (view: string) => void;
  variant?: 1 | 2 | 3;
  showViewDetails?: boolean;
  compactOnMobile?: boolean;
}

export function WorkshopAnnouncementBanner({ 
  profile, 
  setView, 
  variant = 1,
  showViewDetails = true,
  compactOnMobile = false
}: WorkshopAnnouncementBannerProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  // Tailored urgency messages for different positions
  const urgencyMessages = {
    1: '⚡ Limited Seats Left! • Intensive Studio & Live Online Masterclass',
    2: '🔥 Only 5 Seats Left! • Master Intricate Bridal Figures & Arabic Techniques',
    3: '⏳ Next Batch Starting Soon! • 100% Practical Mentorship & Henna Kit Included'
  };

  const currentUrgency = urgencyMessages[variant] || urgencyMessages[1];

  const whatsappMessage = encodeURIComponent(
    'Hello Sandhya, I saw the 15-Day Advance Mehandi Workshop announcement on your website. Please share seat availability, fees, and syllabus details.'
  );

  const handleViewDetails = () => {
    if (setView) {
      setView('classes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/classes';
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-[#380509] via-[#5d0e0e] to-[#380509] text-[#faf3df] border-y-2 border-[#c5a059]/60 shadow-xl overflow-hidden select-none">
      {/* Subtle gold ambient glow in background */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#c5a059]/15 rounded-full filter blur-2xl pointer-events-none"></div>
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#c5a059]/15 rounded-full filter blur-2xl pointer-events-none"></div>

      {/* ---------------- MOBILE VIEW ONLY (md:hidden) ---------------- */}
      {compactOnMobile ? (
        /* Slim / Compact Mobile Bar (Used above Hero Section) */
        <div className="flex md:hidden items-center justify-between w-full px-3.5 py-2.5 gap-3 relative z-10 min-h-[52px]">
          {/* Left: 15 Day Advance Mehandi Workshop Text */}
          <div className="flex-1 text-left min-w-0 pr-1">
            <h3 className="font-serif font-black text-xs sm:text-sm text-[#faf3df] leading-tight tracking-tight line-clamp-1">
              15-Day Advance Mehandi Workshop
            </h3>
            <p className="text-[#efe1b4] text-[10px] sm:text-[11px] font-sans font-medium line-clamp-1 mt-0.5 leading-snug">
              {currentUrgency}
            </p>
          </div>

          {/* Right: Join Now Button */}
          <div className="shrink-0 flex items-center">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-badge-blink inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-sans text-xs font-black uppercase tracking-wider border border-white/60 shadow-md shrink-0 cursor-pointer active:scale-95 transition-transform"
              title="Join Now via WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0"></span>
              <span>Join Now</span>
            </a>
          </div>
        </div>
      ) : (
        /* Detailed Mobile Bar (Used for all other announcement positions with Sandhya image, badge, details) */
        <div className="flex md:hidden flex-col w-full px-3.5 py-3 gap-2 relative z-10">
          {/* Top Row: Sandhya image & Workshop badge on Top Left, Limited Batch badge on Top Right */}
          <div className="flex items-center justify-between w-full">
            {/* Top Left: Sandhya Image + Workshop Badge */}
            <div className="flex items-center gap-2">
              {/* Sandhya Portrait in Gold Ring */}
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#c5a059] shadow-md shrink-0 bg-[#2b0407] ring-1 ring-[#c5a059]/40">
                <img
                  src="/sandhya.png"
                  alt="Artist Sandhya Chauhan - Master Mehndi Trainer"
                  width={88}
                  height={88}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top scale-105"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#5d0e0e]"></span>
              </div>

              {/* Workshop Badge PNG */}
              <img
                src="/workshop badge.png"
                alt="15-Day Advance Mehndi Workshop Badge"
                width={90}
                height={45}
                loading="lazy"
                decoding="async"
                className="h-9 w-auto object-contain shrink-0 drop-shadow-md"
              />
            </div>

            {/* Top Right: Limited Batch Badge */}
            <div className="flex items-center shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-[10px] font-bold uppercase tracking-wider border border-[#c5a059]/40">
                <Sparkles size={10} className="text-[#c5a059]" />
                Limited Batch
              </span>
            </div>
          </div>

          {/* Full Width: Title */}
          <h3 className="w-full font-serif font-black text-base text-[#faf3df] leading-tight tracking-tight text-center sm:text-left mt-0.5">
            15-Day Advance Mehandi Workshop
          </h3>

          {/* Under it: Urgency Message */}
          <p className="w-full text-[#efe1b4] text-[11px] sm:text-xs font-sans font-medium text-center sm:text-left leading-snug">
            {currentUrgency}
          </p>

          {/* Bottom: Join Now on the Left of View Details */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-4 pt-2 border-t border-[#c5a059]/25 mt-0.5">
            {/* Animated Blinking Join Now Button on the Left */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-badge-blink inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-sans text-xs font-black uppercase tracking-wider border border-white/60 shadow-md shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Join Now via WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0"></span>
              <span>Join Now</span>
            </a>

            {/* View Details Link (hidden on classes page) */}
            {showViewDetails && (
              <button
                type="button"
                onClick={handleViewDetails}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#faf3df] hover:text-[#c5a059] active:text-[#c5a059] uppercase tracking-wider transition-colors cursor-pointer py-1"
              >
                <span className="underline underline-offset-4 decoration-[#c5a059]/60 hover:decoration-[#c5a059]">View Details</span>
                <ArrowRight size={13} className="text-[#c5a059]" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------------- DESKTOP VIEW (hidden md:flex) ---------------- */}
      <div className={`hidden md:flex max-w-7xl mx-auto px-6 lg:px-8 ${compactOnMobile ? 'h-[76px]' : 'h-[96px]'} items-center justify-between gap-4 relative z-10`}>
        
        {/* Left Side: Sandhya Image + Workshop Badge + Title & Urgency */}
        <div className="flex items-center gap-4">
          
          {/* Sandhya Portrait in Gold Ring */}
          <div className={`relative ${compactOnMobile ? 'w-[54px] h-[54px]' : 'w-[68px] h-[68px]'} rounded-full overflow-hidden border-2 border-[#c5a059] shadow-md shrink-0 bg-[#2b0407] ring-2 ring-[#c5a059]/30`}>
            <img
              src="/sandhya.png"
              alt="Artist Sandhya Chauhan - Master Mehndi Trainer"
              width={144}
              height={144}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top scale-105"
            />
            {/* Live Indicator Pip */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#5d0e0e] shadow-xs"></span>
          </div>

          {/* Workshop Badge PNG */}
          <img
            src="/workshop badge.png"
            alt="15-Day Advance Mehndi Workshop Badge"
            width={120}
            height={60}
            loading="lazy"
            decoding="async"
            className={`${compactOnMobile ? 'h-11' : 'h-14'} w-auto object-contain shrink-0 drop-shadow-md`}
          />

          {/* Title & Urgency Message */}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-[10px] font-bold uppercase tracking-wider border border-[#c5a059]/40">
                <Sparkles size={10} className="text-[#c5a059]" />
                Limited Batch
              </span>
              <h3 className={`font-serif font-black ${compactOnMobile ? 'text-base lg:text-lg' : 'text-lg'} text-[#faf3df] leading-tight tracking-tight`}>
                15-Day Advance Mehandi Workshop
              </h3>
            </div>
            
            <p className="text-[#efe1b4] text-xs font-sans font-medium flex items-center gap-1.5 mt-1 leading-snug">
              <span>{currentUrgency}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Blinking Join Now Badge + Call + View Details */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Animated Blinking Join Now Badge */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-badge-blink inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-sans text-xs font-black uppercase tracking-wider border border-white/60 shadow-lg shrink-0 cursor-pointer hover:scale-105 transition-transform"
            title="Blinking Join Now Badge"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0"></span>
            <span>Join Now</span>
          </a>

          {/* Quick Call Button */}
          <a
            href={`tel:${cleanPhone}`}
            onClick={() => {
              if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                (window as unknown as { dataLayer: object[] }).dataLayer.push({
                  event: 'workshop_call_click',
                  banner_variant: variant
                });
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#faf3df] text-xs font-bold uppercase tracking-wider transition-colors border border-[#c5a059]/40 shrink-0 cursor-pointer"
            title="Call Sandhya"
          >
            <Phone size={13} className="text-[#c5a059]" />
            <span>Call</span>
          </a>

          {/* View Details Link to Classes (hidden on classes page) */}
          {showViewDetails && (
            <button
              type="button"
              onClick={handleViewDetails}
              className="inline-flex items-center gap-1 text-xs font-sans font-bold text-[#c5a059] hover:text-white uppercase tracking-wider transition-colors cursor-pointer pl-1"
            >
              <span>View Details</span>
              <ArrowRight size={13} />
            </button>
          )}

        </div>

      </div>
    </section>
  );
}
