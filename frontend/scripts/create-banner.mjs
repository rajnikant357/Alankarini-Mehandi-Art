import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

async function createBanner() {
  const width = 1200;
  const height = 630;

  const coverPath = path.join(publicDir, 'images/cover.webp');
  const coverBuffer = await sharp(coverPath)
    .resize(550, 630, { fit: 'cover', position: 'top' })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#420a0a" />
          <stop offset="50%" stop-color="#5d0e0e" />
          <stop offset="100%" stop-color="#320606" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#c5a059" stroke-width="2" rx="16" opacity="0.6" />
      
      <text x="60" y="140" font-family="serif" font-size="24" fill="#c5a059" font-weight="bold" letter-spacing="4">ALANKARINI MEHANDI ART</text>
      <text x="60" y="220" font-family="serif" font-size="46" fill="#faf3df" font-weight="bold">Professional Mehandi</text>
      <text x="60" y="275" font-family="serif" font-size="46" fill="#c5a059" font-weight="bold">Artist in Varanasi</text>
      
      <text x="60" y="350" font-family="sans-serif" font-size="20" fill="#e5d5be">&#8226; Royal Bridal Mehndi &amp; Doorstep Home Service</text>
      <text x="60" y="390" font-family="sans-serif" font-size="20" fill="#e5d5be">&#8226; Certified 35-Day Online &amp; Offline Classes</text>
      <text x="60" y="430" font-family="sans-serif" font-size="20" fill="#e5d5be">&#8226; 100% Natural Organic Henna &#8226; By Artist Sandhya</text>

      <rect x="60" y="480" width="450" height="60" rx="12" fill="#c5a059" />
      <text x="285" y="518" font-family="sans-serif" font-size="20" fill="#320606" font-weight="bold" text-anchor="middle">Call / WhatsApp: +91 9336814631</text>
    </svg>
  `);

  const baseMaroon = await sharp(svgOverlay).toBuffer();

  const outBannerPng = path.join(publicDir, 'Alankarini Banner.png');
  const outBannerWebp = path.join(publicDir, 'og-banner.webp');

  await sharp(baseMaroon)
    .composite([
      {
        input: coverBuffer,
        top: 0,
        left: 650,
      }
    ])
    .png({ quality: 90 })
    .toFile(outBannerPng);

  await sharp(outBannerPng)
    .webp({ quality: 85 })
    .toFile(outBannerWebp);

  console.log('Alankarini Banner.png and og-banner.webp generated successfully!');
}

createBanner().catch((err) => {
  console.error('Error generating banner:', err);
  process.exit(1);
});
