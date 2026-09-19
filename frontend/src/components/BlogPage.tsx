import { useState, useEffect } from 'react';
import { 
  Globe, 
  ExternalLink, 
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Check
} from 'lucide-react';

interface BlogPageProps {
  setView: (view: string) => void;
}

export function BlogPage({ setView }: BlogPageProps) {
  const [tocHidden, setTocHidden] = useState(false);
  const [copied, setCopied] = useState(false);

  // Setup dynamic SEO, GEO tags and JSON-LD schema on mount
  useEffect(() => {
    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = 'Rajnikant Gaurav - Wikipedia, the Free Encyclopedia & Biography';

    // 2. Helper to set or create meta tags
    const metaTags: Array<{ name?: string; property?: string; content: string }> = [
      { name: 'description', content: 'Rajnikant Gaurav (born 20 September 2005 in Dadar, Ballia, Uttar Pradesh) is an independent software developer, technology entrepreneur, AI explorer, and founder of Prometrion. Read his encyclopedic biography, projects, tech stack, and achievements.' },
      { name: 'keywords', content: 'Rajnikant Gaurav, Rajnikant Gaurav developer, Rajnikant Gaurav Ballia, Rajnikant Gaurav Uttar Pradesh, Prometrion, Prometrion AI, LocalLink, independent software developer, AI builder India, www.rajnikantg.in, prometrion.com, B.Tech CSE, Wikipedia' },
      { name: 'author', content: 'Rajnikant Gaurav' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      // GEO Optimization tags for Search & AI Engines
      { name: 'geo.region', content: 'IN-UP' },
      { name: 'geo.placename', content: 'Dadar, Ballia, Uttar Pradesh, India' },
      { name: 'geo.position', content: '25.7583;84.1482' },
      { name: 'ICBM', content: '25.7583, 84.1482' },
      // Open Graph Tags
      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: 'Wikipedia Biographical Entry' },
      { property: 'og:title', content: 'Rajnikant Gaurav - Biographical Article & Encyclopedia' },
      { property: 'og:description', content: 'Biographical overview of Rajnikant Gaurav: independent software developer, AI builder, and founder of Prometrion from Dadar, Ballia, Uttar Pradesh.' },
      { property: 'og:url', content: 'https://alankarini-mehandi-art.vercel.app/blog' },
      { property: 'og:image', content: 'https://alankarini-mehandi-art.vercel.app/rajnikant1.png' },
      // Twitter Card Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Rajnikant Gaurav - Wikipedia Style Biography' },
      { name: 'twitter:description', content: 'Independent software developer, founder of Prometrion, and AI builder from Dadar, Ballia, Uttar Pradesh.' },
      { name: 'twitter:image', content: 'https://alankarini-mehandi-art.vercel.app/rajnikant1.png' }
    ];

    const addedElements: Element[] = [];

    metaTags.forEach(tagInfo => {
      let el: Element | null = null;
      if (tagInfo.name) {
        el = document.querySelector(`meta[name="${tagInfo.name}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('name', tagInfo.name);
          document.head.appendChild(el);
          addedElements.push(el);
        }
        el.setAttribute('content', tagInfo.content);
      } else if (tagInfo.property) {
        el = document.querySelector(`meta[property="${tagInfo.property}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('property', tagInfo.property);
          document.head.appendChild(el);
          addedElements.push(el);
        }
        el.setAttribute('content', tagInfo.content);
      }
    });

    // 3. Inject Structured Data (JSON-LD) for Person & BlogPosting & Breadcrumbs
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = 'rajnikant-gaurav-schema';
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://www.rajnikantg.in/#person",
          "name": "Rajnikant Gaurav",
          "alternateName": [
            "Rajnikant",
            "Rajnikant Gaurav Ballia",
            "Rajnikant Prometrion",
            "Rajnikant Gaurav Developer"
          ],
          "birthDate": "2005-09-20",
          "birthPlace": {
            "@type": "Place",
            "name": "Dadar, Ballia, Uttar Pradesh, India",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dadar",
              "addressRegion": "Ballia, Uttar Pradesh",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.7583,
              "longitude": 84.1482
            }
          },
          "homeLocation": {
            "@type": "Place",
            "name": "Ballia, Uttar Pradesh, India"
          },
          "nationality": "Indian",
          "gender": "Male",
          "jobTitle": "Independent Software Developer & Founder",
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Bachelor of Technology in Computer Science and Engineering"
          },
          "worksFor": {
            "@type": "Organization",
            "name": "Prometrion",
            "url": "https://www.prometrion.com"
          },
          "founder": {
            "@type": "Organization",
            "name": "Prometrion",
            "url": "https://www.prometrion.com"
          },
          "url": "https://www.rajnikantg.in",
          "image": [
            "https://alankarini-mehandi-art.vercel.app/rajnikant1.png",
            "https://alankarini-mehandi-art.vercel.app/rajnikant2.jpg"
          ],
          "sameAs": [
            "https://www.rajnikantg.in",
            "https://www.prometrion.com"
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "Large Language Models",
            "AI Agents",
            "Full-Stack Web Development",
            "React",
            "Node.js",
            "Express.js",
            "Python",
            "PostgreSQL",
            "Tailwind CSS",
            "Software Architecture",
            "SaaS Products",
            "Prometrion",
            "Prometrion AI",
            "LocalLink",
            "Entrepreneurship"
          ],
          "description": "Rajnikant Gaurav is an independent software developer, AI explorer, and founder of Prometrion, born in Dadar, Ballia, Uttar Pradesh, India."
        },
        {
          "@type": "Article",
          "@id": "https://alankarini-mehandi-art.vercel.app/blog#article",
          "headline": "Rajnikant Gaurav: Biographical Profile of an Independent Developer & Founder",
          "alternativeHeadline": "The Journey of Rajnikant Gaurav: Technology, Artificial Intelligence, and Prometrion",
          "description": "Comprehensive encyclopedia-style biography of Rajnikant Gaurav: early life in Dadar, Ballia, Uttar Pradesh, education in Computer Science, full-stack development, AI exploration, and founding of Prometrion.",
          "author": {
            "@type": "Person",
            "name": "Rajnikant Gaurav",
            "url": "https://www.rajnikantg.in"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Prometrion",
            "url": "https://www.prometrion.com"
          },
          "datePublished": "2025-01-01T00:00:00+05:30",
          "dateModified": "2026-09-19T12:00:00+05:30",
          "mainEntityOfPage": "https://alankarini-mehandi-art.vercel.app/blog",
          "image": "https://alankarini-mehandi-art.vercel.app/rajnikant1.png",
          "inLanguage": "en-US",
          "spatialCoverage": {
            "@type": "Place",
            "name": "Dadar, Ballia, Uttar Pradesh, India",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.7583,
              "longitude": 84.1482
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://alankarini-mehandi-art.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Biographies",
              "item": "https://alankarini-mehandi-art.vercel.app/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Rajnikant Gaurav",
              "item": "https://alankarini-mehandi-art.vercel.app/blog"
            }
          ]
        }
      ]
    };
    jsonLdScript.textContent = JSON.stringify(structuredData);
    document.head.appendChild(jsonLdScript);

    return () => {
      document.title = originalTitle;
      const existingScript = document.getElementById('rajnikant-gaurav-schema');
      if (existingScript) existingScript.remove();
      addedElements.forEach(el => el.remove());
    };
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#f6f6f6] min-h-screen py-4 sm:py-8 text-[#202122] font-sans antialiased selection:bg-[#cce2ff]">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Top Wikipedia Bar: Breadcrumbs & Return Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-[#a2a9b1] text-xs">
          <div className="flex items-center gap-1.5 text-[#54595d]">
            <button 
              onClick={() => { setView('home'); window.scrollTo(0, 0); }}
              className="text-[#0645ad] hover:underline cursor-pointer flex items-center gap-1 font-medium"
            >
              <ArrowLeft size={13} />
              <span>Main Website</span>
            </button>
            <span>/</span>
            <span>Biographies</span>
            <span>/</span>
            <span className="text-[#202122] font-semibold">Rajnikant Gaurav</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-[#a2a9b1] text-[#202122] hover:bg-[#f8f9fa] transition-colors cursor-pointer text-[11px]"
              title="Copy link to this article"
            >
              {copied ? <Check size={12} className="text-emerald-600" /> : <Share2 size={12} />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button 
              onClick={() => { setView('home'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#5d0e0e] text-[#faf3df] hover:bg-[#430a0a] transition-all font-serif cursor-pointer text-[11px]"
            >
              <span>Alankarini Mehndi Art</span>
            </button>
          </div>
        </div>

        {/* Main Wikipedia Document Box */}
        <article className="bg-white border border-[#a2a9b1] p-4 sm:p-8 sm:rounded-sm shadow-xs">
          
          {/* Wikipedia Article Heading */}
          <header className="mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#202122] border-b border-[#a2a9b1] pb-2 mb-1 tracking-tight">
              Rajnikant Gaurav
            </h1>
            <div className="flex items-center justify-between text-[11px] text-[#54595d] pt-1">
              <span>From the encyclopedia of software developers and startup founders</span>
              <span className="hidden sm:inline italic">Dadar, Ballia, Uttar Pradesh • Prometrion</span>
            </div>

            {/* Wikipedia Tabs Row */}
            <div className="flex items-center justify-between border-b border-[#a2a9b1] text-xs text-[#0645ad] mt-3 pb-0">
              <div className="flex gap-4">
                <span className="font-bold text-[#202122] border-b-2 border-[#3366cc] pb-1.5 -mb-[1px]">
                  Article
                </span>
              </div>
              <div className="flex gap-3 text-[11px] text-[#54595d] pb-1.5">
                <span className="font-semibold text-[#202122]">Read</span>
                <a 
                  href="https://www.rajnikantg.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#0645ad] hover:underline cursor-pointer"
                >
                  View source
                </a>
              </div>
            </div>
          </header>

          {/* 
            WIKIPEDIA INFOBOX:
            Floated to the right on desktop (md:float-right md:w-96 md:ml-6 mb-6),
            Featuring the REDUCED 2-GRID IMAGE LAYOUT on one line, followed by biographical facts.
          */}
          <aside className="w-full md:float-right md:w-96 md:ml-6 mb-6 bg-[#f8f9fa] border border-[#a2a9b1] text-xs text-[#202122] shadow-xs">
            {/* Infobox Header */}
            <div className="bg-[#eaecf0] py-2 px-3 text-center font-serif font-bold text-sm text-[#202122] border-b border-[#a2a9b1]">
              Rajnikant Gaurav
            </div>

            {/* 
              REDUCED IMAGE CARDS IN ONE LINE 2-GRID LAYOUT:
              Both images side-by-side in one row (2 columns) with compact height,
              clean Wikipedia thumbnail borders and concise captions.
            */}
            <div className="p-2.5 bg-white border-b border-[#a2a9b1]">
              <div className="grid grid-cols-2 gap-2">
                
                {/* Image 1: Formal Portrait */}
                <div className="text-center">
                  <div className="border border-[#c8ccd1] overflow-hidden bg-gray-50 aspect-[3/4] max-h-48 sm:max-h-52 flex items-center justify-center">
                    <img 
                      src="/rajnikant1.png" 
                      alt="Rajnikant Gaurav in formal attire" 
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-200"
                      loading="eager"
                    />
                  </div>
                  <div className="text-[10px] text-[#54595d] mt-1 px-0.5 leading-tight font-sans">
                    Formal portrait (2025)
                  </div>
                </div>

                {/* Image 2: Coffee & Code */}
                <div className="text-center">
                  <div className="border border-[#c8ccd1] overflow-hidden bg-gray-50 aspect-[3/4] max-h-48 sm:max-h-52 flex items-center justify-center">
                    <img 
                      src="/rajnikant2.jpg" 
                      alt="Rajnikant Gaurav working with coffee" 
                      className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[10px] text-[#54595d] mt-1 px-0.5 leading-tight font-sans">
                    Built with 💻 &amp; ☕
                  </div>
                </div>

              </div>

              <div className="text-center text-[11px] text-[#54595d] pt-1.5 mt-1.5 border-t border-gray-200 italic">
                Rajnikant Gaurav — Founder of Prometrion
              </div>
            </div>

            {/* Infobox Biographical Factsheet Table */}
            <table className="w-full text-[11px] border-collapse">
              <tbody>
                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] w-1/3 align-top">
                    Born
                  </th>
                  <td className="p-2 align-top text-[#202122]">
                    <strong>20 September 2005</strong> (age 20)<br />
                    <span>Dadar, Ballia, Uttar Pradesh, India</span>
                  </td>
                </tr>

                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Coordinates
                  </th>
                  <td className="p-2 align-top text-[#0645ad]">
                    <span title="Dadar, Ballia">25.7583° N, 84.1482° E</span>
                  </td>
                </tr>

                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Alma mater
                  </th>
                  <td className="p-2 align-top text-[#202122]">
                    Bachelor of Technology (B.Tech)<br />
                    <span className="text-[#54595d]">Computer Science and Engineering</span>
                  </td>
                </tr>

                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Occupation
                  </th>
                  <td className="p-2 align-top text-[#202122]">
                    Independent software developer • technology entrepreneur • AI builder
                  </td>
                </tr>

                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Known for
                  </th>
                  <td className="p-2 align-top text-[#202122]">
                    Founder of Prometrion<br />
                    Prometrion AI<br />
                    LocalLink Marketplace
                  </td>
                </tr>

                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Organization
                  </th>
                  <td className="p-2 align-top text-[#202122]">
                    <a 
                      href="https://www.prometrion.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0645ad] hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      Prometrion <ExternalLink size={10} />
                    </a>
                  </td>
                </tr>

                <tr className="border-b border-[#eaecf0]">
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Key stack
                  </th>
                  <td className="p-2 align-top text-[#202122] text-[10.5px]">
                    JavaScript, React, Node.js, Express.js, Python, PostgreSQL, Tailwind CSS, Git, Cloud APIs, LLMs
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="text-left font-bold text-[#54595d] p-2 bg-[#f8f9fa] align-top">
                    Websites
                  </th>
                  <td className="p-2 align-top space-y-1">
                    <div>
                      <a 
                        href="https://www.rajnikantg.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#0645ad] hover:underline font-semibold inline-flex items-center gap-0.5"
                      >
                        rajnikantg.in <ExternalLink size={10} />
                      </a>
                    </div>
                    <div>
                      <a 
                        href="https://www.prometrion.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#0645ad] hover:underline inline-flex items-center gap-0.5"
                      >
                        prometrion.com <ExternalLink size={10} />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </aside>

          {/* Lead Section (Wikipedia Encyclopedic Standard) */}
          <div className="text-sm sm:text-base text-[#202122] leading-relaxed space-y-3 font-serif">
            <p>
              <strong>Rajnikant Gaurav</strong> (born 20 September 2005) is an independent software developer, technology enthusiast, AI explorer, open-source contributor, and entrepreneur from Uttar Pradesh, India. His career and development philosophy are centered on one primary principle: <em>learn technology, build with it, and turn ideas into real products.</em>
            </p>
            <p>
              Born in <strong>Dadar, Ballia, Uttar Pradesh</strong>, Gaurav demonstrated an early curiosity toward computing and software systems. This interest matured into a structured pursuit of computer science, full-stack engineering, practical artificial intelligence applications, and startup entrepreneurship.
            </p>
            <p>
              He is currently active as an independent engineer and the founder of <strong>Prometrion</strong>, a software company dedicated to engineering digital products, automation systems, and applied artificial intelligence software. His portfolio and technical developments are documented at his personal domain, <a href="https://www.rajnikantg.in" target="_blank" rel="noopener noreferrer" className="text-[#0645ad] hover:underline font-sans font-semibold">www.rajnikantg.in</a>.
            </p>
          </div>

          {/* 
            WIKIPEDIA TABLE OF CONTENTS:
            Iconic bordered contents box with toggle [hide] / [show]
          */}
          <nav aria-label="Table of contents" className="my-6 bg-[#f8f9fa] border border-[#a2a9b1] p-3.5 rounded-xs w-full max-w-sm text-xs clear-both">
            <div className="flex items-center justify-between pb-2 border-b border-[#c8ccd1] font-bold text-[#202122]">
              <span className="font-serif text-sm">Contents</span>
              <button 
                onClick={() => setTocHidden(!tocHidden)}
                className="text-[#0645ad] hover:underline text-[11px] font-normal cursor-pointer flex items-center gap-0.5"
              >
                [{tocHidden ? 'show' : 'hide'}]
              </button>
            </div>

            {!tocHidden && (
              <ol className="mt-2.5 space-y-1.5 text-[#0645ad] text-[11.5px] leading-snug">
                <li>
                  <button onClick={() => scrollToSection('early-life')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">1</span> Early life and computer science
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('developer-mindset')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">2</span> Independent developer and builder mindset
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('prometrion-company')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">3</span> Prometrion
                  </button>
                  <ol className="pl-4 mt-1 space-y-1 text-[11px]">
                    <li>
                      <button onClick={() => scrollToSection('prometrion-ai')} className="hover:underline cursor-pointer text-left">
                        <span className="text-[#54595d] mr-1">3.1</span> Prometrion AI
                      </button>
                    </li>
                    <li>
                      <button onClick={() => scrollToSection('multi-product')} className="hover:underline cursor-pointer text-left">
                        <span className="text-[#54595d] mr-1">3.2</span> Multi-product ecosystem architecture
                      </button>
                    </li>
                  </ol>
                </li>
                <li>
                  <button onClick={() => scrollToSection('projects-locallink')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">4</span> Product engineering: LocalLink
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('ai-exploration')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">5</span> Artificial intelligence research
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('open-source')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">6</span> Open source and developer ecosystem
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('entrepreneurship')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">7</span> Technology entrepreneurship and business strategy
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('experimentation')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">8</span> Experimentation and public building
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('vision-trajectory')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">9</span> Vision and future trajectory
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('meet-summary')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">10</span> Profile summary and company portal
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('references')} className="hover:underline cursor-pointer text-left">
                    <span className="text-[#54595d] mr-1">11</span> References and external links
                  </button>
                </li>
              </ol>
            )}
          </nav>

          {/* MAIN ARTICLE BODY - WIKIPEDIA FORMATTED */}
          <div className="mt-8 space-y-8 text-sm sm:text-[15px] text-[#202122] leading-relaxed">
            
            {/* 1. Early Life and Education */}
            <section id="early-life" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>1 Early life and computer science</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>
              
              <p>
                Rajnikant Gaurav pursued a <strong>Bachelor of Technology in Computer Science and Engineering</strong>, during which his initial curiosity toward programming evolved into a broader discipline of software engineering.
              </p>
              <p>
                Rather than treating computer science solely as an academic curriculum, Gaurav approached it as an avenue to master digital architectures and build software autonomously. Throughout his engineering studies, he gained practical proficiency across modern stacks including:
              </p>

              <div className="bg-[#f8f9fa] border border-[#c8ccd1] p-3 rounded-xs text-xs font-mono text-[#202122]">
                JavaScript • React • Node.js • Express.js • Python • PostgreSQL • Tailwind CSS • Git • REST APIs • Relational Databases • Modern Cloud Deployment
              </div>

              <p>
                He quickly shifted from passive study to active project execution, creating web applications, full-stack backends, experimental AI implementations, developer tooling, and business concepts with market viability. This transition—from absorbing technology to manufacturing solutions with it—formed the foundational core of his career.
              </p>
            </section>

            {/* 2. Independent Developer Mindset */}
            <section id="developer-mindset" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>2 Independent developer and builder mindset</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Gaurav distinguishes between the conventional definition of a programmer and that of an <strong>independent builder</strong>. While a developer writes software to specification, a builder analyzes the problem holistically by evaluating six fundamental operational questions:
              </p>

              <ol className="list-decimal pl-6 space-y-1 text-xs sm:text-sm font-medium text-[#202122]">
                <li><strong>What problem am I solving?</strong></li>
                <li><strong>Who needs the solution?</strong></li>
                <li><strong>How should the product work?</strong></li>
                <li><strong>How should it be designed?</strong></li>
                <li><strong>How will the technology scale?</strong></li>
                <li><strong>How can it become a sustainable business?</strong></li>
              </ol>

              <p>
                This mindset directed Gaurav toward the broader parameters of software commercialization, including Software-as-a-Service (SaaS), product strategy, automation, brand identity, and technology entrepreneurship.
              </p>
            </section>

            {/* 3. Prometrion */}
            <section id="prometrion-company" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>3 Prometrion</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                A central milestone in Gaurav's entrepreneurial work is the founding of <strong>Prometrion</strong>, a software company established to architect software products and modern digital solutions. Rather than developing isolated, disconnected applications, Gaurav designed Prometrion as an umbrella entity and product ecosystem capable of launching and maintaining multiple software offerings.
              </p>

              <blockquote className="border-l-4 border-[#a2a9b1] pl-4 italic text-[#54595d] my-3 py-1 bg-[#f8f9fa]">
                "Build useful technology, turn ideas into products, and create software that can grow into meaningful businesses."
              </blockquote>

              {/* 3.1 Prometrion AI */}
              <div id="prometrion-ai" className="pt-2 space-y-2">
                <h3 className="text-lg font-serif font-bold text-[#202122] border-b border-gray-200 pb-0.5">
                  3.1 Prometrion AI
                </h3>
                <p>
                  Within Prometrion's pipeline, <strong>Prometrion AI</strong> serves as the primary artificial intelligence product division. Rather than incorporating AI purely as an ancillary feature, Prometrion AI investigates machine intelligence as a core substrate for digital productivity.
                </p>
                <p>
                  Gaurav's technical experimentation under this initiative encompasses:
                </p>
                <ul className="list-disc pl-6 space-y-0.5 text-xs sm:text-sm text-[#202122]">
                  <li>Large language model (LLM) workflows and prompting architectures</li>
                  <li>Autonomous AI agentic systems and tool calling</li>
                  <li>Local model inference and on-device execution</li>
                  <li>Conversational and voice-enabled user interfaces</li>
                  <li>Developer productivity tooling and workflow automation</li>
                  <li>Intelligent, self-orchestrating business software</li>
                </ul>
              </div>

              {/* 3.2 Multi-product Architecture */}
              <div id="multi-product" className="pt-2 space-y-2">
                <h3 className="text-lg font-serif font-bold text-[#202122] border-b border-gray-200 pb-0.5">
                  3.2 Multi-product ecosystem architecture
                </h3>
                <p>
                  Prometrion operates with a multi-product holding structure:
                </p>
                
                <div className="bg-[#f8f9fa] border border-[#a2a9b1] p-3 text-xs text-center space-y-1 max-w-md mx-auto my-3">
                  <div className="font-bold text-[#202122]">Prometrion (Parent Software Company)</div>
                  <div className="text-[#54595d]">↓</div>
                  <div className="font-semibold text-[#0645ad]">Prometrion AI (Applied Machine Intelligence Product)</div>
                  <div className="text-[#54595d]">↓</div>
                  <div className="text-[#54595d] italic">Future Software Products &amp; Ecosystem Verticals</div>
                </div>

                <p>
                  This setup allows Gaurav the operational flexibility to explore diverse technological verticals while centralizing brand equity, software components, and long-term vision under a single organization.
                </p>
              </div>
            </section>

            {/* 4. Project Development: LocalLink */}
            <section id="projects-locallink" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>4 Product engineering: LocalLink</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Among Gaurav's practical full-stack projects is <strong>LocalLink</strong>, an online service marketplace platform designed to bridge local gig professionals and service providers with consumers.
              </p>
              <p>
                The platform was constructed using a stack of <strong>React, Vite, Tailwind CSS, Node.js, Express, and PostgreSQL</strong>. Key architectural capabilities engineered within the system include:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs sm:text-sm pl-4 list-disc">
                <div>• Geo-aware service discovery</div>
                <div>• Provider portfolio profiles</div>
                <div>• Appointment scheduling engine</div>
                <div>• Direct client-to-provider messaging</div>
                <div>• Real-time notification dispatch</div>
                <div>• Customer reviews and verified ratings</div>
                <div>• Role-based authentication &amp; security</div>
                <div>• Administrative management dashboard</div>
              </div>

              <p>
                LocalLink consolidated an essential lesson in Gaurav's development career: <em>building production software involves user interaction, operational security, data modeling, edge case handling, and deployment logistics far beyond routine code generation.</em>
              </p>
            </section>

            {/* 5. Artificial Intelligence Research */}
            <section id="ai-exploration" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>5 Artificial intelligence research</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Gaurav's engagement with artificial intelligence spans practical machine learning, computer vision, local model deployments, and large language model architectures. He advocates for combining traditional deterministic programming with probabilistic generative AI systems to build tools that were previously cost-prohibitive or technically infeasible for individual developers.
              </p>

              <div className="bg-[#f8f9fa] border-l-2 border-[#3366cc] p-3 text-xs sm:text-sm text-[#202122]">
                <strong>Core Focus:</strong> Software Engineering + Artificial Intelligence + Technology Entrepreneurship
              </div>
            </section>

            {/* 6. Open Source Contributions */}
            <section id="open-source" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>6 Open source and developer ecosystem</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Open-source development has provided Gaurav with real-world exposure to collaborative engineering methodologies, strict version control protocols, code auditing, issue triaging, and documentation standards. For an independent developer, open-source communities serve as a decentralized peer environment where code quality and architectural trade-offs are refined through real-world usage.
              </p>
            </section>

            {/* 7. Technology Entrepreneurship and Business Strategy */}
            <section id="entrepreneurship" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>7 Technology entrepreneurship and business strategy</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Gaurav's interests encompass the entire lifecycle of software commercialization:
              </p>

              <div className="bg-[#f8f9fa] border border-[#c8ccd1] p-2.5 text-center text-xs font-semibold text-[#54595d]">
                Research → Product Strategy → Design → Development → Deployment → Marketing → Distribution → Business
              </div>

              <p>
                His ongoing research includes SaaS pricing models, organic customer acquisition, developer ergonomics, conversion analytics, and brand development for software enterprises. In his view, software craftsmanship and entrepreneurial acumen are complementary disciplines.
              </p>
            </section>

            {/* 8. Experimentation and Public Building */}
            <section id="experimentation" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>8 Experimentation and public building</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Recognizing that not every experimental prototype succeeds in the market, Gaurav follows an iterative "building in public" approach. Every project, whether a successful utility, a failed experiment, or a technical exploratory script, produces compounding knowledge. Rather than delaying execution until all variables are solved, he builds prototypes to accelerate learning.
              </p>
            </section>

            {/* 9. Vision and Future Trajectory */}
            <section id="vision-trajectory" className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>9 Vision and future trajectory</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                The fundamental objective behind Gaurav's trajectory is attaining autonomy through technology—authoring software rather than merely consuming it, and building original companies around meaningful societal and enterprise challenges.
              </p>
              <p>
                From his birthplace in <strong>Dadar, Ballia</strong>, to studying computer science and establishing Prometrion, his work continues to evolve across software engineering, artificial intelligence, and startup operations.
              </p>
              <p className="font-serif italic text-sm sm:text-base border-t border-b border-[#a2a9b1] py-2 my-2 text-center text-[#202122]">
                "The journey is still being built—one idea, one line of code, and one product at a time."
              </p>
            </section>

            {/* 10. Profile Summary & Web Portals */}
            <section id="meet-summary" className="space-y-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>10 Profile summary and company portal</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <p>
                Rajnikant Gaurav continues his active technical work as an independent developer and founder of Prometrion. His public repositories, technical notes, and corporate updates are maintained at his verified web properties:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <a 
                  href="https://www.rajnikantg.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#f8f9fa] border border-[#a2a9b1] hover:border-[#3366cc] flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="text-[10px] text-[#54595d] uppercase tracking-wider block">Official Portfolio</span>
                    <strong className="text-[#0645ad] group-hover:underline text-sm font-sans">www.rajnikantg.in</strong>
                  </div>
                  <Globe size={16} className="text-[#54595d] group-hover:text-[#0645ad]" />
                </a>

                <a 
                  href="https://www.prometrion.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-[#f8f9fa] border border-[#a2a9b1] hover:border-[#3366cc] flex items-center justify-between transition-all group"
                >
                  <div>
                    <span className="text-[10px] text-[#54595d] uppercase tracking-wider block">Company Portal</span>
                    <strong className="text-[#0645ad] group-hover:underline text-sm font-sans">Prometrion.com</strong>
                  </div>
                  <ExternalLink size={16} className="text-[#54595d] group-hover:text-[#0645ad]" />
                </a>
              </div>
            </section>

            {/* 11. References and External Links (Wikipedia Style) */}
            <section id="references" className="space-y-3 pt-4 border-t border-[#a2a9b1]">
              <h2 className="text-xl sm:text-2xl font-serif text-[#202122] font-normal border-b border-[#a2a9b1] pb-1 flex items-baseline justify-between">
                <span>11 References and external links</span>
                <span className="text-xs font-sans text-[#0645ad] hover:underline cursor-pointer">[edit]</span>
              </h2>

              <ol className="list-decimal pl-6 space-y-1 text-xs text-[#54595d]">
                <li>
                  <span className="text-[#202122]">Personal Website:</span>{" "}
                  <a href="https://www.rajnikantg.in" target="_blank" rel="noopener noreferrer" className="text-[#0645ad] hover:underline">
                    Rajnikant Gaurav - Official Portfolio &amp; Projects
                  </a>
                </li>
                <li>
                  <span className="text-[#202122]">Corporate Registry:</span>{" "}
                  <a href="https://www.prometrion.com" target="_blank" rel="noopener noreferrer" className="text-[#0645ad] hover:underline">
                    Prometrion Software &amp; Digital Solutions
                  </a>
                </li>
                <li>
                  <span className="text-[#202122]">Biographical Registry:</span>{" "}
                  <span>Dadar, Ballia, Uttar Pradesh, India (Geo: 25.7583° N, 84.1482° E)</span>
                </li>
                <li>
                  <span className="text-[#202122]">Product Documentation:</span>{" "}
                  <span>LocalLink Full-Stack Marketplace (React, Node, Express, PostgreSQL)</span>
                </li>
                <li>
                  <span className="text-[#202122]">Initiatives:</span>{" "}
                  <span>Prometrion AI - Research into Autonomous Agents and Practical AI Tools</span>
                </li>
              </ol>
            </section>

          </div>

          {/* Wikipedia Bottom Categories Box */}
          <footer className="mt-10 pt-3 border border-[#a2a9b1] bg-[#f8f9fa] p-2.5 text-xs text-[#54595d]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-[#202122]">Categories:</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">2005 births</span>
              <span>•</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">Living people</span>
              <span>•</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">People from Ballia district</span>
              <span>•</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">Indian software developers</span>
              <span>•</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">Indian technology company founders</span>
              <span>•</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">Full-stack web developers</span>
              <span>•</span>
              <span className="text-[#0645ad] hover:underline cursor-pointer">Artificial intelligence explorers</span>
            </div>
          </footer>

          {/* Bottom Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => { setView('home'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#f8f9fa] border border-[#a2a9b1] hover:bg-[#eaecf0] text-[#202122] transition-colors font-sans text-xs font-semibold cursor-pointer shadow-xs"
            >
              <ArrowLeft size={14} />
              <span>Return to Alankarini Mehndi Art Home</span>
            </button>
          </div>

        </article>

      </div>
    </div>
  );
}
