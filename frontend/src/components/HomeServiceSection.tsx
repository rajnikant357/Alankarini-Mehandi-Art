import { 
  Home, 
  MapPin, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Phone, 
  CheckCircle2 
} from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HomeServiceSectionProps {
  profile: ProfileInfo;
  setView: (view: string) => void;
}

export function HomeServiceSection({ profile, setView }: HomeServiceSectionProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const localitiesInVaranasi = [
    'Durgakund', 'Lanka', 'Assi Ghat', 'Sigra', 'Bhelupur', 
    'Godowlia', 'Mahmoorganj', 'Cantonment (Cantt)', 'Shivpur', 
    'Sarnath', 'Pandeypur', 'Lahurabir', 'Kashi Vishwanath Area', 
    'Ramnagar', 'Chitaipur', 'Orderly Bazar'
  ];

  return (
    <section id="home-service" className="py-12 lg:py-20 bg-[#faf7f2] border-b border-[#c5a059]/15 relative overflow-hidden">
      {/* Decorative ambient blurs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#c5a059]/10 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#5d0e0e]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Info + Visual Accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Home Service Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe1b4]/50 text-[#5d0e0e] text-xs font-bold tracking-widest uppercase border border-[#c5a059]/30 font-sans">
              <Home size={15} className="text-[#c5a059]" />
              <span>Doorstep Mehndi Artist Home Service • Varanasi &amp; Banaras</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#5d0e0e] leading-tight">
              Best Mehandi Artist Home Service in Varanasi
            </h2>

            <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed">
              Skip the stress of traveling to salons during busy celebrations! Sandhya provides premium 
              <strong> mehandi artist home service</strong> right at your doorstep anywhere in Varanasi and Banaras. 
              Whether it is your royal wedding bridal mehndi, family sangeet group, baby shower, or festival celebrations like Karwa Chauth and Teej, we arrive fully equipped with fresh, 100% natural organic henna.
            </p>

            {/* Why Choose Home Service List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Zero Travel Hassle', desc: 'Relax comfortably in your home or wedding hotel suite.' },
                { title: '100% Pure Organic Henna', desc: 'Fresh triple-filtered paste mixed with nilgiri & eucalyptus oil.' },
                { title: 'Punctual & Reliable', desc: 'Guaranteed on-time arrival across all Varanasi localities.' },
                { title: 'Family & Group Packages', desc: 'Affordable group rates for bridesmaids, sisters & guests.' },
                { title: 'Custom Portrait Sketches', desc: 'Personalized Radha-Krishna, Dulha-Dulhan & names.' },
                { title: 'Safe & Hygienic Artistry', desc: 'Clean cones, sterilized application, zero harmful chemicals.' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#c5a059]/20 shadow-xs flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#5d0e0e] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-bold text-xs text-gray-800">{feature.title}</h4>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Localities Covered in Banaras */}
            <div className="pt-2">
              <h4 className="font-serif font-bold text-sm text-[#5d0e0e] flex items-center gap-1.5 mb-2">
                <MapPin size={16} className="text-[#c5a059]" />
                <span>Areas Served Near You in Varanasi / Banaras:</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {localitiesInVaranasi.map((area, i) => (
                  <span key={i} className="text-[11px] font-sans font-medium bg-[#f5efe4] text-[#5d0e0e] px-2.5 py-1 rounded-md border border-[#c5a059]/20">
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3.5 px-6 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-95"
              >
                <Phone size={16} />
                <span>Book Home Visit (+91 9336814631)</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20book%20a%20Mehndi%20Artist%20Home%20Service%20in%20Varanasi.%20Please%20share%20availability%20and%20rates.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3.5 px-6 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-95"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp Home Service Booking</span>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Trust & Proximity Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#c5a059]/30 shadow-xl relative">
              <div className="text-center pb-6 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] block mb-1">
                  ⭐ Varanasi Local SEO Verified ⭐
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#5d0e0e]">
                  Looking For a Mehandi Artist Near Me?
                </h3>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  Alankarini Mehndi Art is based in Durgakund, Varanasi, providing rapid response bookings across all surrounding ghats and neighborhoods.
                </p>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#faf7f2] rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={18} className="text-[#5d0e0e]" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 font-sans">Studio &amp; Operational Base</h4>
                      <p className="text-[11px] text-gray-500">Nawabganj, Durgakund, Varanasi</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Central Hub</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#faf7f2] rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <Clock size={18} className="text-[#c5a059]" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 font-sans">Working Hours</h4>
                      <p className="text-[11px] text-gray-500">08:00 AM - 09:00 PM (All 7 Days)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Open Daily</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#faf7f2] rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <Phone size={18} className="text-[#5d0e0e]" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-800 font-sans">Hotline Number</h4>
                      <a href={`tel:${cleanPhone}`} className="text-xs font-bold text-[#5d0e0e] underline">
                        +91 9336814631
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Instant Call</span>
                </div>
              </div>

              {/* Action Banner */}
              <div className="bg-[#5d0e0e] text-[#faf3df] p-4 rounded-2xl text-center">
                <p className="text-xs font-sans font-medium mb-2">Need a custom quote for bridal or family packages?</p>
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-block bg-[#c5a059] hover:bg-[#d8b872] text-[#5d0e0e] font-sans font-bold text-xs py-2 px-6 rounded-lg uppercase tracking-wider transition-colors shadow-sm"
                >
                  Call Artist Sandhya: +91 9336814631
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
