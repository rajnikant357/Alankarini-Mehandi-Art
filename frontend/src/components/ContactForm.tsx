import React, { useState } from 'react';
import { Phone, MessageSquare, Instagram, MapPin, CheckCircle, Calendar, Send, Clock } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactFormProps {
  profile: ProfileInfo;
}

export function ContactForm({ profile }: ContactFormProps) {
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [serviceType, setServiceType] = useState('Bridal Mehndi');
  const [guestCount, setGuestCount] = useState('1 (Just Me)');
  const [customMessage, setCustomMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const handleGenerateWhatsAppLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) {
      alert("Please specify your name.");
      return;
    }

    // Build booking draft message
    const constructedText = `Hello Sandhya,
My Name is *${clientName}*. I am looking to book a Mehndi Artist.

✨ *Booking Details* ✨
• *Service Category:* ${serviceType}
• *Target Event Date:* ${eventDate || 'To be decided'}
• *Venue/Location:* ${eventLocation || 'Varanasi'}
• *Number of Persons:* ${guestCount}

📝 *Special Notes:* ${customMessage || 'None'}

I look forward to discussing your available packages! Sent from Alankarini website.`;

    const encodedText = encodeURIComponent(constructedText);
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodedText}`;

    // Open WhatsApp link
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#c5a059] font-sans">
            ✨ Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e] mt-2">
            Book Sandhya For Your Special Day
          </h2>
          <p className="mt-4 text-gray-650 text-sm sm:text-base font-sans">
            Ready to book? Fill out our quick appointment planner to instantly draft a fully formatted booking proposal directly to Sandhya on WhatsApp! Or click below to call immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Map (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Quick Contact Info Card */}
            <div className="bg-[#f5efe4] rounded-2xl p-6 md:p-8 border border-[#c5a059]/15 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[#5d0e0e] mb-6 flex items-center gap-2">
                <span>Alankarini Mehndi Art</span>
              </h3>

              <div className="space-y-6">
                
                {/* Artist Name Row */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#5d0e0e] text-[#faf3df] rounded-xl shadow-inner shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">Artist Head</h4>
                    <p className="text-[#5d0e0e] font-sans font-semibold text-lg">{profile.artistName}</p>
                    <p className="text-xs text-gray-600 mt-0.5">3+ Years Certified Professional Experience</p>
                  </div>
                </div>

                {/* Mobile/Call Row */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#5d0e0e] text-[#faf3df] rounded-xl shadow-inner shrink-0 animate-pulse">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">Direct Hotline</h4>
                    <a href={`tel:${cleanPhone}`} className="text-[#5d0e0e] font-sans font-semibold text-base sm:text-lg hover:underline block">
                      {profile.phone}
                    </a>
                    <p className="text-xs text-gray-600 mt-0.5">Available for calls (08:00 AM - 09:00 PM)</p>
                  </div>
                </div>

                {/* WhatsApp Chat Row */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#128C7E] text-white rounded-xl shadow-inner shrink-0 text-white flex items-center justify-center">
                    <WhatsAppIcon size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">WhatsApp Status</h4>
                    <a 
                      href={`https://wa.me/${cleanWhatsapp}?text=Hi%20Sandhya,%20I%20am%20calling%20from%20your%20website.`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#128C7E] font-sans font-semibold text-base sm:text-lg hover:underline block"
                    >
                      {profile.phone}
                    </a>
                    <p className="text-xs text-gray-600 mt-0.5">Instant chats, quote details & design sharing</p>
                  </div>
                </div>

                {/* Instagram Username Row */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-xl shadow-inner shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">Instagram Handle</h4>
                    <a 
                      href={profile.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-purple-700 font-sans font-semibold text-base sm:text-lg hover:underline block"
                    >
                      {profile.instagram}
                    </a>
                    <p className="text-xs text-gray-600 mt-0.5">Follow for daily patterns, reels & video loops</p>
                  </div>
                </div>

                {/* Studio Location Varanasi Row */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#5d0e0e] text-[#faf3df] rounded-xl shadow-inner shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase text-gray-500 tracking-wider">Studio Base</h4>
                    <p className="text-[#5d0e0e] font-sans font-semibold text-base">{profile.location}</p>
                    <p className="text-xs text-gray-650 mt-0.5">Varanasi, Uttar Pradesh, India - Available for local & outstation travel packages</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Maps Card */}
            <div className="rounded-2xl overflow-hidden border-2 border-[#c5a059]/15 shadow-sm h-64 relative bg-gray-100">
              <iframe
                title="Google Maps Location Alankarini Mehndi Art Varanasi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.01168532454!2d82.90870635485458!3d25.31756534571933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76c34db8b%3A0x39f6df626c2bc94a!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1718800000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* WhatsApp Direct Proposal Planner Form (Right Column) */}
          <div className="lg:col-span-7 bg-[#f5efe4]/50 rounded-3xl p-6 md:p-8 border border-[#c5a059]/15 shadow-md">
            <h3 className="font-serif text-2xl font-bold text-[#5d0e0e] mb-2 flex items-center gap-2">
              <Calendar className="text-[#c5a059]" size={22} />
              Appointment Proposal Maker
            </h3>
            <p className="text-gray-650 text-xs sm:text-sm font-sans mb-6">
              Complete this basic planner to generate a ready-to-sign booking draft on WhatsApp. You'll discuss dates and lock in your price quote in the chat.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-start gap-2 text-xs sm:text-sm font-sans">
                <CheckCircle size={20} className="text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Redirected to WhatsApp!</h4>
                  <p className="mt-0.5">We have opened chat with Sandhya with your prepared booking draft. If it didn't open, please click "WhatsApp Sandhya Now" in the buttons above.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleGenerateWhatsAppLink} className="space-y-4">
              
              {/* Row 1: Name and Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-bold text-gray-770 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
                <div>
                  <label htmlFor="event-date" className="block text-xs font-bold text-gray-770 uppercase tracking-wider mb-1">Target Event Date</label>
                  <input
                    id="event-date"
                    type="date"
                    placeholder="Select Date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                  />
                </div>
              </div>

              {/* Row 2: Location/Address and Service Theme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-venue" className="block text-xs font-bold text-gray-770 uppercase tracking-wider mb-1">Event Venue / Location</label>
                  <input
                    id="event-venue"
                    type="text"
                    placeholder="e.g. Assi Ghat, Varanasi / Hotel"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-400 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label htmlFor="service-select" className="block text-xs font-bold text-gray-770 uppercase tracking-wider mb-1">Select Service Theme</label>
                  <select
                    id="service-select"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800 font-medium"
                  >
                    <option value="Bridal Specialist Mehndi">Bridal Specialist Mehndi</option>
                    <option value="Bride & Groom Portrait Designs">Bride & Groom Portrait Designs</option>
                    <option value="Arabic Elegant Trails">Arabic Elegant Trails</option>
                    <option value="Indo-Arabic Fusion">Indo-Arabic Fusion</option>
                    <option value="Engagement Ceremony Layout">Engagement Ceremony Layout</option>
                    <option value="Festive Mehndi Pack (Teej/Karwa)">Festive Mehndi Pack (Teej/Karwa)</option>
                    <option value="Bespoke Customized Mehndi">Bespoke Customized Mehndi</option>
                  </select>
                </div>
              </div>

              {/* Guest count */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Number of People Requiring Mehndi</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['1 (Just Me)', '2-5 Friends', '5-10 Guests', '10+ Group'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGuestCount(opt)}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        guestCount === opt
                          ? 'border-[#5d0e0e] bg-[#5d0e0e]/10 text-[#5d0e0e]'
                          : 'border-gray-200 bg-white text-gray-650 hover:bg-gray-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes / Slogans */}
              <div>
                <label htmlFor="custom-notes" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Notes, Slogans or Special Requests</label>
                <textarea
                  id="custom-notes"
                  rows={3}
                  placeholder="Need portrait sketches of Radha-Krishna, deep stain tips, custom hobbies, or particular length requirements."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5d0e0e] focus:border-[#5d0e0e] text-sm bg-white font-sans text-gray-800"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-4 px-6 rounded-xl font-sans font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <WhatsAppIcon size={16} />
                <span>Submit on WhatsApp Chat</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
