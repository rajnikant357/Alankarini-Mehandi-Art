import { useState, useEffect } from 'react';
import { Phone, MapPin, Calendar, Award, Heart, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  profile: ProfileInfo;
  setView: (view: string) => void;
}

export function Hero({ profile, setView }: HeroProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const mobileHeroSlides = [
    { src: '/images/gallery/gallery-1.webp', alt: 'Royal Indian Bridal Mehndi Art' },
    { src: '/images/gallery/gallery-4.webp', alt: 'Radha Krishna Custom Portrait Mehndi' },
    { src: '/images/gallery/gallery-3.webp', alt: 'Bride & Groom Portrait Hand Mehndi' },
    { src: '/images/gallery/gallery-5.webp', alt: 'Contemporary Arabic Floral Mehndi' },
    { src: '/images/gallery/gallery-2.webp', alt: 'Intricate Palm Henna Design' }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % mobileHeroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [mobileHeroSlides.length]);

  const marqueeItems = [
    {
      label: 'Hotline: +91 9336814631',
      icon: <Phone size={13} className="text-[#c5a059] animate-pulse" />,
      isLink: true,
      href: `tel:${cleanPhone}`
    },
    {
      label: '✨ Bridal Mehndi Design Services',
      isLink: false
    },
    {
      label: '🌿 Arabic Mehndi Design Services',
      isLink: false
    },
    {
      label: '🌸 Indo-Arabic Mehendi',
      isLink: false
    },
    {
      label: '👑 Customized Wedding Mehendi',
      isLink: false
    },
    {
      label: '🎉 Teej Mehndi Artist in Varanasi',
      isLink: false
    },
    {
      label: '🎓 Beginner to Advanced Classes',
      isLink: false
    },
    {
      label: '🎓 Mehandi Classes & Fees',
      isLink: true,
      href: '/classes',
      view: 'classes'
    },
    {
      label: '🌸 Browse Portfolio',
      isLink: true,
      href: '/gallery',
      view: 'gallery'
    },
    {
      label: '🌿 Mehndi Home Services',
      isLink: true,
      href: '/services',
      view: 'services'
    }
  ];

  return (
    <>
      <section id="hero-section" className="relative bg-[#faf7f2] py-12 lg:py-20 overflow-hidden">
        {/* Mobile Background Slideshow (Only for Mobile Views, 95% Visibility) */}
        <div className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {mobileHeroSlides.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={640}
              height={960}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? 'opacity-95' : 'opacity-0'
              }`}
            />
          ))}
          {/* Subtle light overlay to blend edges while letting 95% photo vibrancy shine through */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/35 via-transparent to-[#faf7f2]/45"></div>
        </div>

        {/* Decorative background vectors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059] rounded-full filter blur-[120px] opacity-10 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5d0e0e] rounded-full filter blur-[120px] opacity-[0.06] -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Content Area */}
            <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
              {/* Elegant upper subheader */}
              <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-[#efe1b4]/50 text-[#5d0e0e] text-xs font-bold tracking-wider uppercase mb-5 border border-[#c5a059]/30">
                <Award size={14} className="text-[#c5a059]" />
                <span>Best Mehendi Artist in Varanasi &amp; Banaras • Doorstep Service • {profile.experience} Excellence</span>
              </div>

              {/* Main Tagline Heading optimized for Google Rank */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-[#5d0e0e] leading-tight tracking-tight [paint-order:stroke_fill] [-webkit-text-stroke:1px_#faf5ec] lg:[-webkit-text-stroke:0px] [text-shadow:-1px_-1px_0_#faf5ec,1px_-1px_0_#faf5ec,-1px_1px_0_#faf5ec,1px_1px_0_#faf5ec] lg:[text-shadow:none]">
                Best <span className="text-[#875914] italic font-normal [paint-order:stroke_fill] [-webkit-text-stroke:1px_#faf5ec] lg:[-webkit-text-stroke:0px]">Mehendi Artist</span> in Varanasi
              </h1>

              {/* 2 Enhanced Feature Cards: Mehendi Services & Mehendi Classes */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
                {/* Card 1: Mehendi Services */}
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative flex flex-col justify-between bg-gradient-to-br from-white via-[#faf6ef] to-[#f4ebe0] hover:from-white hover:to-[#ede1cb] p-4 sm:p-5 rounded-2xl border border-[#c5a059]/35 hover:border-[#875914] shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-left cursor-pointer overflow-hidden"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#c5a059]/15 rounded-full blur-xl group-hover:bg-[#c5a059]/25 transition-all pointer-events-none"></div>

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#5d0e0e]/10 text-[#5d0e0e] flex items-center justify-center group-hover:bg-[#5d0e0e] group-hover:text-[#faf3df] transition-colors shrink-0 shadow-xs">
                          <Sparkles size={18} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#875914]">
                            Doorstep &amp; Studio
                          </span>
                          <h2 className="font-serif font-bold text-base sm:text-lg text-[#5d0e0e] leading-snug group-hover:text-[#875914] transition-colors m-0">
                            Mehendi Services
                          </h2>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#5d0e0e]/10 text-[#5d0e0e] border border-[#5d0e0e]/20 shrink-0">
                        Popular
                      </span>
                    </div>

                    {/* Popular Services Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 my-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#5d0e0e] text-xs font-medium border border-[#c5a059]/30 shadow-2xs group-hover:border-[#c5a059] transition-colors">
                        <Heart size={11} className="text-[#875914] fill-[#875914]/25 shrink-0" />
                        Bridal
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#5d0e0e] text-xs font-medium border border-[#c5a059]/30 shadow-2xs group-hover:border-[#c5a059] transition-colors">
                        <Sparkles size={11} className="text-[#875914] shrink-0" />
                        Arabic
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#5d0e0e] text-xs font-medium border border-[#c5a059]/30 shadow-2xs group-hover:border-[#c5a059] transition-colors">
                        <span className="text-[#875914] text-[10px]">🎉</span>
                        Festivals
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-2.5 pt-2 border-t border-[#c5a059]/25 flex items-center justify-between text-xs font-bold text-[#5d0e0e] group-hover:text-[#875914] transition-colors">
                    <span className="text-[11px] text-[#705634] font-medium">100% Organic Henna</span>
                    <span className="inline-flex items-center gap-1 text-[#5d0e0e] group-hover:text-[#875914]">
                      <span>Explore Services</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>

                {/* Card 2: Mehendi Classes */}
                <a
                  href="/classes"
                  onClick={(e) => {
                    e.preventDefault();
                    setView('classes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative flex flex-col justify-between bg-gradient-to-br from-white via-[#faf6ef] to-[#f4ebe0] hover:from-white hover:to-[#ede1cb] p-4 sm:p-5 rounded-2xl border border-[#c5a059]/35 hover:border-[#875914] shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-left cursor-pointer overflow-hidden"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#0d695e]/10 rounded-full blur-xl group-hover:bg-[#0d695e]/20 transition-all pointer-events-none"></div>

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#5d0e0e]/10 text-[#5d0e0e] flex items-center justify-center group-hover:bg-[#5d0e0e] group-hover:text-[#faf3df] transition-colors shrink-0 shadow-xs">
                          <GraduationCap size={19} className="group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#875914]">
                            Academy &amp; Batches
                          </span>
                          <h2 className="font-serif font-bold text-base sm:text-lg text-[#5d0e0e] leading-snug group-hover:text-[#875914] transition-colors m-0">
                            Mehendi Classes
                          </h2>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0d695e]/10 text-[#0d695e] border border-[#0d695e]/25 shrink-0">
                        Certified
                      </span>
                    </div>

                    {/* Classes Batches & Course Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 my-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#5d0e0e] text-xs font-medium border border-[#c5a059]/30 shadow-2xs group-hover:border-[#c5a059] transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d695e]"></span>
                        Online
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#5d0e0e] text-xs font-medium border border-[#c5a059]/30 shadow-2xs group-hover:border-[#c5a059] transition-colors">
                        <MapPin size={11} className="text-[#875914] shrink-0" />
                        Offline
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 text-[#5d0e0e] text-xs font-medium border border-[#c5a059]/30 shadow-2xs group-hover:border-[#c5a059] transition-colors">
                        <Award size={11} className="text-[#875914] shrink-0" />
                        Basic to Bridal Course
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-2.5 pt-2 border-t border-[#c5a059]/25 flex items-center justify-between text-xs font-bold text-[#5d0e0e] group-hover:text-[#875914] transition-colors">
                    <span className="text-[11px] text-[#705634] font-medium">From <span className="font-price font-bold">₹1,500</span> • 35 Days</span>
                    <span className="inline-flex items-center gap-1 text-[#5d0e0e] group-hover:text-[#875914]">
                      <span>View Courses</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              </div>

              {/* Quick Location & Trust Details */}
              <div className="mt-5 flex flex-wrap gap-2.5 items-center justify-center lg:justify-start text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-1.5 bg-[#f5efe4] border border-[#c5a059]/30 py-1.5 px-3 rounded-lg">
                  <MapPin size={15} className="text-[#5d0e0e]" />
                  <span>Studio: Durgakund, Varanasi</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#f5efe4] border border-[#c5a059]/30 py-1.5 px-3 rounded-lg">
                  <Calendar size={15} className="text-[#c5a059]" />
                  <span>Doorstep Service across Banaras</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                <a
                  href={`tel:${cleanPhone}`}
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                      (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'contact_call_click', location: 'hero' });
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border border-[#c5a059]/40"
                >
                  <Phone size={16} />
                  Call +91 9336814631
                </a>

                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20visited%20Alankarini%20website%20and%20want%20to%20inquire%20about%20Mehndi%20services/classes.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                      (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'contact_whatsapp_click', location: 'hero' });
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-[#0d695e] hover:bg-[#075E54] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp Us
                </a>
              </div>
            </div>

          {/* Graphical Frame Area (Cover Photo - Desktop Only, Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-center">
            {/* Framing borders */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#c5a059]/30 rounded-2xl transform translate-x-2 translate-y-2 pointer-events-none"></div>
            
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-md rounded-2xl overflow-hidden border-[6px] border-[#f5efe4] shadow-2xl">
              {/* Actual photo with responsive modern WebP sources and explicit dimensions */}
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet="/images/cover-mobile.webp" type="image/webp" />
                <source media="(min-width: 641px)" srcSet="/images/cover.webp" type="image/webp" />
                <img
                  src={profile.coverPhoto}
                  alt="Best Mehendi Artist in Varanasi - Sandhya Bridal Mehndi Specialist"
                  width={448}
                  height={560}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover select-none object-center hover:scale-105 transition-transform duration-750"
                  referrerPolicy="no-referrer"
                />
              </picture>
              
              {/* Hover watermark / accent overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5d0e0e]/80 via-transparent to-transparent hidden sm:flex flex-col justify-end p-6 pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-[#faf3df]/80 font-medium font-sans">Varanasi's Authentic</span>
                <span className="text-[#faf3df] font-serif text-lg font-bold sm:text-xl">Alankarini Traditional Henna</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Marquee Banner Under Hero Section */}
    <div className="relative bg-[#5d0e0e] text-[#faf3df] py-3.5 border-y border-[#c5a059]/40 overflow-hidden shadow-inner select-none">
      {/* Subtle Edge Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#5d0e0e] to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#5d0e0e] to-transparent z-10"></div>

      <div className="animate-marquee flex items-center gap-5 sm:gap-7 whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-5 sm:gap-7 shrink-0">
            {item.isLink ? (
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.view) {
                    e.preventDefault();
                    setView(item.view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf3df]/15 hover:bg-[#c5a059] hover:text-[#5d0e0e] text-[#faf3df] text-xs font-semibold tracking-wider transition-colors border border-[#c5a059]/30 cursor-pointer shadow-xs"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-[#faf3df] text-xs font-semibold tracking-wider border border-[#c5a059]/20">
                <span>{item.label}</span>
              </span>
            )}
            <span className="text-[#c5a059] text-xs opacity-70">✦</span>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
