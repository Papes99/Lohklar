import { auth } from "@/lib/auth/server";
import { AUTH_COOKIE_NAMES, expireHostCookieHeader } from "@/lib/auth/logout-cookies";

function safeNext(raw: string | null): string {
  if (!raw) return "/login";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) return "/login";
  return raw;
}

/**
 * Top-level GET logout: delete the session, expire cookies on the document
 * response, redirect to /login. Fetch-based sign-out can leave session_data
 * (cookie cache) in place; a navigation always applies Set-Cookie.
 */
export async function logoutResponse(request: Request): Promise<Response> {
  try {
    await auth.api.signOut({ headers: request.headers });
  } catch {
    /* still expire cookies so the browser drops the session */
  }

  const dest = safeNext(new URL(request.url).searchParams.get("next"));
  const headers = new Headers({
    Location: dest,
    "Cache-Control": "no-store",
  });
  for (const name of AUTH_COOKIE_NAMES) {
    headers.append("Set-Cookie", expireHostCookieHeader(name));
  }
  return new Response(null, { status: 302, headers });
}