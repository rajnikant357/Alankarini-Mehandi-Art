import { useState } from 'react';
import { 
  GraduationCap, 
  Video, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  Phone, 
  Clock, 
  Award, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Package,
  Palette,
  Check,
  Star
} from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DecemberBatchDetailedSection } from './DecemberBatchDetailedSection';

interface MehandiClassesSectionProps {
  profile: ProfileInfo;
  setView: (view: string) => void;
  previewOnly?: boolean;
}

export function MehandiClassesSection({ profile, setView, previewOnly = false }: MehandiClassesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'offline'>('all');
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const feePackages = [
    {
      id: 'online-go',
      modeType: 'online',
      name: 'Online Go Batch',
      batchQueryName: 'Online Go batch',
      mode: 'Live Interactive Video Batches (Zoom / Google Meet)',
      fee: '₹1,500',
      originalFee: '₹2,999',
      duration: '35 Days',
      subheading: 'Classes to Learn (No Kit, No Certificate)',
      kitIncluded: false,
      certificateIncluded: false,
      popular: false,
      highlights: [
        'Complete 35-Day Syllabus (All 4 Modules Included)',
        'Live 1-on-1 hand corrections & doubt solving',
        'High-definition camera closeups on fine cone work',
        'Lifetime access to lecture recordings & digital practice sheets',
        'Flexible morning & evening live batch slots',
        '❌ Personal Mehndi Kit: Not Included (Learn with own materials)',
        '❌ Course Completion Certificate: Not Included'
      ]
    },
    {
      id: 'online-plus',
      modeType: 'online',
      name: 'Online Plus Batch',
      batchQueryName: 'Online Plus batch',
      mode: 'Live Video Batches + Home-Delivered Henna Kit',
      fee: '₹2,000',
      originalFee: '₹3,999',
      duration: '35 Days',
      subheading: 'Complete Training with full Henna Kit & Certificate',
      kitIncluded: true,
      certificateIncluded: true,
      popular: true,
      highlights: [
        'Complete 35-Day Syllabus (All 4 Modules Included)',
        'Live 1-on-1 hand corrections & doubt solving',
        'High-definition camera closeups on fine cone work',
        'Lifetime access to lecture recordings & digital practice sheets',
        '🎁 Complete Henna Starter Kit Delivered to Doorstep',
        '🏆 Official Course Completion Certificate Included'
      ]
    },
    {
      id: 'offline-go',
      modeType: 'offline',
      name: 'Offline Go Batch',
      batchQueryName: 'Offline Go batch',
      mode: 'Durgakund Studio, Varanasi (Banaras)',
      fee: '₹3,500',
      originalFee: '₹5,999',
      duration: '35 Days',
      subheading: 'Studio Classes to Learn (No Kit, No Certificate)',
      kitIncluded: false,
      certificateIncluded: false,
      popular: false,
      highlights: [
        'Complete 35-Day Syllabus (All 4 Modules Included)',
        'Direct hand-over-hand physical pressure & cone guidance',
        'Studio acrylic practice boards provided during class hours',
        'Live bridal model practice & real-time symmetry guidance',
        'Daily in-person feedback by artist Sandhya',
        '❌ Personal Take-Home Mehndi Kit: Not Included',
        '❌ Course Completion Certificate: Not Included'
      ]
    },
    {
      id: 'offline-plus',
      modeType: 'offline',
      name: 'Offline Plus Batch',
      batchQueryName: 'Offline Plus batch',
      mode: 'Durgakund Studio + Take-Home Kit + Certificate',
      fee: '₹4,000',
      originalFee: '₹6,999',
      duration: '35 Days',
      subheading: 'Complete Studio Training with full Henna Kit & Certificate',
      kitIncluded: true,
      certificateIncluded: true,
      popular: true,
      highlights: [
        'Complete 35-Day Syllabus (All 4 Modules Included)',
        'Direct hand-over-hand physical pressure & cone guidance',
        'Studio acrylic practice boards provided during class hours',
        'Live bridal model practice & real-time symmetry guidance',
        'Live client wedding visit exposure during peak bridal season',
        '🎁 Professional Take-Home Henna Starter Kit Included',
        '🏆 Official Physical Course Completion Certificate Included'
      ]
    }
  ];

  const onlinePackages = feePackages.filter(pkg => pkg.modeType === 'online');
  const offlinePackages = feePackages.filter(pkg => pkg.modeType === 'offline');
  const showOnline = activeTab === 'all' || activeTab === 'online';
  const showOffline = activeTab === 'all' || activeTab === 'offline';

  const syllabusModules = [
    {
      module: 'Part 1',
      title: 'BASIC MEHANDI FOUNDATION',
      subtitle: '15 Core Building Blocks & Design Principles',
      icon: BookOpen,
      badge: '15 Essential Topics',
      description: 'Master complete cone pressure control, organic paste blending, traditional motifs, symmetry, and full hand compositions.',
      topics: [
        'Cone rolling & paste making',
        'Arabic elements, shading',
        'Flowers design, leaves',
        'Basic elements',
        'Partition Belt design',
        'Fillup & Belt design',
        'Negative filling',
        'Dark and light patches',
        'Mandala / Cirlce design',
        'Jhumka & check design',
        'Peacock / elephant design',
        'Keri/paisley design',
        'Belts design',
        'Arabic Belts',
        'Full hand presentation'
      ]
    },
    {
      module: 'Part 2',
      title: 'ADVANCE BRIDAL FIGURES',
      subtitle: '15 Portrait, Traditional & Religious Motifs',
      icon: Palette,
      badge: '15 Master Techniques',
      description: 'Create museum-grade bridal portraits, religious and festive ceremonies, 3D shading techniques, and full royal wedding coverage.',
      topics: [
        'Bridal Elements (part-1)',
        'Bridal Elements (part-2)',
        'Lotus design',
        'Rose flower design',
        'Shading techniques',
        'Grid work design',
        'Dulha Face Portrait',
        'Dulhan Face Portrait',
        'Baraat / Doli Ceremony',
        'Kanyadaan Ceremony',
        'Sindoor Daan scene',
        'Ganesh ji & Radha Krishna',
        'Hasthphool design',
        'Reverse negative filling',
        'Full Leg Bridal layout'
      ]
    },
    {
      module: 'Part 3',
      title: 'MODERN MEHANDI & FAST TECHNIQUES',
      subtitle: 'Trending Aesthetics & High-Speed Client Work',
      icon: Sparkles,
      badge: 'Speed & Contemporary',
      description: 'Train in trending Western-Arabic fusions, minimalist jewellery styling, high-speed wedding line setups, and festive quick-draw motifs.',
      topics: [
        'Indo-Western fusion lines',
        'Gulf & Dubai modern style',
        'Moroccan geometric patterns',
        'Jewellery bracelet Mehndi',
        'Tattoo & wrist cuffs',
        'Sangeet fast-speed motifs',
        'Backhand minimal elegance',
        'Engagement Ring-focus bands'
      ]
    },
    {
      module: 'Part 4',
      title: 'COMMERCIAL ARTISTRY & CONE CRAFT',
      subtitle: '100% Organic Cones, Pricing & Client Consultation',
      icon: Award,
      badge: 'Professional Business',
      description: 'Learn the exact organic recipe behind our stain longevity, professional wedding client management, social media growth, and pricing models.',
      topics: [
        'Triple-filtered Sojat henna grading',
        'Pure essential oils mixing ratio',
        'Chemical-free paste consistency',
        'Fine-tip cellophane cone rolling',
        'Stain aftercare & color science',
        'Bridal consultation & contracts',
        'Portfolio photography lighting',
        'Instagram reels & client branding'
      ]
    }
  ];

  const renderBatchCard = (pkg: typeof feePackages[0]) => (
    <div
      key={pkg.id}
      className={`bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative ${
        pkg.popular
          ? 'border-2 border-[#c5a059] shadow-lg ring-2 ring-[#c5a059]/20'
          : 'border border-gray-200/90 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Most Popular Badge on Plus Batches */}
      {pkg.popular && (
        <div className="absolute -top-3.5 right-4 bg-gradient-to-r from-[#5d0e0e] to-[#801414] text-[#faf3df] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-[#c5a059]/50 z-10">
          <Star size={11} className="fill-[#c5a059] text-[#c5a059]" />
          <span>Most Popular</span>
        </div>
      )}

      <div>
        {/* Batch Header: Name & Subheading Only */}
        <h5 className="font-serif font-bold text-xl sm:text-2xl text-[#5d0e0e] mb-1">
          {pkg.name}
        </h5>
        <p className="text-xs text-gray-600 font-sans mb-3.5 min-h-[34px] leading-relaxed">
          {pkg.subheading}
        </p>

        <div className="flex items-baseline gap-2 mb-3.5 pb-3 border-b border-gray-100">
          <span className="text-2xl sm:text-3xl font-price font-extrabold text-[#5d0e0e] tracking-tight">
            {pkg.fee}
          </span>
          <span className="text-xs text-gray-500 line-through font-price font-medium">
            {pkg.originalFee}
          </span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-sans">
            Special Offer
          </span>
        </div>

        {/* Kit & Certificate Inclusion Status Badges */}
        <div className="mb-4 p-2.5 rounded-xl bg-[#faf7f2] border border-[#c5a059]/20 space-y-1.5 text-xs font-medium">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 flex items-center gap-1.5">
              <Package size={13} className="text-[#875914]" />
              <span>Mehndi Starter Kit:</span>
            </span>
            {pkg.kitIncluded ? (
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <Check size={13} className="text-emerald-700" />
                <span>Included</span>
              </span>
            ) : (
              <span className="text-gray-600 font-medium flex items-center gap-1">
                <XCircle size={13} className="text-gray-500" />
                <span>Not Included</span>
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 flex items-center gap-1.5">
              <Award size={13} className="text-[#875914]" />
              <span>Completion Certificate:</span>
            </span>
            {pkg.certificateIncluded ? (
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <Check size={13} className="text-emerald-700" />
                <span>Included</span>
              </span>
            ) : (
              <span className="text-gray-600 font-medium flex items-center gap-1">
                <XCircle size={13} className="text-gray-500" />
                <span>Not Included</span>
              </span>
            )}
          </div>
        </div>

        <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wider mb-2">
          What You Get:
        </p>
        <ul className="space-y-1.5 mb-5 text-xs text-gray-700 font-sans">
          {pkg.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              {item.startsWith('❌') ? (
                <XCircle size={13} className="text-rose-500 shrink-0 mt-0.5" />
              ) : item.startsWith('🎁') || item.startsWith('🏆') ? (
                <CheckCircle2 size={13} className="text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 size={13} className="text-[#875914] shrink-0 mt-0.5" />
              )}
              <span className={item.startsWith('❌') ? 'text-gray-600' : ''}>{item.replace(/^[❌🎁🏆]\s*/, '')}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello Sandhya, I want to enroll in "${pkg.batchQueryName}" (${pkg.fee}). Please confirm my admission.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md ${
            pkg.popular
              ? 'bg-[#5d0e0e] hover:bg-[#801414] text-[#faf3df]'
              : 'bg-[#5d0e0e]/90 hover:bg-[#5d0e0e] text-[#faf3df]'
          }`}
        >
          <WhatsAppIcon size={14} />
          <span>Enroll at <span className="font-price font-extrabold">{pkg.fee}</span></span>
        </a>
      </div>
    </div>
  );

  {/* ========================================================================= */}
  {/* HERO SECTION: 15-DAY ADVANCE MEHANDI WORKSHOP ANNOUNCEMENT POSTER & DETAILS */}
  {/* ========================================================================= */}
  const renderWorkshopHero = () => (
    <div className="mb-16 bg-gradient-to-br from-[#2a0407] via-[#5d0e0e] to-[#2a0407] text-[#faf3df] rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-[#c5a059]/50 shadow-2xl relative overflow-hidden">
      {/* Ambient Gold Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/15 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left / Poster Column: Full Announcement Image workshop.png */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative max-w-sm sm:max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-[#c5a059]/60 group bg-[#1f0305]">
            {/* Top Tag on Image */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md border border-white/40">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>Limited Batch</span>
            </div>
            
            <img
              src="/workshop.png"
              alt="15-Day Advance Mehndi Workshop by Master Artist Sandhya Chauhan - Alankarini Mehndi Academy Varanasi"
              width={1024}
              height={1536}
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500 select-none"
            />
          </div>
          <p className="mt-3 text-[11px] text-[#efe1b4] font-sans font-medium text-center">
            ⚡ 15-Day Intensive Hands-on Masterclass • Hands-on Mentorship &amp; Certificate
          </p>
        </div>

        {/* Right / Details Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a059]/25 text-[#faf3df] text-xs font-bold tracking-widest uppercase mb-4 border border-[#c5a059]/40 font-sans">
            <Sparkles size={14} className="text-[#c5a059]" />
            <span>🎉 Special Masterclass Announcement • Limited Seats</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#faf3df] leading-tight">
            15-Day Advance Mehandi Workshop
          </h1>
          <p className="text-sm sm:text-base text-[#c5a059] font-serif font-semibold mt-1.5">
            By Certified Master Artist Sandhya Chauhan • Studio &amp; Live Interactive Online
          </p>

          <p className="mt-4 text-[#efe1b4] text-xs sm:text-sm font-sans leading-relaxed">
            Take your henna artistry to the highest professional level! This fast-track <strong>15-Day Advance Mehandi Workshop</strong> gives you rigorous, hands-on master training in royal bridal figures, realistic portrait shading, modern Arabic compositions, natural cone mixology, and commercial client marketing.
          </p>

          {/* Highlights Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 border border-[#c5a059]/30">
              <BookOpen size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#faf3df] block">15 Days Fast-Track</span>
                <span className="text-[#efe1b4] text-[11px]">Daily practical drill assignments &amp; live hand review</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 border border-[#c5a059]/30">
              <Palette size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#faf3df] block">Royal Bridal Figures</span>
                <span className="text-[#efe1b4] text-[11px]">Dulha-dulhan, portrait sketches &amp; 3D shading</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 border border-[#c5a059]/30">
              <Video size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#faf3df] block">Studio &amp; Online Options</span>
                <span className="text-[#efe1b4] text-[11px]">Durgakund studio or Zoom live with HD closeups</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/10 border border-[#c5a059]/30">
              <Award size={16} className="text-[#c5a059] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#faf3df] block">Official Certificate</span>
                <span className="text-[#efe1b4] text-[11px]">Signed masterclass credentials by Sandhya</span>
              </div>
            </div>
          </div>

          {/* Flashy Button + Helpline Actions */}
          <div className="mt-8 pt-6 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            {/* FLASHY BUTTON */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Sandhya, I saw the 15-Day Advance Mehandi Workshop on the Classes page. I want to Join Now! Please share seat availability, batch timings, and fee details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-badge-blink relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-sans text-sm sm:text-base font-black uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/80 cursor-pointer overflow-hidden ring-4 ring-red-500/30 text-center"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0"></span>
              <WhatsAppIcon size={20} />
              <span>Join 15-Day Workshop Now</span>
              <Sparkles size={18} className="text-amber-200" />
            </a>

            {/* Quick Call */}
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-[#faf3df] border border-[#c5a059]/50 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
              title="Call Sandhya"
            >
              <Phone size={16} className="text-[#c5a059]" />
              <span>Call Helpline</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );

  {/* ========================================================================= */}
  {/* 35-DAY MEHNDI CLASSES & COURSE DETAILS (MOVED TO BOTTOM OF CLASSES PAGE)  */}
  {/* ========================================================================= */}
  const render35DayCourseOverview = (isBottomSection: boolean = false) => (
    <div className={isBottomSection ? 'pt-16 mt-16 border-t-2 border-[#c5a059]/30' : ''}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe1b4]/50 text-[#5d0e0e] text-xs font-bold tracking-widest uppercase mb-3 border border-[#c5a059]/30 font-sans">
          <GraduationCap size={15} className="text-[#c5a059]" />
          <span>Alankarini Mehandi Academy • Beginner to Advanced Mehendi Classes • 35-Day Course</span>
        </div>
        
        {previewOnly ? (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#5d0e0e] leading-tight">
            Beginner to Advanced Mehendi Classes in Varanasi
          </h2>
        ) : (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#5d0e0e] leading-tight">
            Mehndi Classes &amp; Professional Mehendi Course in Varanasi
          </h2>
        )}
        
        <p className="mt-4 text-[#2d2d2d] text-sm sm:text-base font-sans leading-relaxed">
          Looking for <strong>mehendi classes for beginners</strong>, an authentic <strong>heena class</strong>, or complete <strong>beginner to advanced mehendi classes</strong>? 
          Alankarini Mehandi Academy offers a certified <strong>professional mehendi course</strong>, <strong>henna course</strong>, <strong>bridal mehendi classes</strong>, <strong>Arabic mehendi classes</strong>, <strong>advanced mehendi classes</strong>, and interactive <strong>online mehendi classes</strong>. Master <strong>basic mehendi</strong> fundamentals, <strong>mehendi design training</strong>, organic <strong>mehendi cones</strong> mixology, and <strong>kids mehandi classes</strong> with personalized 1-on-1 mentorship by artist Sandhya.
        </p>

        {/* Quick Course Highlights Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold text-[#5d0e0e]">
          <div className="inline-flex items-center gap-1.5 bg-[#f5efe4] border border-[#c5a059]/40 py-1.5 px-3.5 rounded-xl">
            <Clock size={14} className="text-[#c5a059]" />
            <span>Duration: <strong>35 Days</strong></span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#f5efe4] border border-[#c5a059]/40 py-1.5 px-3.5 rounded-xl">
            <BookOpen size={14} className="text-[#c5a059]" />
            <span>Beginner to Advanced Syllabus</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#f5efe4] border border-[#c5a059]/40 py-1.5 px-3.5 rounded-xl">
            <Sparkles size={14} className="text-[#c5a059]" />
            <span>Online &amp; Varanasi Studio</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 py-1.5 px-3.5 rounded-xl text-emerald-800">
            <Phone size={13} className="text-emerald-700 animate-pulse" />
            <span>Helpline: </span>
            <a href={`tel:${cleanPhone}`} className="font-bold underline hover:text-[#5d0e0e]">
              +91 9336814631
            </a>
          </div>
        </div>
      </div>

      {/* Feature Comparison Cards: Online vs Offline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Online Classes Card */}
        <div className="bg-gradient-to-br from-white to-[#faf5ec] p-6 sm:p-8 rounded-3xl border-2 border-[#c5a059]/30 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#c5a059]/10 rounded-full filter blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 bg-[#5d0e0e] text-[#faf3df] rounded-2xl shadow-inner">
                <Video size={24} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Learn from Anywhere
              </span>
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-[#5d0e0e]">
              Online Mehandi Classes
            </h3>
            <p className="text-xs text-gray-500 font-sans uppercase font-bold tracking-wider mt-1 mb-4">
              Live Interactive Video Batches (Zoom / Meet) • 35 Days
            </p>
            
            <p className="text-gray-700 text-sm font-sans leading-relaxed mb-6">
              Never worry about travel distance! Join our interactive <strong>online mehandi class</strong> from your home. Get real-time screen sharing, high-definition camera close-ups on fine cone work, daily task corrections, and recorded class archives so you never miss a lecture.
            </p>

            <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-gray-750 font-sans">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Full 35-day 4-module syllabus (Foundation, Bridal, Mixology, Instagram)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Live interactive 1-on-1 doubt clearing &amp; hand corrections</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Flexible morning &amp; evening batch slots for students &amp; homemakers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>Lifetime access to class video recordings &amp; printable practice sheets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span><strong>Online Go:</strong> <span className="font-price font-bold">₹1,500</span> (Classes only) • <strong>Online Plus:</strong> <span className="font-price font-bold">₹2,000</span> (With Kit &amp; Certificate)</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#c5a059]/20 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20am%20interested%20in%20the%2035-Day%20Online%20Mehandi%20Classes.%20Please%20share%20upcoming%20batch%20timings%20and%20enrollment%20details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0d695e] hover:bg-[#075E54] text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              <WhatsAppIcon size={15} />
              <span>Join Online Class</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-1.5 bg-white border border-[#5d0e0e] text-[#5d0e0e] hover:bg-[#f5efe4] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Phone size={14} />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

        {/* Offline Studio Classes Card */}
        <div className="bg-gradient-to-br from-white to-[#faf5ec] p-6 sm:p-8 rounded-3xl border-2 border-[#5d0e0e]/20 shadow-md hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#5d0e0e]/10 rounded-full filter blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-3 bg-[#c5a059] text-[#5d0e0e] rounded-2xl shadow-inner">
                <MapPin size={24} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                Durgakund, Varanasi Studio
              </span>
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-[#5d0e0e]">
              Offline Mehandi Class in Banaras
            </h3>
            <p className="text-xs text-gray-500 font-sans uppercase font-bold tracking-wider mt-1 mb-4">
              Hands-On Studio Training Near You in Varanasi • 35 Days
            </p>
            
            <p className="text-gray-700 text-sm font-sans leading-relaxed mb-6">
              Prefer direct physical mentorship? Join our <strong>offline mehandi class in Banaras</strong> located at Nawabganj, Durgakund. Learn proper hand posture, physical cone pressure, chemical-free henna blending, and practice directly on live bridal models.
            </p>

            <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-gray-750 font-sans">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                <span>Full 35-day 4-module syllabus (Foundation, Bridal, Mixology, Instagram)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                <span>Physical studio training with direct hand-over-hand guidance &amp; drills</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                <span>Studio located centrally at Durgakund, Varanasi (near Lanka / Assi)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                <span>Practice acrylic boards &amp; live bridal model sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#c5a059] shrink-0" />
                <span><strong>Offline Go:</strong> <span className="font-price font-bold">₹3,500</span> (Classes only) • <strong>Offline Plus:</strong> <span className="font-price font-bold">₹4,000</span> (With Kit &amp; Certificate)</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#c5a059]/20 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20enroll%20in%20the%2035-Day%20Offline%20Mehandi%20Classes%20in%20Varanasi%20(Durgakund).%20Please%20share%20studio%20batch%20timings.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              <WhatsAppIcon size={15} />
              <span>Visit Studio in Banaras</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-1.5 bg-white border border-[#5d0e0e] text-[#5d0e0e] hover:bg-[#f5efe4] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Phone size={14} />
              <span>Call +91 9336814631</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <section id="mehandi-classes" className={`py-12 lg:py-20 ${previewOnly ? 'bg-white' : 'bg-[#faf7f2]'} border-b border-[#c5a059]/15`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If previewOnly (Homepage Preview), show the 35-day course overview directly at top */}
        {previewOnly && render35DayCourseOverview(false)}

        {/* If dedicated classes page (!previewOnly), show the 15-Day Workshop Hero Section at the top */}
        {!previewOnly && (
          <>
            {/* 15-DAY ADVANCE MEHANDI WORKSHOP HERO */}
            {renderWorkshopHero()}

            {/* Transparent Pricing Packages Section */}
            <div className="mb-16">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-bold tracking-widest uppercase text-[#875914] font-sans">
                  💎 Transparent &amp; Affordable Pricing • 35 Days
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mt-1">
                  Course Fee Structure &amp; Inclusions
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm font-sans mt-2">
                  The <strong>35-day syllabus is 100% identical</strong> for all students. Choose whether you want learning classes only or the complete package with the physical Mehndi Kit &amp; Completion Certificate.
                </p>

                {/* Filter Tabs */}
                <div className="mt-6 inline-flex p-1 rounded-2xl bg-[#efe1b4]/40 border border-[#c5a059]/30">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                      activeTab === 'all' 
                        ? 'bg-[#5d0e0e] text-[#faf3df] shadow-sm' 
                        : 'text-[#5d0e0e] hover:bg-[#c5a059]/20'
                    }`}
                  >
                    All Packages (4)
                  </button>
                  <button
                    onClick={() => setActiveTab('online')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                      activeTab === 'online' 
                        ? 'bg-[#5d0e0e] text-[#faf3df] shadow-sm' 
                        : 'text-[#5d0e0e] hover:bg-[#c5a059]/20'
                    }`}
                  >
                    Online Batches
                  </button>
                  <button
                    onClick={() => setActiveTab('offline')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                      activeTab === 'offline' 
                        ? 'bg-[#5d0e0e] text-[#faf3df] shadow-sm' 
                        : 'text-[#5d0e0e] hover:bg-[#c5a059]/20'
                    }`}
                  >
                    Offline Studio (Banaras)
                  </button>
                </div>
              </div>

              {/* Kit & Certificate Policy Explanation Box */}
              <div className="bg-gradient-to-r from-[#fefbf6] via-[#faf3e7] to-[#fefbf6] border-2 border-[#c5a059]/40 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-[#5d0e0e] text-[#faf3df] rounded-xl shrink-0 mt-1 sm:mt-0">
                      <Award size={22} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#5d0e0e]">
                        Syllabus is Same for Every Student • Kit &amp; Certificate Terms
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-700 font-sans mt-1 leading-relaxed">
                        Every student completes the entire <strong>35-day 4-part master syllabus</strong>.
                        Only students enrolling in the <strong>₹2,000 (Online)</strong> or <strong>₹4,000 (Offline)</strong> tier receive the 
                        <strong> Henna Starter Kit</strong> and the verified <strong>Course Completion Certificate</strong>. 
                        The lower-fee <strong>₹1,500 (Online)</strong> and <strong>₹3,500 (Offline)</strong> tiers are exclusively for students who only want to learn the art (classes only, no kit and no certificate).
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#c5a059]/30 text-xs font-bold text-[#5d0e0e] shrink-0">
                    <Clock size={15} className="text-[#c5a059]" />
                    <span>Duration: 35 Days</span>
                  </div>
                </div>
              </div>

              {/* Batches Squares: Online Batches & Offline Batches */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Square 1: Online Batches */}
                {showOnline && (
                  <div className={`bg-gradient-to-b from-[#fdfbf7] to-white rounded-3xl p-6 sm:p-7 border-2 border-[#c5a059]/35 shadow-md flex flex-col justify-between ${!showOffline ? 'xl:col-span-2 max-w-4xl mx-auto w-full' : ''}`}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#c5a059]/20">
                        <div className="flex items-center gap-3">
                          <span className="p-2.5 bg-[#5d0e0e] text-[#faf3df] rounded-2xl shadow-inner">
                            <Video size={22} />
                          </span>
                          <div>
                            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e]">
                              Online Batches
                            </h4>
                            <p className="text-xs text-gray-600 font-sans mt-0.5">
                              Live Interactive Video Batches (Zoom / Meet) • 35 Days
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                          Learn from Anywhere
                        </span>
                      </div>

                      {/* Online Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {onlinePackages.map((pkg) => renderBatchCard(pkg))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Square 2: Offline Batches */}
                {showOffline && (
                  <div className={`bg-gradient-to-b from-[#fdfbf7] to-white rounded-3xl p-6 sm:p-7 border-2 border-[#5d0e0e]/25 shadow-md flex flex-col justify-between ${!showOnline ? 'xl:col-span-2 max-w-4xl mx-auto w-full' : ''}`}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#c5a059]/20">
                        <div className="flex items-center gap-3">
                          <span className="p-2.5 bg-[#c5a059] text-[#5d0e0e] rounded-2xl shadow-inner">
                            <MapPin size={22} />
                          </span>
                          <div>
                            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e]">
                              Offline Batches
                            </h4>
                            <p className="text-xs text-gray-600 font-sans mt-0.5">
                              Durgakund Studio, Varanasi (Banaras) • 35 Days
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                          Banaras Studio
                        </span>
                      </div>

                      {/* Offline Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {offlinePackages.map((pkg) => renderBatchCard(pkg))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* December 2026 Batch - Basic to Bridal Course (Fully Detailed Section under Course Fee Structure & Inclusions) */}
            <DecemberBatchDetailedSection profile={profile} />

            {/* Detailed 35-Day Syllabus (Shown in full detail) */}
            <div className="mb-16 bg-white p-6 sm:p-10 rounded-3xl border border-[#c5a059]/20 shadow-md">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-[#c5a059] font-sans">
                  📚 Comprehensive 35-Day Curriculum
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mt-1">
                  Mehandi Syllabus
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm font-sans mt-2">
                  Every enrolled student receives the full 35-day curriculum below, covering foundational strokes to royal bridal portraits and client marketing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {syllabusModules.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-br from-[#faf7f2] to-white p-6 sm:p-7 rounded-2xl border border-[#c5a059]/25 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="inline-flex items-center gap-2 bg-[#efe1b4]/60 text-[#5d0e0e] text-xs font-bold px-3 py-1 rounded-md">
                            <IconComponent size={14} className="text-[#5d0e0e]" />
                            <span>{item.module}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                            {item.badge}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-lg text-[#5d0e0e] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#c5a059] font-bold font-sans mb-2">
                          {item.subtitle}
                        </p>
                        <p className="text-xs text-gray-600 font-sans leading-relaxed mb-4">
                          {item.description}
                        </p>

                        <div className="pt-3 border-t border-[#c5a059]/20">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                            Key Topics Covered:
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 font-sans">
                            {item.topics.map((topic, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-1.5">
                                <CheckCircle2 size={13} className="text-[#c5a059] shrink-0 mt-0.5" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Certificate & Kit Summary Banner */}
              <div className="mt-8 p-5 bg-[#f5efe4] rounded-2xl border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="flex items-start sm:items-center gap-4 text-center sm:text-left">
                  <div className="p-3 bg-[#5d0e0e] text-[#faf3df] rounded-2xl shrink-0">
                    <Award size={28} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#5d0e0e]">
                      Official Completion Certificate &amp; Mehndi Starter Kit
                    </h4>
                    <p className="text-xs text-gray-700 font-sans mt-0.5 leading-relaxed">
                      Students enrolled in the <strong>₹2,000 (Online)</strong> or <strong>₹4,000 (Offline)</strong> packages receive an official course completion certificate signed by Sandhya, plus our complete Henna Starter Kit with triple-filtered Rajasthani sojat powder, pure essential oils, rolling paper, and acrylic boards.
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-colors shadow-sm"
                >
                  <Phone size={14} />
                  <span>Call +91 9336814631</span>
                </a>
              </div>
            </div>

            {/* MOVED: 35-Day Mehndi Classes & Course Details at the bottom of the classes page */}
            {render35DayCourseOverview(true)}
          </>
        )}

        {/* View all classes button for home preview */}
        {previewOnly && (
          <div className="text-center">
            <a
              href="/classes"
              onClick={(e) => {
                e.preventDefault();
                setView('classes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3.5 px-8 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Explore Complete 35-Day Classes &amp; Syllabus</span>
              <ArrowRight size={14} />
            </a>
          </div>
        )}

        {/* Contextual Internal Links for Dedicated Classes Page */}
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
              🌸 View Original Mehndi Designs in Gallery
            </a>
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                setView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              🌿 Explore Mehndi Home Services in Varanasi
            </a>
            <a
              href="/guide"
              onClick={(e) => {
                e.preventDefault();
                setView('guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-xs"
            >
              📖 Complete Varanasi Mehndi Guide &amp; Rates
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
              📞 Inquire About Next Batch Admission
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
