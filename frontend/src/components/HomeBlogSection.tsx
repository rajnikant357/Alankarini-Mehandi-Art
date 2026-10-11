import React from 'react';
import { BookOpen, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { getFeaturedArticles, BlogArticle } from '../data/blogArticles';

interface HomeBlogSectionProps {
  setView: (view: string) => void;
}

export function HomeBlogSection({ setView }: HomeBlogSectionProps) {
  const articles: BlogArticle[] = getFeaturedArticles();

  const handleArticleClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setView(`blog:${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 lg:py-24 bg-[#faf7f2] border-t border-[#c5a059]/20 relative overflow-hidden">
      {/* Subtle decorative background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/5 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5d0e0e]/5 rounded-full filter blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#efe1b4]/40 text-[#5d0e0e] text-xs font-bold px-3 py-1 rounded-full border border-[#c5a059]/30 font-sans uppercase tracking-wider mb-3">
            <BookOpen size={13} className="text-[#875914]" />
            <span>Alankarini Mehndi Journal</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-bold text-[#5d0e0e] tracking-tight">
            Mehndi Tips, Bridal Inspiration &amp; Design Guides
          </h2>
          
          <div className="h-1 w-20 bg-[#c5a059] mx-auto mt-4 mb-5 rounded-full"></div>
          
          <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed">
            Explore bridal mehndi inspiration, design ideas, practical guides, and mehndi training information from Alankarini Mehandi Art in Varanasi.
          </p>
        </div>

        {/* Responsive Article Grid (1 col mobile, 2 cols tablet, 3 cols desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#efe1b4]/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail Container */}
              <a
                href={`/blog/${article.slug}`}
                onClick={(e) => handleArticleClick(article.slug, e)}
                className="relative block aspect-[16/10] overflow-hidden bg-[#f5efe4]"
                aria-label={`Read article: ${article.title}`}
              >
                <img
                  src={article.featuredImage}
                  alt={article.featuredImageAlt}
                  width={600}
                  height={375}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge overlay */}
                <span className="absolute top-3 left-3 bg-[#5d0e0e]/95 text-[#faf3df] text-[11px] font-sans font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs border border-[#c5a059]/30 tracking-wide uppercase">
                  {article.category}
                </span>

                {/* Read time pill */}
                <span className="absolute bottom-3 right-3 bg-white/90 text-gray-800 text-[10px] font-sans font-medium px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-xs">
                  <Clock size={11} className="text-[#875914]" />
                  <span>{article.readTime}</span>
                </span>
              </a>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta Details */}
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 font-sans mb-2.5">
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-[#c5a059]" />
                      <span>{article.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#c5a059]" />
                      <span>{article.publishedAt}</span>
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5d0e0e] group-hover:text-[#801414] transition-colors leading-snug mb-3">
                    <a
                      href={`/blog/${article.slug}`}
                      onClick={(e) => handleArticleClick(article.slug, e)}
                    >
                      {article.title}
                    </a>
                  </h3>

                  {/* Short Excerpt */}
                  <p className="text-gray-650 font-sans text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href={`/blog/${article.slug}`}
                    onClick={(e) => handleArticleClick(article.slug, e)}
                    className="inline-flex items-center gap-1.5 text-[#5d0e0e] hover:text-[#c5a059] font-sans font-bold text-xs uppercase tracking-wider transition-colors py-1 cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Read Blog</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>

                  <span className="text-[10px] uppercase font-mono text-gray-400">
                    Varanasi Art
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Action */}
        <div className="text-center pt-2">
          <a
            href="/blog"
            onClick={handleViewAllClick}
            className="inline-flex items-center justify-center gap-2 bg-[#5d0e0e] hover:bg-[#7c1818] text-[#faf3df] hover:text-white px-8 py-4 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            <BookOpen size={16} />
            <span>View All Articles &amp; Guides</span>
            <ArrowRight size={15} />
          </a>
        </div>

      </div>
    </section>
  );
}
