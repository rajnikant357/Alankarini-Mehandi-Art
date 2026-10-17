import { Calendar, Users, Award, Sparkles, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface DecemberBatchHomeSectionProps {
  profile: ProfileInfo;
  setView: (view: string) => void;
}

export function DecemberBatchHomeSection({ profile, setView }: DecemberBatchHomeSectionProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const whatsappMessage = encodeURIComponent(
    'Hello Sandhya, I saw the December Batch Basic to Bridal Mehndi Course (40 Days) announcement on your website. I want to register at the offer fee of ₹3,500 (Regular ₹6,000). Please reserve my seat.'
  );

  const handleViewDetails = () => {
    setView('classes');
    setTimeout(() => {
      const el = document.getElementById('december-batch');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-8 bg-gradient-to-r from-[#2a0407] via-[#4d0c10] to-[#2a0407] text-[#faf3df] border-y-2 border-[#c5a059]/50 shadow-lg relative overflow-hidden select-none">
      {/* Subtle ambient gold blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#c5a059]/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          
          {/* Left: Thumbnail poster + Main copy */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left flex-1">
            {/* Poster Thumbnail */}
            <div className="relative w-28 sm:w-32 aspect-[2/3] rounded-xl overflow-hidden border-2 border-[#c5a059]/70 shadow-md shrink-0 bg-[#1f0305] group">
              <img
                src="/dec_batch.jpeg"
                alt="December Batch Basic to Bridal Mehndi Course Poster"
                width={200}
                height={300}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow uppercase">
                40 Days
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#c5a059]/40 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <Sparkles size={12} className="text-[#c5a059]" />
                <span>Registration Open • December 2026 Batch</span>
              </div>

              {/* Title */}
              <h3 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-[#faf3df] leading-tight">
                Basic to Bridal Mehndi Course (40 Days)
              </h3>

              {/* Sub-highlights */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-[#efe1b4]">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={13} className="text-[#c5a059]" />
                  <span>Starts <strong>3rd December 2026</strong></span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1">
                  <Users size={13} className="text-[#c5a059]" />
                  <span>Limited: <strong>Only 20 Seats</strong></span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1">
                  <Award size={13} className="text-[#c5a059]" />
                  <span>Kit &amp; Certificate Included</span>
                </span>
              </div>

              {/* Fee Offer Callout */}
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2.5">
                <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Special Fee:</span>
                <span className="text-2xl sm:text-3xl font-price font-extrabold text-[#faf3df] tracking-tight">
                  ₹3,500
                </span>
                <span className="text-xs text-gray-400 line-through font-price font-medium">
                  ₹6,000
                </span>
                <span className="bg-emerald-600/90 text-white text-[10px] font-price font-bold uppercase px-2 py-0.5 rounded-full border border-emerald-400/50">
                  Save ₹2,500
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0 justify-center">
            {/* WhatsApp Register Button */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-badge-blink inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-sans text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg transition-all active:scale-95 border border-white/60 cursor-pointer"
            >
              <WhatsAppIcon size={16} />
              <span>Register at <span className="font-price font-extrabold">₹3,500</span></span>
            </a>

            {/* View Full Details Button */}
            <button
              type="button"
              onClick={handleViewDetails}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#faf3df] border border-[#c5a059]/40 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>View Full Syllabus</span>
              <ArrowRight size={13} className="text-[#c5a059]" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
