import { Phone, MessageSquare, MapPin, Calendar, Award } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  profile: ProfileInfo;
  setView: (view: string) => void;
}

export function Hero({ profile, setView }: HeroProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  return (
    <section className="relative bg-[#faf7f2] py-12 lg:py-20 overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059] rounded-full filter blur-[120px] opacity-10 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5d0e0e] rounded-full filter blur-[120px] opacity-[0.06] -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Elegant upper subheader */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-[#efe1b4]/40 text-[#5d0e0e] text-xs font-semibold tracking-wider uppercase mb-6 border border-[#c5a059]/30">
              <Award size={14} className="text-[#c5a059]" />
              <span>Certified Professional Mehndi Expert • {profile.experience} Experience</span>
            </div>

            {/* Main Tagline Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-[#5d0e0e] leading-tight tracking-tight">
              Turning Your Special <br />
              <span className="text-[#c5a059] italic font-normal">Moments</span> Into <br />
              Timeless <span className="underline decoration-[#c5a059] decoration-[3px] underline-offset-[6px]">Mehndi Art</span>
            </h1>

            {/* Quick Location & Trust Details */}
            <div className="mt-6 flex flex-wrap gap-4 items-center justify-center lg:justify-start text-xs sm:text-sm text-gray-650 font-medium">
              <div className="flex items-center gap-1.5 bg-[#f5efe4] border border-gray-200/50 py-1.5 px-3 rounded-md">
                <MapPin size={16} className="text-[#5d0e0e]" />
                <span>Serving Varanasi & Surrounding Regions</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f5efe4] border border-gray-200/50 py-1.5 px-3 rounded-md">
                <Calendar size={16} className="text-[#c5a059]" />
                <span>Avails Custom Home & Venue Visits</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20discuss%20Mehndi%20designs%20for%20my%20upcoming%20event.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-[#faf7f2] px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border border-[#c5a059]/40"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>

            {/* Alternate quick buttons */}
            <div className="mt-6 flex gap-6 justify-center lg:justify-start text-xs font-semibold uppercase tracking-wider text-[#5d0e0e] border-t border-gray-200/40 pt-6">
              <button 
                onClick={() => setView('gallery')}
                className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                🌸 Browse Portfolio
              </button>
              <button 
                onClick={() => setView('services')}
                className="hover:text-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                🌿 Browse Services Info
              </button>
            </div>
          </div>

          {/* Graphical Frame Area (Cover Photo) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Framing borders */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#c5a059]/30 rounded-2xl transform translate-x-2 translate-y-2 pointer-events-none"></div>
            
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-md rounded-2xl overflow-hidden border-[6px] border-[#f5efe4] shadow-2xl">
              {/* Actual photo */}
              <img
                src={profile.coverPhoto}
                alt={`${profile.businessName} Portfolio Cover`}
                className="w-full h-full object-cover select-none object-center hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Hover watermark / accent overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5d0e0e]/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-widest text-[#faf3df]/80 font-medium font-sans">Varanasi's Authentic</span>
                <span className="text-[#faf3df] font-serif text-lg font-bold sm:text-xl">Alankarini Traditional Henna</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
