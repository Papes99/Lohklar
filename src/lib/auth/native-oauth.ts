/**
 * Direct Google / X sign-in for the published app (Julian's Vercel).
 *
 * The Grok broker (`grok_preview`) only accepts `*.grok-sandbox.com` callbacks.
 * After the move off Grok-Publish, production would start Google with that
 * preview client and then fail on the way back to lohklar.de.
 *
 * Set in Vercel (Production), never in Git:
 *   GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
 *   Redirect: https://lohklar.de/api/auth/callback/google
 *   Origin:   https://lohklar.de
 * Optional X:
 *   TWITTER_CLIENT_ID / TWITTER_CLIENT_SECRET
 *   Redirect: https://lohklar.de/api/auth/callback/twitter
 */
function env(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

export type NativeSocialProviders = {
  google?: { clientId: string; clientSecret: string };
  twitter?: { clientId: string; clientSecret: string };
};

export function nativeSocialProviders(): NativeSocialProviders | undefined {
  const googleId = env("GOOGLE_CLIENT_ID");
  const googleSecret = env("GOOGLE_CLIENT_SECRET");
  const twitterId = env("TWITTER_CLIENT_ID") ?? env("X_CLIENT_ID");
  const twitterSecret = env("TWITTER_CLIENT_SECRET") ?? env("X_CLIENT_SECRET");

  const providers: NativeSocialProviders = {};
  if (googleId && googleSecret) {
    providers.google = { clientId: googleId, clientSecret: googleSecret };
  }
  if (twitterId && twitterSecret) {
    providers.twitter = { clientId: twitterId, clientSecret: twitterSecret };
  }
  return Object.keys(providers).length > 0 ? providers : undefined;
}

/** Preview broker client is only valid on grok-sandbox hosts, not lohklar.de. */
export function useGrokPreviewBroker(): boolean {
  return !env("GROK_AUTH_CLIENT_ID") && !env("DATABASE_URL");
}
