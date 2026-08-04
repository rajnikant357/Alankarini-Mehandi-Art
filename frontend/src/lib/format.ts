export function formatRupeeAmount(value?: string | null): string | undefined {
  if (value == null) return undefined;

  const trimmed = String(value).trim();
  if (!trimmed) return undefined;

  const digitsOnly = trimmed.replace(/[^\d]/g, '');
  const normalized = digitsOnly || trimmed;

  return `Starting from ₹${normalized}`;
}

export function extractRupeeAmount(value?: string | null): string {
  if (value == null) return '';
  return String(value).replace(/^[^\d]*₹?\s*/u, '').trim();
}
