import { 
  Calendar, 
  Users, 
  Award, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  BookOpen, 
  Package, 
  Palette, 
  MapPin, 
  HeartHandshake, 
  Flame,
  Check
} from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface DecemberBatchDetailedSectionProps {
  profile: ProfileInfo;
}

export function DecemberBatchDetailedSection({ profile }: DecemberBatchDetailedSectionProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const whatsappMessage = encodeURIComponent(
    'Hello Sandhya, I saw the December Batch Basic to Bridal Mehndi Course (40 Days) on your Classes page. I want to Book My Seat at the offer fee of ₹3,500 (Regular ₹6,000). Please confirm seat availability and enrollment steps.'
  );

  const whatYouWillLearn = [
    'Basic Mehndi Strokes & Patterns',
    'Floral, Leaf, Peacock & Arabic Designs',
    'Bridal Mehndi (Full Hand & Feet)',
    'Figure & Portrait Work (Optional Advanced)',
    'Modern & Traditional Styles',
    'Tips & Tricks for Professional Work'
  ];

  const mixologyTopics = [
    '100% Natural Ingredients & Sojat Henna',
    'Best Colour Chemistry & Long-Stain Tips',
    'Different Consistency for Outlines & Shading',
    'Tips for Long-Lasting Deep Maroon Results'
  ];

  const kitInclusions = [
    'Premium Cellophane Mehndi Cones',
    'Laminated Reusable Practice Sheets',
    'Comprehensive Design Book & Lecture Notes',
    'Essential Tools (Scissor, Tape, Oil Bottles)',
    'Dedicated After-Course Mentorship Support'
  ];

  const whyJoinPoints = [
    { title: 'Expert Guidance', desc: 'Direct 1-on-1 hand corrections by master artist Sandhya' },
    { title: 'Live Practice', desc: 'Hands-on practice directly on live models & acrylic boards' },
    { title: 'Doubt Support', desc: 'Instant feedback & daily personalized task evaluations' },
    { title: 'Certificate Provided', desc: 'Official signed Course Completion Certificate' },
    { title: 'Lifetime Support', desc: 'Continuous access to community & guidance after graduation' },
    { title: 'Start Your Business', desc: 'Complete client acquisition, pricing & bridal marketing roadmap' }
  ];

  return (
    <section id="december-batch" className="mb-16 scroll-mt-24 select-none">
      <div className="bg-gradient-to-br from-[#2a0407] via-[#4d0c10] to-[#2a0407] text-[#faf3df] rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-[#c5a059]/60 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Gold Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/15 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

        {/* Top Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-xs font-bold tracking-widest uppercase mb-3 border border-[#c5a059]/40 font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <Sparkles size={14} className="text-[#c5a059]" />
            <span>Registration Open • Special December 2026 Batch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#faf3df] leading-tight">
            Basic to Bridal Mehndi Course
          </h2>
          <p className="text-base sm:text-lg text-[#c5a059] font-serif font-semibold mt-1">
            40 Days Comprehensive Professional Artistry Program
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#efe1b4] font-sans leading-relaxed max-w-2xl mx-auto">
            Learn • Create • Grow with Alankarini Mehandi Art. Master foundational strokes to intricate royal bridal figures, chemical-free henna paste mixology, and start your successful mehndi career with artist Sandhya.
          </p>
        </div>

        {/* Main Grid: Poster Image (Left) + Details & Modules (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 mb-10">
          
          {/* Left Column: Full Poster dec_batch.jpeg */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#c5a059]/70 group bg-[#1f0305]">
              {/* Badge Overlays */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/95 text-white text-[10px] font-bold uppercase tracking-wider shadow-md border border-white/40">
                <Flame size={12} className="text-amber-300" />
                <span>Starts 3rd Dec 2026</span>
              </div>

              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-700/95 text-white text-[10px] font-bold uppercase tracking-wider shadow-md border border-white/40">
                <Users size={12} className="text-emerald-200" />
                <span>Only 20 Seats</span>
              </div>

              <img
                src="/dec_batch.jpeg"
                alt="Basic to Bridal Mehndi Course - December Batch Announcement Poster"
                width={800}
                height={1200}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Poster Caption */}
            <p className="mt-3 text-[11px] text-[#efe1b4] font-sans font-medium text-center">
              📸 Official Batch Poster • 40 Days Practical Training &amp; Full Henna Kit
            </p>
          </div>

          {/* Right Column: Key Details, Fee Offer & Benefits */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Pricing Offer Banner */}
            <div className="bg-gradient-to-r from-white/10 to-white/5 border-2 border-[#c5a059]/50 rounded-2xl p-5 sm:p-6 shadow-lg backdrop-blur-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#c5a059]">
                    🎁 Special Early Bird Enrollment Offer
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-price font-extrabold text-white tracking-tight">
                      ₹3,500
                    </span>
                    <span className="text-sm sm:text-base text-gray-400 line-through font-price font-medium">
                      ₹6,000
                    </span>
                    <span className="bg-emerald-600 text-white text-xs font-price font-bold uppercase px-2.5 py-0.5 rounded-full border border-emerald-400">
                      Save ₹2,500 (42% OFF)
                    </span>
                  </div>
                  <p className="text-xs text-[#efe1b4] font-sans mt-1.5">
                    Includes Complete 40-Day Classes + Take-Home Mehndi Kit + Official Certificate
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3 py-1.5 rounded-xl">
                    <Users size={14} className="text-amber-400" />
                    <span>Limited to 20 Seats</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Key Badges */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-[#c5a059]/30">
                <span className="block font-serif font-bold text-xs sm:text-sm text-[#faf3df]">Professional</span>
                <span className="text-[10px] text-[#c5a059]">Training Quality</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-[#c5a059]/30">
                <span className="block font-serif font-bold text-xs sm:text-sm text-[#faf3df]">Small Batch</span>
                <span className="text-[10px] text-[#c5a059]">Personal Attention</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-[#c5a059]/30">
                <span className="block font-serif font-bold text-xs sm:text-sm text-[#faf3df]">Learn &amp; Grow</span>
                <span className="text-[10px] text-[#c5a059]">Career Mentorship</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-badge-blink flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-sans text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all duration-300 hover:scale-102 active:scale-98 border-2 border-white/80 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <WhatsAppIcon size={18} />
                <span>Book Your Seat Now (<span className="font-price font-extrabold">₹3,500</span>)</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#faf3df] border border-[#c5a059]/50 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                title="Call Sandhya"
              >
                <Phone size={15} className="text-[#c5a059]" />
                <span>Call Helpline</span>
              </a>
            </div>

          </div>
        </div>

        {/* Detailed 4-Cards Grid: Syllabus, Mixology, Kit Included, Why Join */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Card 1: What You Will Learn? */}
          <div className="bg-white/5 border border-[#c5a059]/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-[#c5a059]/25 text-[#c5a059] rounded-xl border border-[#c5a059]/40">
                  <Palette size={18} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#faf3df]">
                  What You Will Learn?
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#efe1b4] font-sans">
                {whatYouWillLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Mixology - Mehndi Paste Making */}
          <div className="bg-white/5 border border-[#c5a059]/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-[#c5a059]/25 text-[#c5a059] rounded-xl border border-[#c5a059]/40">
                  <Sparkles size={18} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#faf3df]">
                  Mixology – Mehndi Paste Making
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#efe1b4] font-sans">
                {mixologyTopics.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: Mehndi Kit Included */}
          <div className="bg-white/5 border border-[#c5a059]/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-[#c5a059]/25 text-[#c5a059] rounded-xl border border-[#c5a059]/40">
                  <Package size={18} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#faf3df]">
                  Mehndi Kit Included
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#efe1b4] font-sans">
                {kitInclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 4: Why Join? */}
          <div className="bg-white/5 border border-[#c5a059]/30 rounded-2xl p-5 sm:p-6 backdrop-blur-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 bg-[#c5a059]/25 text-[#c5a059] rounded-xl border border-[#c5a059]/40">
                  <HeartHandshake size={18} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#faf3df]">
                  Why Join Alankarini Academy?
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#efe1b4] font-sans">
                {whyJoinPoints.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="font-bold text-[#faf3df] block">{item.title}</span>
                    <span className="text-[11px] text-gray-300 leading-snug">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Address and Contact Footer Card */}
        <div className="mt-8 pt-6 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs font-sans">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <MapPin size={18} className="text-[#c5a059] shrink-0" />
            <div>
              <span className="font-bold text-[#faf3df] block">Studio Training Location:</span>
              <span className="text-[#efe1b4] text-[11px]">
                Nawabganj, Durgakund, Jawahar Nagar Colony, Bhelupur, Varanasi, Uttar Pradesh 221005
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-gray-300">Helpline:</span>
            <a 
              href={`tel:${cleanPhone}`} 
              className="font-bold text-[#faf3df] hover:text-[#c5a059] underline text-sm"
            >
              +91 9336814631
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
