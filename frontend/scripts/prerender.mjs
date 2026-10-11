import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import React from 'react';
import { renderToString } from 'react-dom/server';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(scriptDir, '..');
const distDir = path.resolve(frontendDir, 'dist');
const baseTemplatePath = path.resolve(distDir, 'index.html');
const ssrOutDir = path.resolve(frontendDir, 'dist-ssr');

function escapeAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const routes = [
  { path: '/', view: 'home', file: 'index.html' },
  { path: '/classes', view: 'classes', file: 'classes/index.html' },
  { path: '/services', view: 'services', file: 'services/index.html' },
  { path: '/gallery', view: 'gallery', file: 'gallery/index.html' },
  { path: '/about', view: 'about', file: 'about/index.html' },
  { path: '/contact', view: 'contact', file: 'contact/index.html' },
  { path: '/guide', view: 'guide', file: 'guide/index.html' },
  { path: '/blog', view: 'blog', file: 'blog/index.html' },
  { path: '/blog/bridal-mehndi-artist-varanasi', view: 'blog:bridal-mehndi-artist-varanasi', file: 'blog/bridal-mehndi-artist-varanasi/index.html' },
  { path: '/blog/latest-bridal-mehndi-designs', view: 'blog:latest-bridal-mehndi-designs', file: 'blog/latest-bridal-mehndi-designs/index.html' },
  { path: '/blog/mehndi-classes-varanasi-guide', view: 'blog:mehndi-classes-varanasi-guide', file: 'blog/mehndi-classes-varanasi-guide/index.html' },
  { path: '/blog/arabic-mehndi-designs-guide', view: 'blog:arabic-mehndi-designs-guide', file: 'blog/arabic-mehndi-designs-guide/index.html' },
  { path: '/blog/bridal-mehndi-appointment-preparation', view: 'blog:bridal-mehndi-appointment-preparation', file: 'blog/bridal-mehndi-appointment-preparation/index.html' },
  { path: '/blog/rajnikant-gaurav', view: 'blog:rajnikant-gaurav', file: 'blog/rajnikant-gaurav/index.html' },
];

async function prerender() {
  console.log('--- Phase 1: Building SSR Bundle ---');
  execSync('npx vite build --ssr src/ssr-entry.tsx --outDir dist-ssr', {
    stdio: 'inherit',
    cwd: frontendDir,
  });

  console.log('\n--- Phase 2: Loading SSR Module ---');
  const entryPath = path.resolve(ssrOutDir, 'ssr-entry.js');
  const fileUrl = `file:///${entryPath.replace(/\\/g, '/')}?t=${Date.now()}`;
  const { App, SEO_ROUTES } = await import(fileUrl);

  if (!fs.existsSync(baseTemplatePath)) {
    throw new Error(`Base template not found at ${baseTemplatePath}. Run 'vite build' first.`);
  }

  const rawBaseTemplate = fs.readFileSync(baseTemplatePath, 'utf8');

  console.log('\n--- Phase 3: Prerendering All 8 Canonical Routes ---');
  for (const route of routes) {
    const seo = SEO_ROUTES[route.view];
    if (!seo) {
      console.warn(`Warning: No SEO route config found for view "${route.view}". Skipping.`);
      continue;
    }

    console.log(`Prerendering route [${route.path}] (view: ${route.view}) -> ${route.file}...`);

    // Render React component tree to HTML string
    const renderedApp = renderToString(React.createElement(App, { initialView: route.view }));

    // Start with raw template
    let html = rawBaseTemplate;

    // 1. Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

    // 2. Replace Canonical URL
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${seo.canonical}" />`);
    } else {
      html = html.replace('</head>', `  <link rel="canonical" href="${seo.canonical}" />\n</head>`);
    }

    // 3. Replace Meta Description
    html = html.replace(
      /<meta name="description"[^>]*>/i,
      `<meta name="description" content="${escapeAttr(seo.description)}" />`
    );

    // 4. Replace Open Graph Tags
    html = html.replace(
      /<meta property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${escapeAttr(seo.ogTitle)}" />`
    );
    html = html.replace(
      /<meta property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${escapeAttr(seo.ogDescription)}" />`
    );
    html = html.replace(
      /<meta property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`
    );
    html = html.replace(
      /<meta property="og:image"[^>]*>/i,
      `<meta property="og:image" content="${escapeAttr(seo.ogImage)}" />`
    );
    html = html.replace(
      /<meta property="og:type"[^>]*>/i,
      `<meta property="og:type" content="${escapeAttr(seo.ogType)}" />`
    );

    // 5. Replace Twitter Card Tags
    html = html.replace(
      /<meta name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${escapeAttr(seo.twitterTitle)}" />`
    );
    html = html.replace(
      /<meta name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${escapeAttr(seo.twitterDescription)}" />`
    );
    html = html.replace(
      /<meta name="twitter:image"[^>]*>/i,
      `<meta name="twitter:image" content="${escapeAttr(seo.twitterImage)}" />`
    );

    // 6. Clean up existing schema scripts & comments, then inject route-specific JSON-LD schemas
    html = html.replace(/<!--\s*Schema\.org JSON-LD Structured Data:[^>]*-->\s*/gi, '');
    html = html.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '');
    const schemaBlocks = (seo.structuredData || [])
      .map(data => `    <script type="application/ld+json" data-seo-jsonld="true">\n    ${JSON.stringify(data, null, 2).replace(/\n/g, '\n    ')}\n    </script>`)
      .join('\n');
    html = html.replace('</head>', `${schemaBlocks}\n  </head>`);

    // 7. Inject prerendered markup into root div
    html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${renderedApp}</div>`);

    // 8. Write file to dist
    const targetFilePath = path.resolve(distDir, route.file);
    fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
    fs.writeFileSync(targetFilePath, html, 'utf8');

    console.log(`  ✓ Written ${targetFilePath} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  // Cleanup dist-ssr
  if (fs.existsSync(ssrOutDir)) {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
    console.log('\n--- Cleaned up dist-ssr temporary build directory ---');
  }

  console.log('\n✅ All routes successfully prerendered with unique metadata & schemas!');
}

prerender().catch((err) => {
  console.error('Prerender failed with error:', err);
  process.exit(1);
});
