const CACHE = "ambumaps-v7";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png", "./gps.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
// Réseau d'abord, en redemandant toujours au serveur s'il y a du nouveau (sinon le téléphone
// garde jusqu'à 10 min l'ancienne version) ; copie locale si pas de connexion.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(res => {
      if (res.ok) {
        const copy = res.clone(), u = new URL(req.url);
        // une seule copie par fichier : on efface les anciennes versions (gps.js?v=…)
        caches.open(CACHE).then(c => c.keys().then(ks => Promise.all(ks.filter(k => { const v = new URL(k.url); return v.pathname === u.pathname && v.search !== u.search; }).map(k => c.delete(k)))).then(() => c.put(req, copy)));
      }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: req.mode === "navigate" }).then(r => r || caches.match("./index.html")))
  );
});
