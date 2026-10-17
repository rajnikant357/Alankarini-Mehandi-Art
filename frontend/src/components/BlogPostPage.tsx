import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { BlogArticle, BLOG_ARTICLES } from '../data/blogArticles';
import { ProfileInfo } from '../types';
import { DecemberBatchAnnouncementBanner } from './DecemberBatchAnnouncementBanner';

interface BlogPostPageProps {
  article: BlogArticle;
  profile: ProfileInfo;
  setView: (view: string) => void;
}

export function BlogPostPage({ article, profile, setView }: BlogPostPageProps) {
  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = profile.whatsapp.replace(/[^0-9+]/g, '');

  const relatedArticles = BLOG_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  const handleNav = (targetView: string, e: React.MouseEvent) => {
    e.preventDefault();
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `https://alankarini-mehandi-art.vercel.app/blog/${article.slug}`,
        });
      } catch {
        // User dismissed share dialog
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(`https://alankarini-mehandi-art.vercel.app/blog/${article.slug}`);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="min-h-screen bg-[#faf7f2] py-8 sm:py-12">
      {/* Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <a
            href="/blog"
            onClick={(e) => handleNav('blog', e)}
            className="inline-flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#5d0e0e] hover:text-[#801414] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </a>
        </div>

        {/* Article Header Card */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-[#efe1b4] shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="bg-[#5d0e0e] text-[#faf3df] text-xs font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-sans text-gray-600 hover:text-[#5d0e0e] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors cursor-pointer"
              aria-label="Share article link"
            >
              <Share2 size={13} />
              <span>Share Article</span>
            </button>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5d0e0e] leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-600 font-sans border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-[#c5a059]" />
              <span className="font-semibold text-gray-800">{article.author}</span>
              <span className="text-gray-400">({article.authorRole})</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#c5a059]" />
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#c5a059]" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-[#f5efe4]">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            width={900}
            height={500}
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto max-h-[460px] object-cover object-center"
          />
          <p className="p-3 text-[11px] font-sans text-gray-500 bg-white/95 text-center italic border-t border-gray-100">
            {article.featuredImageAlt} — Handcrafted by artist Sandhya at Alankarini Mehandi Art, Varanasi.
          </p>
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#efe1b4] shadow-xs space-y-8 font-sans text-gray-800 leading-relaxed">
          
          {/* Intro Section */}
          <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-sans border-b border-[#efe1b4]/60 pb-8">
            {article.content.intro.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Structured Content Sections */}
          {article.content.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4 pt-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#5d0e0e] tracking-tight">
                {section.heading}
              </h2>

              {section.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Unordered List */}
              {section.list && (
                <ul className="space-y-2.5 my-4 pl-2">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-750">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Checklist */}
              {section.checklist && (
                <div className="bg-[#faf7f2] p-5 sm:p-6 rounded-2xl border border-[#c5a059]/20 my-4 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#875914] block">
                    Key Checklist &amp; Points to Confirm
                  </span>
                  <ul className="space-y-2.5">
                    {section.checklist.map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                        <CheckCircle2 size={16} className="text-[#0d695e] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Editorial Callout */}
              {section.callout && (
                <div className="bg-[#efe1b4]/30 border-l-4 border-[#c5a059] p-5 rounded-r-2xl my-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5d0e0e] mb-1">
                    <Sparkles size={14} className="text-[#875914]" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-750 italic leading-relaxed">
                    {section.callout.text}
                  </p>
                </div>
              )}

              {/* In-article Graphic */}
              {section.image && (
                <div className="my-6 rounded-2xl overflow-hidden border-2 border-[#efe1b4] shadow-xs">
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[380px] object-cover object-center"
                  />
                  {section.image.caption && (
                    <p className="p-2.5 text-[11px] font-sans text-gray-500 bg-[#faf7f2] text-center italic">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              )}
            </section>
          ))}

          {/* Inbetween Announcement: Dec Batch */}
          <div className="my-8">
            <DecemberBatchAnnouncementBanner profile={profile} setView={setView} variant={1} />
          </div>

          {/* Contextual Internal Links Section */}
          <div className="bg-[#f5efe4]/60 p-6 rounded-2xl border border-[#c5a059]/30 my-8 space-y-3">
            <h3 className="font-serif font-bold text-base text-[#5d0e0e]">
              Explore Related Alankarini Resources &amp; Services
            </h3>
            <p className="text-xs text-gray-600">
              Browse our verified portfolios, transparent course packages, and wedding services in Varanasi:
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href="/services"
                onClick={(e) => handleNav('services', e)}
                className="bg-white hover:bg-gray-50 text-[#5d0e0e] border border-[#c5a059]/50 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Mehndi Services &amp; Packages
              </a>
              <a
                href="/gallery"
                onClick={(e) => handleNav('gallery', e)}
                className="bg-white hover:bg-gray-50 text-[#5d0e0e] border border-[#c5a059]/50 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Mehndi Designs Gallery
              </a>
              <a
                href="/classes"
                onClick={(e) => handleNav('classes', e)}
                className="bg-white hover:bg-gray-50 text-[#5d0e0e] border border-[#c5a059]/50 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Mehndi Classes &amp; Fees
              </a>
              <a
                href="/contact"
                onClick={(e) => handleNav('contact', e)}
                className="bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Contact &amp; Bookings
              </a>
            </div>
          </div>

          {/* Conclusion */}
          <section className="border-t border-[#efe1b4] pt-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#5d0e0e]">
              {article.content.conclusion.heading}
            </h2>
            {article.content.conclusion.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {p}
              </p>
            ))}
          </section>

          {/* Article CTA Banner */}
          <div className="bg-[#5d0e0e] text-[#faf3df] p-6 sm:p-8 rounded-3xl relative overflow-hidden mt-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c5a059]/10 rounded-full filter blur-[60px] pointer-events-none"></div>
            <div className="relative z-10 space-y-3">
              <span className="text-[#c5a059] text-[11px] font-bold uppercase tracking-widest block font-sans">
                ⭐ Connect with Artist Sandhya ⭐
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {article.content.cta.title}
              </h3>
              <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                {article.content.cta.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=Hi%20Sandhya,%20I%20read%20your%20article%20about%20"${encodeURIComponent(article.title)}"%20and%20want%20to%20enquire.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0d695e] hover:bg-[#075e54] text-white px-5 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageSquare size={15} />
                  <span>Enquire on WhatsApp</span>
                </a>
                <a
                  href={`tel:${cleanPhone}`}
                  className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d3b575] text-[#5d0e0e] px-5 py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Phone size={15} />
                  <span>Call +91 9336814631</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-14 space-y-6">
            <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
              <h3 className="font-serif text-2xl font-bold text-[#5d0e0e]">
                Related Articles &amp; Guides
              </h3>
              <a
                href="/blog"
                onClick={(e) => handleNav('blog', e)}
                className="text-xs font-bold text-[#875914] hover:text-[#5d0e0e] flex items-center gap-1 transition-colors"
              >
                <span>View all</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#efe1b4] shadow-xs hover:shadow-md transition-shadow flex flex-col group"
                >
                  <a
                    href={`/blog/${rel.slug}`}
                    onClick={(e) => handleNav(`blog:${rel.slug}`, e)}
                    className="block aspect-[16/10] overflow-hidden bg-[#f5efe4]"
                  >
                    <img
                      src={rel.featuredImage}
                      alt={rel.featuredImageAlt}
                      width={400}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#875914]">
                        {rel.category}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#5d0e0e] group-hover:text-[#801414] leading-snug mt-1 mb-2">
                        <a
                          href={`/blog/${rel.slug}`}
                          onClick={(e) => handleNav(`blog:${rel.slug}`, e)}
                        >
                          {rel.title}
                        </a>
                      </h4>
                    </div>
                    <a
                      href={`/blog/${rel.slug}`}
                      onClick={(e) => handleNav(`blog:${rel.slug}`, e)}
                      className="text-xs font-bold text-[#5d0e0e] hover:text-[#c5a059] flex items-center gap-1 pt-2 transition-colors"
                    >
                      <span>Read Blog</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}
