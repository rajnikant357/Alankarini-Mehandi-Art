import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FaqSectionProps {
  profile: ProfileInfo;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FaqSection({ profile }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const faqs: FAQItem[] = [
    {
      question: "What is the booking phone number for Sandhya Mehndi Artist in Varanasi?",
      answer: `You can reach artist Sandhya directly by calling or messaging on WhatsApp at +91 9336814631. We are available all 7 days from 08:00 AM to 09:00 PM for bridal reservations, doorstep home service visits across Varanasi/Banaras, and mehandi classes admissions.`
    },
    {
      question: "Do you offer doorstep mehndi home service in Varanasi and Banaras?",
      answer: `Yes! Alankarini Mehndi Art provides professional doorstep mehandi artist home service across all areas of Varanasi and Banaras, including Durgakund, Lanka, Assi Ghat, Sigra, Bhelupur, Godowlia, Mahmoorganj, Cantt, Shivpur, and Sarnath. We travel to your home, hotel, or wedding resort with fresh organic henna.`
    },
    {
      question: "What are the fees for online mehandi classes and offline classes?",
      answer: `Our mehandi classes run for a comprehensive duration of 35 days with the exact same 4-part syllabus for every student. Online Batches: Online Go Batch at ₹1,500 (classes only) and Online Plus Batch at ₹2,000 (includes full Henna Starter Kit & Course Completion Certificate). Offline Studio Classes in Banaras (Durgakund): Offline Go Batch at ₹3,500 (classes only) and Offline Plus Batch at ₹4,000 (includes take-home Henna Starter Kit & Course Completion Certificate). Call +91 9336814631 to enroll.`
    },
    {
      question: "What is included in the 35-day mehandi class syllabus?",
      answer: `All students receive the identical 35-day curriculum covering 4 main modules: 1) Basic Mehandi Foundation (cone rolling & paste making, Arabic shading, flowers/leaves, partition & fillup belt designs, negative filling, dark/light patches, birds/parrot/swan, startup, peacock, mandala, finger, wedding symbols & full hand designs), 2) Semi Portrait & Full Bridal (face & half body structures, eye/hand/lips/nose anatomy, full body Bride and Groom), 3) Special Mastery Session (mixology, cone flow secrets, dark stain formula, doubt solving), and 4) Instagram Handling & Growth (viral reels, hashtag timing, client DM conversions, personal branding).`
    },
    {
      question: "How do the online mehandi classes work?",
      answer: `Our online mehandi classes are held live via Zoom or Google Meet with high-definition camera close-ups. You receive personal 1-on-1 hand corrections, interactive doubt clearing, downloadable practice sheets, and lifetime access to recorded lessons. You can learn from anywhere at your own pace.`
    },
    {
      question: "Where can I attend an offline mehandi class near me in Banaras?",
      answer: `Our offline mehandi classes are conducted at our dedicated studio in Nawabganj, Jawahar Nagar Colony, Durgakund, Varanasi (Banaras), UP 221005. Studio batches offer direct hands-on training, physical pressure control, acrylic board practice, and live bridal model sessions.`
    },
    {
      question: "Is your henna paste 100% natural and safe for sensitive skin?",
      answer: `Absolutely. Sandhya uses triple-filtered pure organic Lawsonia inermis henna powder blended with premium natural eucalyptus, tea tree, and nilgiri essential oils. There are zero synthetic dyes, zero PPD, and zero chemicals. It yields an authentic, long-lasting rich dark maroon-black stain.`
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 lg:py-20 bg-white border-b border-[#c5a059]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe1b4]/50 text-[#5d0e0e] text-xs font-bold tracking-widest uppercase mb-3 border border-[#c5a059]/30 font-sans">
            <HelpCircle size={15} className="text-[#c5a059]" />
            <span>Frequently Asked Questions &amp; Search Queries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5d0e0e]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600 font-sans text-xs sm:text-sm">
            Everything you need to know about our mehandi classes, class fees, doorstep home service in Varanasi, and booking hotline.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-[#c5a059]/25 rounded-2xl overflow-hidden bg-[#faf7f2]/60 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-[#5d0e0e]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[#c5a059] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-gray-700 font-sans text-xs sm:text-sm leading-relaxed border-t border-[#c5a059]/10 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Contact Callout */}
        <div className="mt-10 p-5 bg-[#f5efe4] rounded-2xl border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif font-bold text-sm text-[#5d0e0e]">Have more questions?</h4>
            <p className="text-xs text-gray-600 font-sans mt-0.5">Call or WhatsApp Sandhya directly for instant guidance and batch dates.</p>
          </div>
          <div className="flex gap-2.5">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1.5 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Phone size={13} />
              <span>Call: +91 9336814631</span>
            </a>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20have%20a%20question%20regarding%20Mehndi%20services/classes.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <WhatsAppIcon size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
