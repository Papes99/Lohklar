import { auth } from "@/lib/auth/server";
import {
  expireHostCookieHeaderVariants,
  namesToExpire,
} from "@/lib/auth/logout-cookies";

const AFTER_LOGOUT = "/login?logout=1";

function logoutHtml(): string {
  return [
    "<!doctype html>",
    '<html lang="de">',
    "<head>",
    '<meta charset="utf-8"/>',
    '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
    '<meta name="robots" content="noindex"/>',
    `<meta http-equiv="refresh" content="0;url=${AFTER_LOGOUT}"/>`,
    "<title>Abmelden</title>",
    "<style>",
    'body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f0e8;color:#1a2420;font-family:Georgia,"Times New Roman",serif}',
    "p{margin:0;font-size:1.125rem}",
    "</style>",
    `<script>location.replace(${JSON.stringify(AFTER_LOGOUT)})</script>`,
    "</head>",
    "<body><p>Sie werden abgemeldet…</p></body>",
    "</html>",
  ].join("");
}

/**
 * Document GET logout. Fetch-based sign-out left the 5-min `session_data`
 * cookie cache (and Better Auth chunks `name.0`, `name.1`, …) in place, so
 * `/get-session` kept answering signed-in. A 200 HTML response (not 302)
 * lets the browser apply Set-Cookie + Clear-Site-Data before navigating.
 */
export async function logoutResponse(request: Request): Promise<Response> {
  try {
    await auth.api.signOut({ headers: request.headers });
  } catch {
    /* still expire cookies so the browser drops the session */
  }

  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Clear-Site-Data": '"cookies"',
    "X-Robots-Tag": "noindex",
  });
  for (const name of namesToExpire(request.headers.get("cookie"))) {
    for (const header of expireHostCookieHeaderVariants(name)) {
      headers.append("Set-Cookie", header);
    }
  }
  return new Response(logoutHtml(), { status: 200, headers });
}
