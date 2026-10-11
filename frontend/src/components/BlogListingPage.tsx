import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight
} from 'lucide-react';
import { getAllPublishedArticles, BlogArticle } from '../data/blogArticles';

interface BlogListingPageProps {
  setView: (view: string) => void;
}

export function BlogListingPage({ setView }: BlogListingPageProps) {
  const allArticles = getAllPublishedArticles();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Bridal Guide',
    'Design Inspiration',
    'Mehndi Academy',
    'Arabic Patterns',
    'Client Preparation'
  ];

  const filteredArticles = allArticles.filter(article => {
    return selectedCategory === 'All' || article.category === selectedCategory;
  });

  const handleArticleClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setView(`blog:${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#efe1b4]/40 text-[#5d0e0e] text-xs font-bold px-3 py-1 rounded-full border border-[#c5a059]/30 font-sans uppercase tracking-wider mb-3">
            <BookOpen size={13} className="text-[#875914]" />
            <span>Alankarini Editorial Journal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#5d0e0e] tracking-tight mb-4">
            Mehndi Art Guides, Bridal Tips &amp; Insights
          </h1>

          <div className="h-1 w-24 bg-[#c5a059] mx-auto mb-6 rounded-full"></div>

          <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed">
            Welcome to the official Alankarini Mehandi Art journal. Discover expert bridal guides, authentic design inspiration, professional academy course insights, and practical henna preparation advice from Varanasi.
          </p>
        </div>

        {/* Horizontal Category Filter Buttons */}
        <div className="w-full flex items-center justify-start md:justify-center overflow-x-auto pb-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 sm:p-2 bg-white rounded-2xl border border-[#efe1b4] shadow-xs shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-sans font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#5d0e0e] text-[#faf3df] shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#efe1b4] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Thumbnail */}
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
                  
                  <span className="absolute top-3 left-3 bg-[#5d0e0e]/95 text-[#faf3df] text-[11px] font-sans font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs border border-[#c5a059]/30 tracking-wide uppercase">
                    {article.category}
                  </span>

                  <span className="absolute bottom-3 right-3 bg-white/90 text-gray-800 text-[10px] font-sans font-medium px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-xs">
                    <Clock size={11} className="text-[#875914]" />
                    <span>{article.readTime}</span>
                  </span>
                </a>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
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

                    {/* Title */}
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-[#5d0e0e] group-hover:text-[#801414] transition-colors leading-snug mb-3">
                      <a
                        href={`/blog/${article.slug}`}
                        onClick={(e) => handleArticleClick(article.slug, e)}
                      >
                        {article.title}
                      </a>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-650 font-sans text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read button */}
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
                      Alankarini Art
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 mb-16">
            <p className="text-gray-600 font-sans text-sm mb-3">
              No articles found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-bold text-[#5d0e0e] uppercase tracking-wider underline cursor-pointer"
            >
              View all articles
            </button>
          </div>
        )}

        {/* Developer & Technical Profile Preservation Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#c5a059]/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#5d0e0e] text-[#faf3df] flex items-center justify-center shrink-0 font-serif font-black text-xl">
              R
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#875914] block">
                Platform Engineering &amp; Architect
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#5d0e0e]">
                Rajnikant Gaurav - Technical Architecture Profile
              </h3>
              <p className="text-xs text-gray-600 font-sans mt-0.5">
                Explore the engineering biography, platform development stack, and technical foundation behind Alankarini.
              </p>
            </div>
          </div>
          <a
            href="/blog/rajnikant-gaurav"
            onClick={(e) => {
              e.preventDefault();
              setView('blog:rajnikant-gaurav');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#5d0e0e] hover:text-[#c5a059] border border-[#c5a059]/50 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <span>View Architecture Profile</span>
            <ArrowRight size={13} />
          </a>
        </div>

      </div>
    </div>
  );
}
