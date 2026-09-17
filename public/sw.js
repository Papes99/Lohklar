/* Lohklar service worker.
 * App-Shell / statische Dateien cachen.
 * Auth, API, Logout und update.json niemals anfassen.
 */
const CACHE = "lohklar-shell-v2";
const PRECACHE = ["/manifest.webmanifest", "/favicon.svg"];

function isNetworkOnly(url) {
  const path = url.pathname;
  return (
    path.startsWith("/api/") ||
    path.startsWith("/logout") ||
    path.startsWith("/auth/") ||
    path === "/update.json" ||
    path.startsWith("/__grok/")
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (isNetworkOnly(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/")));
    return;
  }

  const staticAsset = /\.(?:js|css|svg|png|jpg|jpeg|webp|woff2)$/i.test(url.pathname);
  if (!staticAsset && url.pathname !== "/manifest.webmanifest") return;

  event.respondWith(
    caches.match(request).then((hit) => {
      if (hit) return hit;
      return fetch(request).then((response) => {
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          void caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
