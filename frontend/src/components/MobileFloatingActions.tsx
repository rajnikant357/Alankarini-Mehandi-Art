import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileFloatingActionsProps {
  profile: ProfileInfo;
  currentView: string;
}

export function MobileFloatingActions({ profile, currentView }: MobileFloatingActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  useEffect(() => {
    let ticking = false;

    const checkVisibility = () => {
      ticking = false;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      // Never show on admin dashboard
      if (currentView === 'admin') {
        setIsVisible(false);
        return;
      }

      // On home screen: only appear when hero section has scrolled up
      if (currentView === 'home') {
        const heroEl = document.getElementById('hero-section');
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          // Hero is scrolled up when its bottom has moved near or above top of viewport,
          // or user has scrolled down past the hero content (rect.bottom < 180 or scrollY > 400)
          setIsVisible(rect.bottom < 180 || scrollY > 400);
        } else {
          setIsVisible(scrollY > 350);
        }
      } else {
        // On all other public screens (classes, services, gallery, about, contact, guide, blog):
        // show the floating contact buttons so users can instantly reach out
        setIsVisible(true);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkVisibility);
        ticking = true;
      }
    };

    // Evaluate visibility immediately on mount / view switch
    checkVisibility();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentView]);

  if (currentView === 'admin') {
    return null;
  }

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    'Hello Sandhya, I visited your Alankarini Mehndi Art website and want to inquire about Mehndi services/classes.'
  )}`;
  const phoneUrl = `tel:${cleanPhone}`;

  return (
    <div
      className={`fixed left-4 right-4 z-40 md:hidden flex items-center justify-between pointer-events-none transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 visible'
          : 'opacity-0 translate-y-12 invisible pointer-events-none'
      }`}
      style={{
        bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
      }}
      aria-hidden={!isVisible}
    >
      {/* Left Button: WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        tabIndex={isVisible ? 0 : -1}
        className="pointer-events-auto inline-flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl shadow-emerald-950/25 active:scale-95 transition-all border border-white/20 select-none cursor-pointer"
      >
        <WhatsAppIcon size={24} className="shrink-0 text-white" />
      </a>

      {/* Right Button: Call */}
      <a
        href={phoneUrl}
        aria-label={`Call Sandhya at ${profile.phone}`}
        tabIndex={isVisible ? 0 : -1}
        className="pointer-events-auto inline-flex items-center justify-center gap-2 h-12 px-5 bg-[#5d0e0e] hover:bg-[#7a1414] text-[#faf3df] hover:text-white rounded-full font-sans font-bold text-xs tracking-wider uppercase shadow-xl shadow-black/35 active:scale-95 transition-all border border-[#c5a059]/60 select-none cursor-pointer"
      >
        <Phone size={16} className="shrink-0 text-[#c5a059] animate-pulse" />
        <span>Call</span>
      </a>
    </div>
  );
}
