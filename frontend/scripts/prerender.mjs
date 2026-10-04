import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import React from 'react';
import { renderToString } from 'react-dom/server';

const rootDir = path.resolve('.');
const distHtmlPath = path.resolve('dist/index.html');
const ssrOutDir = path.resolve('dist-ssr');

async function prerender() {
  console.log('1. Building SSR bundle...');
  execSync('npx vite build --ssr src/App.tsx --outDir dist-ssr', {
    stdio: 'inherit',
    cwd: rootDir,
  });

  console.log('2. Rendering static HTML with renderToString...');
  const appModulePath = path.resolve('dist-ssr/App.js');
  const { default: App } = await import(`file://${appModulePath}?t=${Date.now()}`);
  const renderedHtml = renderToString(React.createElement(App));
  console.log(`Rendered HTML length: ${renderedHtml.length} characters`);

  console.log('3. Injecting prerendered HTML into dist/index.html...');
  let template = fs.readFileSync(distHtmlPath, 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    console.warn('Warning: <div id="root"></div> not found as empty container. Checking for existing content...');
    template = template.replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>');
  }

  const output = template.replace('<div id="root"></div>', `<div id="root">${renderedHtml}</div>`);
  fs.writeFileSync(distHtmlPath, output, 'utf8');
  console.log('Successfully injected prerendered HTML into dist/index.html!');

  // Cleanup dist-ssr
  if (fs.existsSync(ssrOutDir)) {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
    console.log('Cleaned up dist-ssr.');
  }

  console.log('Prerender complete!');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
