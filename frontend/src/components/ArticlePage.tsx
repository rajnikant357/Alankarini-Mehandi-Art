import { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  ShieldCheck, 
  Palette, 
  DollarSign, 
  Package,
  Layers,
  GraduationCap
} from 'lucide-react';
import { ProfileInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ArticlePageProps {
  profile: ProfileInfo;
  setView: (view: string) => void;
}

export function ArticlePage({ profile, setView }: ArticlePageProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const tableOfContents = [
    { id: 'artist-near-me', title: '1. Finding a Top Mehndi Artist Near You in Varanasi' },
    { id: 'home-service', title: '2. Doorstep Mehndi Home Service & Online Booking' },
    { id: 'price-charges', title: '3. Transparent Price Guide: Mehndi Charges & Rates' },
    { id: 'classes-academy', title: '4. 35-Day Mehndi Classes, Academy & Course Fees' },
    { id: 'tools-stencils', title: '5. Practice Essentials: Acrylic Hands & Stencils vs Freehand' },
    { id: 'design-trends', title: '6. Trending Styles: Arabic (Aerobic), Katseye & Tattoos' },
    { id: 'studio-location', title: '7. Varanasi Studio Location & Booking Helpline' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const articleFaqs = [
    {
      q: 'How do I find a reliable female mehndi artist near me in Varanasi with reasonable prices?',
      a: 'Look for certified artists with verified bridal client portfolios and 100% organic, chemical-free henna formulas. Alankarini Mehndi Art by artist Sandhya in Durgakund, Varanasi offers doorstep home visits starting at transparent rates, with bridal packages from ₹5,100 and guest hands from ₹250. Call/WhatsApp +91 9336814631 for free consultation.'
    },
    {
      q: 'What are the charges for mehndi home service near me in Banaras?',
      a: 'Doorstep mehndi home service across Varanasi (Durgakund, Lanka, Assi Ghat, Sigra, Bhelupur, Godowlia, Cantt, Sarnath) includes customized bridal, semi-bridal, and family packages with zero hidden traveling surcharges within city limits. You can reserve directly via online mehndi booking.'
    },
    {
      q: 'What is the fee and duration for mehndi classes near me?',
      a: 'Alankarini Mehandi Academy offers a 35-day comprehensive course with an identical 4-module syllabus. Online Batches: Online Go Batch at ₹1,500 (classes only) and Online Plus Batch at ₹2,000 (includes Henna Starter Kit delivered + Completion Certificate). Offline Studio Classes in Durgakund, Banaras: Offline Go Batch at ₹3,500 (classes only) and Offline Plus Batch at ₹4,000 (includes take-home kit + physical certificate).'
    },
    {
      q: 'What are aerobic mehndi designs and Katseye mehndi designs?',
      a: '"Aerobic mehndi design" is a common search term used by people looking for bold, flowing Arabic mehndi designs featuring floral shaded petals, negative filling, and botanical vines. "Katseye mehndi design" is a trending contemporary fusion aesthetic featuring delicate palm accents and minimalist finger motifs inspired by modern global fashion.'
    },
    {
      q: 'Should I buy mehndi stencils or learn on an acrylic hand for practice?',
      a: 'While mehndi stencil stickers are convenient for temporary fun, professional wedding artists train using a washable acrylic hand for mehndi practice and specialized practice books. This builds fine cone pressure control, line uniformity, and symmetrical freehand drawing.'
    }
  ];

  return (
    <article className="bg-[#faf7f2] min-h-screen py-8 lg:py-16 text-[#2d2d2d] font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Article Hero Header */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe1b4]/50 text-[#5d0e0e] text-xs font-bold tracking-widest uppercase mb-4 border border-[#c5a059]/30">
            <BookOpen size={14} className="text-[#c5a059]" />
            <span>Complete Mehndi Guide • Varanasi &amp; Online</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#5d0e0e] leading-tight mb-4">
            The Complete Varanasi Mehndi Guide: Top Artists, Home Service, Course Fees &amp; Design Directory
          </h1>

          <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 font-sans">
            Whether you are searching for a certified <strong>mehndi artist near me</strong> in Banaras, booking doorstep 
            <strong> mehendi home service near me</strong>, comparing <strong>mehndi artist charges with price</strong>, or looking for 
            the most reputable <strong>mehndi classes near me with fees</strong>, this complete handbook covers everything you need to know.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5d0e0e] text-[#faf3df] flex items-center justify-center font-serif font-bold text-sm">
                S
              </div>
              <div>
                <p className="font-bold text-[#5d0e0e]">By Artist Sandhya</p>
                <p className="text-[11px] text-gray-500">Lead Artist at Alankarini Mehndi Art • Varanasi</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[#c5a059]" /> 8 Min Read
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#c5a059]" /> Updated September 2026
              </span>
              <span className="bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Guide
              </span>
            </div>
          </div>
        </header>

        {/* Table of Contents Box */}
        <div className="bg-[#f5efe4] border border-[#c5a059]/40 rounded-3xl p-6 mb-12 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-[#5d0e0e] mb-3 flex items-center gap-2">
            <Layers size={18} className="text-[#c5a059]" />
            <span>Table of Contents: In This Comprehensive Guide</span>
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            Click any section below to jump directly to detailed answers, pricing tables, and syllabus breakdowns:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-[#5d0e0e]">
            {tableOfContents.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-2 px-3 rounded-xl bg-white/70 hover:bg-white hover:text-[#c5a059] transition-all flex items-center justify-between border border-[#c5a059]/20 cursor-pointer"
              >
                <span>{item.title}</span>
                <ChevronRight size={13} className="shrink-0 text-[#c5a059]" />
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 1: Finding a Mehndi Artist Near Me in Varanasi */}
        <section id="artist-near-me" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <Sparkles size={14} />
            <span>Section 1 • Local Artist Selection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Finding the Best Mehndi Artist in Varanasi &amp; Near You
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              When a wedding, teej, karwa chauth, or auspicious ceremony approaches, one of the most common searches on Google is 
              <strong> "mehndi artist near me"</strong>, <strong>"mehendi artist near me"</strong>, or <strong>"mehandi artist in varanasi"</strong>. 
              While you might spot temporary artists sitting in shopping centers or casual <strong>mehendi artists in mall near me</strong>, 
              intricate bridal ceremonies demand the proven artistry of a seasoned, dedicated <strong>female mehndi artist near me</strong>.
            </p>

            <p>
              At <strong>Alankarini Mehndi Art Varanasi</strong>, artist Sandhya brings more than 3+ years of professional wedding specialization. 
              Whether you are looking for a traditional <strong>varanasi mehndi artist</strong> who understands sacred Banarasi motifs (like lotus ponds, 
              shahnai, kalash, and Radha-Krishna portraits) or an innovative designer adept at modern Gulf and Indo-Arabic fusion, selecting 
              a reputable <strong>professional mehndi artist near me</strong> ensures flawless symmetry, neat cone pressure, and guaranteed dark maroon stains.
            </p>

            <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#c5a059]/30 my-4">
              <h4 className="font-serif font-bold text-sm text-[#5d0e0e] mb-2">
                Key Checklist When Choosing a Mehndi Artist Near You:
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Chemical-Free Organic Henna:</strong> Ensure the artist does not use toxic black chemical cones with synthetic dyes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Real Portfolio Photographs:</strong> Verify unedited photos of custom bride &amp; groom face sketching and full arm coverage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Availability &amp; Open Hours:</strong> If looking for a <strong>mehandi near me open now</strong>, confirm slot booking in advance to avoid wedding rush delays.</span>
                </li>
              </ul>
            </div>

            <p>
              Whether you compare local Banaras legends or established centers like <strong>Kanha mehndi art</strong>, Alankarini stands out for our 
              direct, personal client touch, hygienic natural paste, and customized storytelling layouts tailored to every bride's love journey.
            </p>
          </div>
        </section>

        {/* SECTION 2: Doorstep Home Service & Online Booking */}
        <section id="home-service" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <MapPin size={14} />
            <span>Section 2 • Doorstep Convenience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Doorstep Mehndi Home Service in Varanasi &amp; Instant Booking
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              Planning a wedding or sangeet is hectic. Traveling across crowded city streets before your wedding day is stressful. 
              That is why searches for <strong>"mehendi home service near me"</strong> and <strong>"mehndi near me home service"</strong> have skyrocketed.
            </p>

            <p>
              With Alankarini's dedicated <strong>mehendi artist near me home service</strong>, artist Sandhya and her skilled assistant team travel 
              directly to your residence, bridal hotel suite, or wedding banquet hall anywhere in Varanasi and Banaras.
            </p>

            {/* Areas served grid */}
            <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#c5a059]/20 my-4">
              <h4 className="font-serif font-bold text-sm text-[#5d0e0e] mb-2">
                Local Varanasi Areas Covered with Doorstep Home Service:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-700">
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Durgakund &amp; Jawahar Nagar</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Lanka &amp; BHU Campus</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Assi Ghat &amp; Ravindrapuri</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Sigra &amp; Vidyapeeth</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Bhelupur &amp; Kamachha</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Mahmoorganj &amp; Rathyatra</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Godowlia &amp; Dashashwamedh</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Cantt &amp; Nadesar</span>
                <span className="bg-white p-2 rounded-lg border border-gray-200/70">📍 Shivpur, Pandeypur &amp; Sarnath</span>
              </div>
            </div>

            <p>
              Booking your session is simple. Through our verified <strong>online mehndi booking</strong> hotline, you can confirm artist Sandhya's 
              availability instantly on WhatsApp. We provide upfront date reservations without hidden transport charges.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20want%20to%20inquire%20about%20Doorstep%20Mehndi%20Home%20Service%20in%20Varanasi.%20Please%20share%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <WhatsAppIcon size={16} />
                <span>Instant Home Service WhatsApp Booking</span>
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone size={14} />
                <span>Call Helpline: +91 9336814631</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 3: Transparent Price Guide & Charges */}
        <section id="price-charges" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <DollarSign size={14} />
            <span>Section 3 • Rates &amp; Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Transparent Pricing: Mehndi Artist Near Me with Price &amp; Charges
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              One of the biggest concerns for brides and event planners is unexpected quote inflation. 
              Searches for <strong>"mehndi artist near me with price"</strong>, <strong>"mehendi artist near me with price"</strong>, 
              <strong>"mehndi near me with price"</strong>, and <strong>"their price"</strong> prove that customers value transparency above all else.
            </p>

            <p>
              At Alankarini Mehndi Art, we believe in upfront, ethical pricing. Below is our standard rate reference for bridal, groom, 
              and guest mehndi services in Varanasi:
            </p>

            {/* Price comparison table */}
            <div className="overflow-x-auto my-4">
              <table className="w-full text-left border-collapse text-xs sm:text-sm bg-white rounded-2xl overflow-hidden border border-gray-200">
                <thead>
                  <tr className="bg-[#5d0e0e] text-[#faf3df]">
                    <th className="p-3.5 sm:p-4 font-serif font-bold">Service Package</th>
                    <th className="p-3.5 sm:p-4 font-serif font-bold">Starting Price</th>
                    <th className="p-3.5 sm:p-4 font-serif font-bold">Description &amp; Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-[#faf7f2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#5d0e0e]">Royal Bridal Mehndi</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800">From ₹5,100</td>
                    <td className="p-3.5 sm:p-4 text-xs">Full elbow-length hands, custom bride-groom portrait sketches, shahnai/doli scenes, and matching feet designs.</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#5d0e0e]">Semi-Bridal / Engagement</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800">₹2,100 – ₹3,500</td>
                    <td className="p-3.5 sm:p-4 text-xs">Mid-forearm coverage with dense Rajasthani jaali grids, shaded floral mandalas, and wrist cuffs.</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#5d0e0e]">Groom (Dulha) Mehndi</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800">₹1,100 – ₹2,100</td>
                    <td className="p-3.5 sm:p-4 text-xs">Auspicious mandalas, wedding date calligraphed, bride's name hidden in fine lines, and palm accents.</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#5d0e0e]">Arabic / Indo-Arabic Bel</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800">₹500 – ₹1,200</td>
                    <td className="p-3.5 sm:p-4 text-xs">Flowing diagonal floral trails, negative filling, and finger ornament accents.</td>
                  </tr>
                  <tr className="hover:bg-[#faf7f2]/60 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-[#5d0e0e]">Guest &amp; Family Mehndi</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-800">From ₹250 / hand</td>
                    <td className="p-3.5 sm:p-4 text-xs">Fast, elegant designs for wedding guests, sangeet parties, and festive celebrations.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 italic">
              * Note: Custom portrait figures (e.g. Radha-Krishna or detailed couple portraits) may vary based on forearm height. 
              Contact us with your reference photo for a personalized quote without obligation.
            </p>
          </div>
        </section>

        {/* SECTION 4: 35-Day Mehndi Classes, Academy & Course Fees */}
        <section id="classes-academy" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <GraduationCap size={14} />
            <span>Section 4 • Academy &amp; Certification</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Professional Mehndi Training Classes &amp; Academy in Banaras
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              Looking to transform your artistic passion into a thriving profession? Google is flooded with queries like 
              <strong> "mehndi class near me"</strong>, <strong>"mehndi training classes near me"</strong>, <strong>"mehndi academy near me"</strong>, 
              <strong>"professional mehandi classes near me"</strong>, and <strong>"mehndi classes near me with fees"</strong>.
            </p>

            <p>
              At <strong>Alankarini Mehandi Academy</strong>, artist Sandhya conducts an intensive, structured 
              <strong> 35-day comprehensive mehandi course</strong> designed for both absolute beginners and aspiring bridal professionals.
            </p>

            {/* Course Terms Callout */}
            <div className="bg-[#f5efe4] border-2 border-[#c5a059]/40 rounded-2xl p-5 my-4">
              <h4 className="font-serif font-bold text-base text-[#5d0e0e] mb-2 flex items-center gap-2">
                <Award size={18} className="text-[#c5a059]" />
                <span>Uniform 35-Day Syllabus with Transparent Kit &amp; Certificate Policy</span>
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                The 35-day course syllabus is <strong>100% identical for every student</strong>. Only ₹2,000 (Online) and ₹4,000 (Offline) paying 
                students receive the complete <strong>Henna Starter Kit</strong> and official <strong>Course Completion Certificate</strong>. 
                Students paying the lower fees of ₹1,500 (Online) and ₹3,500 (Offline) receive full access to all lectures and live learning without kit and certificate.
              </p>
            </div>

            {/* Fee Package Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl border border-[#c5a059]/30 bg-[#faf7f2]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5d0e0e] bg-[#efe1b4]/70 px-2 py-0.5 rounded">
                  Online Live Batches (Zoom / Meet)
                </span>
                <h5 className="font-serif font-bold text-base text-[#5d0e0e] mt-2">Online Mehandi Batches (35 Days)</h5>
                <ul className="mt-2 space-y-1.5 text-xs text-gray-700">
                  <li>• <strong>Online Go Batch (₹1,500):</strong> Classes Only (Learn full 35-day syllabus; no kit, no certificate)</li>
                  <li>• <strong>Online Plus Batch (₹2,000):</strong> Complete Pack (Full classes + Henna Kit delivered + Completion Certificate)</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-[#5d0e0e]/20 bg-[#faf7f2]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                  Offline Studio in Varanasi (Durgakund)
                </span>
                <h5 className="font-serif font-bold text-base text-[#5d0e0e] mt-2">Offline Studio Batches (35 Days)</h5>
                <ul className="mt-2 space-y-1.5 text-xs text-gray-700">
                  <li>• <strong>Offline Go Batch (₹3,500):</strong> Classes Only (Direct physical mentorship; no take-home kit, no certificate)</li>
                  <li>• <strong>Offline Plus Batch (₹4,000):</strong> Complete Pack (Full studio classes + Take-home kit + Physical Certificate)</li>
                </ul>
              </div>
            </div>

            <h4 className="font-serif font-bold text-base text-[#5d0e0e] mt-6 mb-2">
              The 4 Core Modules in Our 35-Day Syllabus:
            </h4>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-xs font-bold text-[#5d0e0e]">Part 1: Basic Mehandi Foundation (15 Essential Topics)</span>
                <p className="text-xs text-gray-600 mt-1">
                  Cone rolling &amp; paste making, Arabic elements &amp; shading, flowers design &amp; leaves, basic elements, partition belt design, 
                  fillup &amp; belt design, negative filling, dark and light patches, birds (parrot &amp; swan), startup design, peacock design, 
                  mandala design, finger design, Indian wedding symbols, and full hand compositions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-xs font-bold text-[#5d0e0e]">Part 2: Semi Portrait &amp; Full Bridal</span>
                <p className="text-xs text-gray-600 mt-1">
                  All face structure proportions, half body structure, detailed sketches of eye, hand, lips, and nose, followed by full body Bride and Groom figures.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-xs font-bold text-[#5d0e0e]">Part 3: Special Mastery Session (Chemistry &amp; Flow)</span>
                <p className="text-xs text-gray-600 mt-1">
                  Mixology masterclass, cone making (perfect size &amp; flow secrets), paste making (dark stain, long result formula), and complete doubt-solving.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                <span className="text-xs font-bold text-[#5d0e0e]">Part 4: Instagram Handling &amp; Business Growth</span>
                <p className="text-xs text-gray-600 mt-1">
                  How to make reels that go viral, hashtag strategy &amp; timing tricks, how to connect with bridal clients in DMs, and personal branding tips for artists.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setView('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>View Full 35-Day Classes Page</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: Practice Tools & Stencils vs Freehand */}
        <section id="tools-stencils" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <Package size={14} />
            <span>Section 5 • Learning Supplies &amp; Tools</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Practice Essentials: Acrylic Hands &amp; Books vs Henna Stencils
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              When beginners start learning henna or preparing for festive gatherings, queries like 
              <strong> "mehndi stencil near me"</strong>, <strong>"mehendi stencil stickers"</strong>, <strong>"buy mehndi stencil"</strong>, 
              <strong>"bridal mehendi stencil"</strong>, and <strong>"acrylic hand for mehndi practice"</strong> are very common.
            </p>

            <p>
              Here is what aspiring artists and customers should know about learning tools versus stencil stickers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#c5a059]/30">
                <h4 className="font-serif font-bold text-sm text-[#5d0e0e] mb-2">
                  1. Washable Acrylic Hands &amp; Practice Books
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  For anyone joining a <strong>mehndi course near me</strong>, practicing on an <strong>acrylic hand for mehndi practice</strong> and 
                  structured <strong>mehndi book practice</strong> sheets is the single most effective way to build muscle memory. 
                  Acrylic boards can be wiped clean with a wet cloth hundreds of times, allowing you to master fine line pressure, circles, 
                  humps, and bridal jaalis before applying paste onto living skin.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#5d0e0e]/20">
                <h4 className="font-serif font-bold text-sm text-[#5d0e0e] mb-2">
                  2. Pre-Cut Henna Stencils &amp; Sticker Sheets
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Searches for <strong>mehndi stickers near me shop</strong> or <strong>mehendi shop near me</strong> often seek adhesive plastic cutout stencils. 
                  While stencils are fun for young children or emergency touchups, they cannot recreate the intricate depth, personalized bride-groom portraits, 
                  or anatomical flow of true freehand bridal art. In our academy, students learn 100% freehand mastery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Trending Styles: Arabic (Aerobic), Katseye & Tattoos */}
        <section id="design-trends" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <Palette size={14} />
            <span>Section 6 • Aesthetics &amp; Innovations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Trending Mehndi Styles: Arabic (Aerobic), Katseye &amp; Modern Tattoos
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              Henna fashion evolves with every wedding season. Several fascinating search trends have emerged recently:
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-gray-750">
              <li className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#c5a059]/20">
                <strong className="text-[#5d0e0e]">"Aerobic Mehndi Design" &amp; Arabic Floral Art:</strong>
                <p className="mt-1 text-xs text-gray-650">
                  Many users type <strong>"aerobic mehndi design"</strong> or <strong>"aerobics mehndi"</strong> when looking for flowing 
                  <strong> arabic floral mehndi designs</strong>! These patterns feature bold contour lines, shaded lotus petals, negative space fills, 
                  and diagonal wrist-to-finger trails that look chic, modern, and uncluttered.
                </p>
              </li>

              <li className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#c5a059]/20">
                <strong className="text-[#5d0e0e]">"Katseye Mehndi Design":</strong>
                <p className="mt-1 text-xs text-gray-650">
                  Inspired by global pop trends and Gen-Z aesthetics, <strong>katseye mehndi designs</strong> focus on minimalist fingertip ornaments, 
                  delicate starburst mandalas on the back of the palm, and aesthetic symmetry perfect for cocktail dresses and Indo-Western attire.
                </p>
              </li>

              <li className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#c5a059]/20">
                <strong className="text-[#5d0e0e]">Classical Mehndi &amp; Mehendi Corner Layouts:</strong>
                <p className="mt-1 text-xs text-gray-650">
                  Traditionalists love <strong>classical mehndi</strong> featuring Rajasthani shehnai, doli, peacock plumage, and ornate 
                  <strong> mehendi corner designs</strong> that frame wrists and ankles like royal jewellery.
                </p>
              </li>

              <li className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#c5a059]/20">
                <strong className="text-[#5d0e0e]">Semi-Permanent Mahendi Tattoos:</strong>
                <p className="mt-1 text-xs text-gray-650">
                  Searching for a painless, natural body art alternative? <strong>Mahendi tattoo</strong> designs on the collarbone, wrist, or shoulder 
                  provide rich organic maroon stains that last 10–14 days without needles or harmful chemicals.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 7: Studio Location & Contact Helpline */}
        <section id="studio-location" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c5a059] mb-2">
            <MapPin size={14} />
            <span>Section 7 • Studio &amp; Admissions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mb-4">
            Alankarini Mehndi Art Studio Location &amp; Admission Helpline
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-gray-750">
            <p>
              Whether you want to visit our studio in Banaras for an in-person bridal consultation or register for the 35-day academy batch, 
              here is our physical address and direct contact information:
            </p>

            <div className="p-5 bg-[#faf7f2] rounded-2xl border border-[#c5a059]/30 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#5d0e0e] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#5d0e0e]">Studio Address:</strong>
                  <p className="text-gray-600 mt-0.5">{profile.location}</p>
                  <p className="text-[11px] text-gray-500">(Centrally located near Durgakund Temple, Lanka, and Assi Ghat)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-[#5d0e0e] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#5d0e0e]">Direct Phone &amp; Helpline:</strong>
                  <p className="text-gray-600 mt-0.5">
                    <a href={`tel:${cleanPhone}`} className="text-[#5d0e0e] font-bold underline">
                      {profile.phone}
                    </a> (Available all 7 days from 08:00 AM to 09:00 PM)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <WhatsAppIcon size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#5d0e0e]">WhatsApp Inquiry:</strong>
                  <p className="text-gray-600 mt-0.5">
                    <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold underline">
                      Message +91 9336814631 on WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Frequently Asked Questions */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c5a059]/25 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-[#c5a059]">
              💡 Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#5d0e0e] mt-1">
              Top Search Queries &amp; Direct Answers
            </h3>
          </div>

          <div className="space-y-3">
            {articleFaqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all bg-[#faf7f2]/50"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 font-serif font-bold text-sm sm:text-base text-[#5d0e0e] hover:text-[#c5a059] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight 
                      size={16} 
                      className={`text-[#c5a059] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-gray-700 font-sans leading-relaxed border-t border-gray-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-[#5d0e0e] to-[#7c1818] rounded-3xl p-8 sm:p-10 text-center text-[#faf3df] shadow-xl">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl mb-3">
            Ready to Book Your Bridal Date or Join the 35-Day Academy?
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed">
            Contact artist Sandhya directly for personalized bridal consultations, doorstep home visit reservations in Varanasi, 
            or enrollment in our upcoming online and offline mehandi batches.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hello%20Sandhya,%20I%20read%20the%20Mehndi%20Guide%20and%20want%20to%20connect%20for%20booking/classes.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              <WhatsAppIcon size={16} />
              <span>Connect on WhatsApp (+91 9336814631)</span>
            </a>
            <button
              onClick={() => { setView('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d3b575] text-[#5d0e0e] py-3.5 px-8 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            >
              <span>Explore 35-Day Course Syllabus</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
}
