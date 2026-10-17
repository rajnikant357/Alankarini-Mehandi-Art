import { Calendar, Users, Award, Sparkles, ArrowRight, Phone, Flame } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface DecemberBatchAnnouncementBannerProps {
  profile: ProfileInfo;
  setView?: (view: string) => void;
  variant?: 1 | 2 | 3;
  showViewDetails?: boolean;
  compactOnMobile?: boolean;
}

export function DecemberBatchAnnouncementBanner({
  profile,
  setView,
  variant = 1,
  showViewDetails = true,
  compactOnMobile = false
}: DecemberBatchAnnouncementBannerProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const urgencyMessages = {
    1: '🔥 Special Offer Fee: ₹3,500 (Reg. ₹6,000 • Save ₹2,500) • Starts 3rd Dec • 40 Days Program',
    2: '⚡ Limited to 20 Seats Only! • 40 Days Basic to Bridal • Complete Kit & Certificate Included',
    3: '⏳ Seats Filling Fast for Dec 2026! • Live Model Practice & Mixology • Flat ₹2,500 OFF'
  };

  const currentUrgency = urgencyMessages[variant] || urgencyMessages[1];

  const whatsappMessage = encodeURIComponent(
    'Hello Sandhya, I saw the December Batch Basic to Bridal Mehndi Course (40 Days) announcement on your website. I want to register at the offer fee of ₹3,500 (Regular ₹6,000). Please reserve my seat.'
  );

  const handleViewDetails = () => {
    if (setView) {
      setView('classes');
      setTimeout(() => {
        const el = document.getElementById('december-batch');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.location.href = '/classes#december-batch';
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-[#240306] via-[#480a0f] to-[#240306] text-[#faf3df] border-y-2 border-[#c5a059]/60 shadow-xl overflow-hidden select-none">
      {/* Subtle gold ambient glow in background */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#c5a059]/15 rounded-full filter blur-2xl pointer-events-none"></div>
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#c5a059]/15 rounded-full filter blur-2xl pointer-events-none"></div>

      {/* ---------------- MOBILE VIEW ONLY (md:hidden) ---------------- */}
      {compactOnMobile ? (
        /* Slim / Compact Mobile Bar (Used above Hero Section) */
        <div className="flex md:hidden items-center justify-between w-full px-3.5 py-2.5 gap-3 relative z-10 min-h-[52px]">
          {/* Left: Dec Batch Text */}
          <div className="flex-1 text-left min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-ping"></span>
              <h3 className="font-serif font-black text-xs sm:text-sm text-[#faf3df] leading-tight tracking-tight line-clamp-1">
                Dec Batch: Basic to Bridal (40 Days)
              </h3>
            </div>
            <p className="text-[#efe1b4] text-[10px] sm:text-[11px] font-sans font-medium line-clamp-1 mt-0.5 leading-snug">
              Starts 3rd Dec • Offer <span className="font-price font-bold text-white">₹3,500</span> <span className="line-through text-gray-400 font-price text-[9px]">₹6,000</span>
            </p>
          </div>

          {/* Right: Register Now Button */}
          <div className="shrink-0 flex items-center">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-badge-blink inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-sans text-xs font-black uppercase tracking-wider border border-white/60 shadow-md shrink-0 cursor-pointer active:scale-95 transition-transform"
              title="Register Now via WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0"></span>
              <span>Register ₹3,500</span>
            </a>
          </div>
        </div>
      ) : (
        /* Detailed Mobile Bar (Used for all in-between positions with poster thumbnail, badges, details) */
        <div className="flex md:hidden flex-col w-full px-3.5 py-3 gap-2 relative z-10">
          {/* Top Row: Poster thumbnail & Dec batch badge on Top Left, Limited Batch badge on Top Right */}
          <div className="flex items-center justify-between w-full">
            {/* Top Left: Dec Batch Poster thumbnail + Batch Badge */}
            <div className="flex items-center gap-2">
              {/* Poster Thumbnail */}
              <div className="relative w-10 h-12 rounded-lg overflow-hidden border-2 border-[#c5a059] shadow-md shrink-0 bg-[#1f0305] ring-1 ring-[#c5a059]/40">
                <img
                  src="/dec_batch.jpeg"
                  alt="December Batch Basic to Bridal Mehndi Course"
                  width={60}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-red-600/90 text-white text-[8px] font-bold text-center py-0.2 uppercase">
                  40D
                </span>
              </div>

              <div className="flex flex-col">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-[9px] font-bold uppercase tracking-wider border border-[#c5a059]/40 w-fit">
                  <Sparkles size={9} className="text-[#c5a059]" />
                  December 2026 Batch
                </span>
                <span className="text-[10px] text-amber-300 font-bold mt-0.5 flex items-center gap-1">
                  <Flame size={10} className="text-amber-400" />
                  Starts 3rd Dec 2026
                </span>
              </div>
            </div>

            {/* Top Right: Limited Batch Badge */}
            <div className="flex items-center shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-200 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40">
                <Users size={10} className="text-emerald-400" />
                Only 20 Seats
              </span>
            </div>
          </div>

          {/* Full Width: Title */}
          <h3 className="w-full font-serif font-black text-base text-[#faf3df] leading-tight tracking-tight text-center sm:text-left mt-0.5">
            Basic to Bridal Mehndi Course (40 Days)
          </h3>

          {/* Under it: Urgency Message & Fee */}
          <p className="w-full text-[#efe1b4] text-[11px] sm:text-xs font-sans font-medium text-center sm:text-left leading-snug">
            {currentUrgency}
          </p>

          {/* Bottom: Register Now on the Left of View Details */}
          <div className="w-full flex items-center justify-center gap-3 sm:gap-4 pt-2 border-t border-[#c5a059]/25 mt-0.5">
            {/* Animated Blinking Register Button */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-badge-blink inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-sans text-xs font-black uppercase tracking-wider border border-white/60 shadow-md shrink-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Register Now via WhatsApp"
            >
              <WhatsAppIcon size={13} />
              <span>Register @ <span className="font-price font-extrabold">₹3,500</span></span>
            </a>

            {/* View Details Link (hidden on classes page if desired) */}
            {showViewDetails && (
              <button
                type="button"
                onClick={handleViewDetails}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#faf3df] hover:text-[#c5a059] active:text-[#c5a059] uppercase tracking-wider transition-colors cursor-pointer py-1"
              >
                <span className="underline underline-offset-4 decoration-[#c5a059]/60 hover:decoration-[#c5a059]">View Syllabus</span>
                <ArrowRight size={13} className="text-[#c5a059]" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------------- DESKTOP VIEW (hidden md:flex) ---------------- */}
      <div className={`hidden md:flex max-w-7xl mx-auto px-6 lg:px-8 ${compactOnMobile ? 'h-[76px]' : 'h-[96px]'} items-center justify-between gap-4 relative z-10`}>
        
        {/* Left Side: Dec Batch Poster Thumbnail + Title & Urgency */}
        <div className="flex items-center gap-4">
          
          {/* Dec Batch Poster Thumbnail in Gold Frame */}
          <div className={`relative ${compactOnMobile ? 'h-13 w-10' : 'h-16 w-12'} rounded-lg overflow-hidden border-2 border-[#c5a059] shadow-md shrink-0 bg-[#1f0305] ring-2 ring-[#c5a059]/30`}>
            <img
              src="/dec_batch.jpeg"
              alt="December Batch Basic to Bridal Mehndi Course Poster"
              width={80}
              height={110}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top scale-102"
            />
            {/* Live Indicator Pip */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#480a0f]"></span>
          </div>

          {/* Title & Urgency Message */}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-[10px] font-bold uppercase tracking-wider border border-[#c5a059]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Dec 2026 Batch</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/40">
                <Flame size={10} className="text-amber-400" />
                <span>Starts 3rd Dec</span>
              </span>
              <h3 className="font-serif font-black text-base lg:text-lg text-[#faf3df] leading-tight tracking-tight">
                Basic to Bridal Mehndi Course (40 Days)
              </h3>
            </div>
            
            <p className="text-[#efe1b4] text-xs font-sans font-medium flex items-center gap-2 mt-1 leading-snug">
              <span>{currentUrgency}</span>
            </p>
          </div>
        </div>

        {/* Right Side: Blinking Register Badge + Call + View Details */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Animated Blinking Register Badge */}
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-badge-blink inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-sans text-xs font-black uppercase tracking-wider border border-white/60 shadow-lg shrink-0 cursor-pointer hover:scale-105 transition-transform"
            title="Register Now via WhatsApp"
          >
            <WhatsAppIcon size={14} />
            <span>Register @ <span className="font-price font-extrabold">₹3,500</span></span>
          </a>

          {/* Quick Call Button */}
          <a
            href={`tel:${cleanPhone}`}
            onClick={() => {
              if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                (window as unknown as { dataLayer: object[] }).dataLayer.push({
                  event: 'dec_batch_call_click',
                  banner_variant: variant
                });
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#faf3df] text-xs font-bold uppercase tracking-wider transition-colors border border-[#c5a059]/40 shrink-0 cursor-pointer"
            title="Call Helpline"
          >
            <Phone size={13} className="text-[#c5a059]" />
            <span>Call</span>
          </a>

          {/* View Syllabus Link (hidden on classes page if desired) */}
          {showViewDetails && (
            <button
              type="button"
              onClick={handleViewDetails}
              className="inline-flex items-center gap-1 text-xs font-sans font-bold text-[#c5a059] hover:text-white uppercase tracking-wider transition-colors cursor-pointer pl-1"
            >
              <span>View Syllabus</span>
              <ArrowRight size={13} />
            </button>
          )}

        </div>

      </div>
    </section>
  );
}
