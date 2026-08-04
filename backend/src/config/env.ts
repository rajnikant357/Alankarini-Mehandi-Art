import 'dotenv/config';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

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

export function getDatabaseUrl(): string {
  return requiredEnv('DATABASE_URL');
}

export function getAllowedCorsOrigin(requestOrigin: string | undefined): string | undefined {
  if (!requestOrigin) {
    return undefined;
  }

  const allowedOrigins = env.corsOrigins.length ? env.corsOrigins : ['http://localhost:3000'];
  return allowedOrigins.find((pattern) => matchesOrigin(pattern, requestOrigin));
}
