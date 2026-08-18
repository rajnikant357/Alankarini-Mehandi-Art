import 'dotenv/config';

function parseOriginList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function matchesOrigin(pattern: string, origin: string): boolean {
  if (pattern === '*') {
    return true;
  }

  if (!pattern.includes('*')) {
    return pattern === origin;
  }

  const escaped = pattern
    .split('*')
    .map((segment) => segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('.*');

  return new RegExp(`^${escaped}$`, 'i').test(origin);
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigins: parseOriginList(process.env.CORS_ORIGIN),
  supabaseUrl: process.env.SUPABASE_URL ?? '',
  supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY ?? '',
  supabaseSecretKey: process.env.SUPABASE_SECRET_KEY ?? '',
  supabaseJwksUrl: process.env.SUPABASE_JWKS_URL ?? '',
};

const DEFAULT_ALLOWED_ORIGINS = [
  'https://alankarini-mehandi-art.vercel.app',
  'https://*.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

export function getAllowedCorsOrigin(requestOrigin: string | undefined): string | undefined {
  if (!requestOrigin) {
    return undefined;
  }

  const allowedOrigins = [...env.corsOrigins, ...DEFAULT_ALLOWED_ORIGINS];
  return allowedOrigins.find((pattern) => matchesOrigin(pattern, requestOrigin));
}
