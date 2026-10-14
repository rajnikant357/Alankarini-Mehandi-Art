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
              <span>Doorstep Service • Wedding Mehendi Service in Varanasi &amp; Banaras</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#5d0e0e] leading-tight">
              Best Mehandi Artist &amp; Doorstep Service in Varanasi
            </h2>

            <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed">
              Skip the stress of traveling to salons during busy wedding celebrations! Sandhya provides the finest 
              <strong> mehandi artist in Varanasi</strong> with premium <strong>doorstep service</strong> right at your hotel, banquet, or home across Varanasi and Banaras. 
              Our comprehensive <strong>wedding service</strong> covers <strong>bridal mehndi design services</strong>, <strong>Arabic mehndi design services</strong>, <strong>traditional bridal mehendi</strong>, <strong>bride mehendi</strong>, <strong>groom mehendi</strong>, <strong>family mehendi service</strong>, <strong>guest mehendi service</strong>, <strong>engagement mehendi</strong>, <strong>sangeet mehendi</strong>, <strong>haldi function mehendi</strong>, and <strong>baby showermehendi</strong>. We also serve as your top-choice <strong>teej mehndi artist in Varanasi</strong> for <strong>occasionally and festival mehendi</strong> using 100% pure organic <strong>mehendi cones</strong>.
            </p>

            {/* Why Choose Home Service List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Doorstep Wedding Service', desc: 'Doorstep service directly to your hotel suite, home, or wedding mandap in Varanasi.' },
                { title: '100% Organic Mehendi Cones', desc: 'Fresh triple-filtered henna cones with eucalyptus and tea tree oil for dark maroon stains.' },
                { title: 'Bride & Groom Mehendi', desc: 'Customized wedding mehendi portraits, bride-groom varmala sketches, and royal motifs.' },
                { title: 'Family & Guest Mehendi Service', desc: 'Fast, graceful designs for sangeet groups, haldi ceremonies, sisters, and guests.' },
                { title: 'Teej & Festival Mehendi', desc: 'Specialist teej mehndi artist in Varanasi for Karwa Chauth, Teej, Eid, and festive rituals.' },
                { title: 'Makeup Artist Coordination', desc: 'Seamless scheduling alongside your make-up artist for special occasion makeup & styling.' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#c5a059]/20 shadow-xs flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#5d0e0e] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-sans font-bold text-xs text-gray-800">{feature.title}</h3>
                    <p className="text-[11px] text-gray-500 font-sans mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Localities Covered in Banaras */}
            <div className="pt-2">
              <h3 className="font-serif font-bold text-sm text-[#5d0e0e] flex items-center gap-1.5 mb-2">
                <MapPin size={16} className="text-[#c5a059]" />
                <span>Areas Served Near You in Varanasi / Banaras:</span>
              </h3>
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
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                    (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'contact_call_click', location: 'home_service' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3.5 px-6 rounded-xl font-sans font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-95"
              >
                <Phone size={16} />
                <span>Book Home Visit (+91 9336814631)</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20book%20a%20Mehndi%20Artist%20Home%20Service%20in%20Varanasi.%20Please%20share%20availability%20and%20rates.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: object[] }).dataLayer) {
                    (window as unknown as { dataLayer: object[] }).dataLayer.push({ event: 'contact_whatsapp_click', location: 'home_service' });
                  }
                }}
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
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#875914] block mb-1">
                  ⭐ Locally Verified Service in Varanasi ⭐
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
