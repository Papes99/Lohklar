/** Auth cookies this app sets (`server.ts` advanced.cookies). */
export const AUTH_COOKIE_NAMES = [
  "__Host-grok-auth.session_token",
  "__Host-grok-auth.session_data",
  "__Host-grok-auth.account_data",
  "__Host-grok-auth.dont_remember",
] as const;

/** Expire a __Host- session cookie. No Domain — browsers reject Domain on __Host-. */
export function expireHostCookieHeader(name: string): string {
  return `${name}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`;
}
