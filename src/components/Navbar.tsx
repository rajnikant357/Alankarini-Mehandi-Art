import { useState } from 'react';
import { Menu, X, Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface NavbarProps {
  profile: ProfileInfo;
  currentView: string;
  setView: (view: string) => void;
}

export function Navbar({ profile, currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Portfolio Gallery', view: 'gallery' },
    { label: 'Services', view: 'services' },
    { label: 'About Sandhya', view: 'about' },
    { label: 'Contact', view: 'contact' },
    { label: 'Admin Panel', view: 'admin' },
  ];

  const handleNavigate = (view: string) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b-[3px] border-[#c5a059]/20 shadow-md">
      {/* Golden top mini-banner */}
      <div className="bg-[#5d0e0e] text-[#faf3df] text-xs font-sans py-1.5 px-4 flex justify-between items-center tracking-wider font-light">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">✨ Premium Mehndi Artist in Varanasi</span>
          <span className="sm:hidden">✨ Sandhya Mehndi Art</span>
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${cleanPhone}`} className="flex items-center gap-1 hover:text-[#d3b575] transition-colors">
            <Phone size={12} className="inline" /> {profile.phone}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex flex-col cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <h1 className="text-2xl sm:text-2xl font-serif font-bold text-[#5d0e0e] tracking-normal">
              {profile.businessName}
            </h1>
            <p className="text-[10px] sm:text-xs font-sans uppercase font-medium tracking-[0.25em] text-[#c5a059] -mt-1">
              By {profile.artistName} • Varanasi
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 items-center">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavigate(item.view)}
                  className={`px-4 py-2 rounded-md font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-[#5d0e0e] bg-[#efe1b4]/40 border-b-2 border-[#5d0e0e]'
                      : 'text-[#2d2d2d] hover:text-[#5d0e0e] hover:bg-[#faf3df]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Direct CTA booking buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20visited%20your%20website%20Alankarini%20Mehndi%20Art%20and%20want%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <WhatsAppIcon size={14} />
              <span>WhatsApp Booking</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden p-2 rounded-full bg-[#128C7E] text-white shadow-md"
              title="Book on WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#2d2d2d] hover:text-[#5d0e0e] hover:bg-[#faf3df]/50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#faf7f2] border-t border-[#c5a059]/10 px-4 pt-2 pb-6 space-y-2 shadow-inner">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavigate(item.view)}
                  className={`w-full text-left px-4 py-3 rounded-md font-sans text-sm font-semibold tracking-wide uppercase transition-all ${
                    isActive
                      ? 'text-[#5d0e0e] bg-[#efe1b4]/60 border-l-4 border-[#5d0e0e]'
                      : 'text-[#2d2d2d] hover:text-[#5d0e0e] hover:bg-[#faf3df]/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="pt-4 border-t border-[#c5a059]/20 flex flex-col gap-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3 rounded-lg text-sm font-semibold tracking-wide uppercase shadow-sm"
            >
              <WhatsAppIcon size={16} />
              Book on WhatsApp
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="flex justify-center items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3 rounded-lg text-sm font-semibold tracking-wide uppercase shadow-sm"
            >
              <Phone size={16} />
              Call Sandhya Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
