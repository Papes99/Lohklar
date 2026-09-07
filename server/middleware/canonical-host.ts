/**
 * Apex is the session host (`__Host-` cookies do not share across www).
 * www.lohklar.de → https://lohklar.de so login and print land on one origin.
 * TLS for www is issued by the platform once the domain is attached.
 */
interface HostEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

function requestHost(event: HostEvent): string {
  const raw =
    event.req.headers.get("x-forwarded-host") ??
    event.req.headers.get("host") ??
    event.url.host;
  return raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
}

export default function canonicalHost(
  event: HostEvent,
  next: () => unknown | Promise<unknown>,
): unknown | Promise<unknown> {
  if (requestHost(event) !== "www.lohklar.de") return next();
  const target = new URL(event.url);
  target.protocol = "https:";
  target.host = "lohklar.de";
  return new Response(null, {
    status: 308,
    headers: { location: target.toString() },
  });
}
