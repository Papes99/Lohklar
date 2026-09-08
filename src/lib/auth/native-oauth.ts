/**
 * Direct Google sign-in for the published app (Julian's Vercel).
 *
 * Production does not use the Grok broker. Set in Vercel, never in Git:
 *   GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
 *   Redirect: https://lohklar.de/api/auth/callback/google
 *   Origin:   https://lohklar.de
 * Dev optional: http://localhost:8080/api/auth/callback/google
 *
 * Live preview (`*.grok-sandbox.com`) still uses the shared broker client
 * in `preview.ts`. Production must never fall back to `grok_preview`.
 */
function env(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

export type NativeSocialProviders = {
  google: { clientId: string; clientSecret: string };
};

export function nativeSocialProviders(): NativeSocialProviders | undefined {
  const googleId = env("GOOGLE_CLIENT_ID");
  const googleSecret = env("GOOGLE_CLIENT_SECRET");
  if (!googleId || !googleSecret) return undefined;
  return { google: { clientId: googleId, clientSecret: googleSecret } };
}

/** Google button: sandbox broker, or Production when GOOGLE_* is set. Never X. */
export function socialSignInAvailable(): { google: boolean } {
  if (useGrokPreviewBroker()) return { google: true };
  return { google: Boolean(nativeSocialProviders()?.google) };
}

/** Preview broker is only valid on grok-sandbox hosts, not lohklar.de. */
export function useGrokPreviewBroker(): boolean {
  return !env("DATABASE_URL");
}
