const CACHE_NAME = 'vipveiculos-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/veiculos',
  '/vender',
  '/sobre',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/logo_vip.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('PWA: Failed to cache some initial assets', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignora requisições não GET ou do Chrome Extension / Supabase API em tempo real
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Apenas faz cache de requisições do mesmo domínio ou estáticos
  if (url.origin === location.origin) {
    // Para navegações de página (HTML): Network first com fallback para cache
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .catch(() => caches.match(event.request).then((res) => res || caches.match('/')))
      );
      return;
    }

    // Para assets (imagens, scripts, styles): Stale-while-revalidate
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
