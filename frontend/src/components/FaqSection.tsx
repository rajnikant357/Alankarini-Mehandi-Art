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
      question: "Who is the best mehendi artist in Varanasi for bridal mehndi design services?",
      answer: `Sandhya Chauhan at Alankarini Mehandi Art is recognized as the best mehendi artist in Varanasi. With 3+ years of bridal specialization, we offer royal bridal mehndi design services, traditional bridal mehendi, customized wedding mehendi with bride and groom portrait sketches, Arabic bridal mehendi, and 100% pure organic mehendi cones for dark maroon stains. Call or WhatsApp +91 9336814631 to schedule your consultation.`
    },
    {
      question: "Do you offer doorstep service for wedding mehendi service in Varanasi and Banaras?",
      answer: `Yes! Alankarini Mehndi Art provides reliable doorstep service across all areas of Varanasi and Banaras, including Durgakund, Lanka, Assi Ghat, Sigra, Bhelupur, Godowlia, Mahmoorganj, Cantt, Shivpur, and Sarnath. Our doorstep wedding mehendi service covers bride mehendi, groom mehendi, family mehendi service, guest mehendi service, engagement mehendi, sangeet mehendi, and haldi function mehendi.`
    },
    {
      question: "What design styles do your mehndi design services cover in Varanasi?",
      answer: `We provide a comprehensive array of styles: Arabic mehndi design services, Indian mehndi design services, Indo - Arabic mehndi design services, Indo-Arabic mehendi, Indo Western mehandi, Moroccan mehandi, Pakistani mehandi design, Western mehandi, traditional designs, baby showermehendi, and customized wedding mehendi tailored to your bridal attire.`
    },
    {
      question: "Are you available as a teej mehndi artist in Varanasi and for festivals?",
      answer: `Yes, Sandhya is Varanasi's premier teej mehndi artist in Varanasi for Hariyali Teej, Hartalika Teej, Karwa Chauth, Diwali, Raksha Bandhan, and Eid. We provide fast, graceful occasionally and festival mehendi designs with home visits and studio slots.`
    },
    {
      question: "What are the fees for mehendi classes from beginner to advanced in Varanasi?",
      answer: `Our mehandi classes run for a comprehensive duration of 35 days with an identical 4-module syllabus. Online Mehendi Classes: Online Go Batch at ₹1,500 (classes only) and Online Plus Batch at ₹2,000 (includes full Henna Starter Kit & Course Completion Certificate). Offline Studio Classes in Banaras (Durgakund): Offline Go Batch at ₹3,500 (classes only) and Offline Plus Batch at ₹4,000 (includes take-home Henna Starter Kit & Course Completion Certificate). Call +91 9336814631 to enroll.`
    },
    {
      question: "Do you make and provide 100% organic mehendi cones?",
      answer: `Yes! Every mehendi cone is hand-rolled fresh in our Durgakund studio using certified triple-filtered organic Sojat henna powder, distilled water, sugar, and natural essential oils (eucalyptus, cajeput, and tea tree). There are zero chemical dyes, zero PPD, and zero toxic preservatives, guaranteeing skin-friendly application and a deep, long-lasting maroon stain.`
    },
    {
      question: "Can you coordinate timing with my bridal make-up artist for special occasion makeup?",
      answer: `Certainly! We regularly coordinate wedding timelines alongside brides' chosen make-up artist and hairstylist. We ensure your bridal henna application finishes with adequate drying time before your special occasion makeup and lehenga dressing sessions begin.`
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
            <HelpCircle size={15} className="text-[#875914]" />
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
                    className={`text-[#875914] shrink-0 transition-transform duration-300 ${
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
            <h3 className="font-serif font-bold text-sm text-[#5d0e0e]">Have more questions?</h3>
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
              className="inline-flex items-center gap-1.5 bg-[#0d695e] hover:bg-[#075E54] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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
