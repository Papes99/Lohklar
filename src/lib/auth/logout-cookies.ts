/** Auth cookies this app sets (`server.ts` advanced.cookies). */
export const AUTH_COOKIE_NAMES = [
  "__Host-grok-auth.session_token",
  "__Host-grok-auth.session_data",
  "__Host-grok-auth.account_data",
  "__Host-grok-auth.dont_remember",
  "__Host-grok_gate_session",
] as const;

const AUTH_COOKIE_PREFIXES = [
  "__Host-grok-auth.",
  "__Secure-grok-auth.",
  "grok-auth.",
  "__Host-grok_gate_session",
] as const;

/**
 * Better Auth splits oversized cookies (`session_data`, `account_data`) into
 * `name.0`, `name.1`, … Safari's ~4 KB ceiling is the limit. Speculative expiry
 * covers truncated Cookie headers.
 */
export const AUTH_COOKIE_CHUNK_COUNT = 20;

const CHUNKED_COOKIE_BASES = [
  "__Host-grok-auth.session_token",
  "__Host-grok-auth.session_data",
  "__Host-grok-auth.account_data",
] as const;

const EXPIRES_PAST = "Thu, 01 Jan 1970 00:00:00 GMT";

export function isAuthCookieName(name: string): boolean {
  return AUTH_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix));
}

/** Expire a __Host- session cookie. No Domain — browsers reject Domain on __Host-. */
export function expireHostCookieHeader(name: string): string {
  return `${name}=; Max-Age=0; Expires=${EXPIRES_PAST}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

/**
 * HttpOnly and non-HttpOnly variants: a mismatch would create a shadow cookie
 * instead of deleting the live one (Safari / Chrome cookie jars).
 */
export function expireHostCookieHeaderVariants(name: string): string[] {
  const common = `${name}=; Max-Age=0; Expires=${EXPIRES_PAST}; Path=/; Secure; SameSite=Lax`;
  return [`${common}; HttpOnly`, common];
}

export function namesToExpire(cookieHeader?: string | null): string[] {
  const names = new Set<string>(AUTH_COOKIE_NAMES);
  for (const base of CHUNKED_COOKIE_BASES) {
    const count = base.endsWith("session_token") ? 5 : AUTH_COOKIE_CHUNK_COUNT;
    for (let i = 0; i < count; i++) names.add(`${base}.${i}`);
  }
  if (cookieHeader) {
    for (const part of cookieHeader.split(";")) {
      const name = part.trim().split("=")[0]?.trim();
      if (name && isAuthCookieName(name)) names.add(name);
    }
  }
  return [...names];
}
