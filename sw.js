
const SW_VERSION = 'v1';
const CACHE_NAME = `idle-factory-cache-${SW_VERSION}`;
const APP_SHELL_URLS = [
  '/',
  'index.html',
  'icon.svg',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching App Shell');
        return cache.addAll(APP_SHELL_URLS);
      })
      .then(() => self.skipWaiting()) // Force the waiting service worker to become the active service worker.
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Become the service worker for all open tabs.
  );
});

self.addEventListener('fetch', event => {
  // For navigation requests (e.g., loading the page), use a network-first strategy.
  // This ensures users always get the latest version of the main page if they are online.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('index.html'))
    );
    return;
  }

  // For all other requests (JS, CSS, images, etc.), use a cache-first strategy.
  // This makes the app load fast and work offline.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the resource is in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network.
        return fetch(event.request).then(fetchResponse => {
          // And cache the new resource for next time.
          return caches.open(CACHE_NAME).then(cache => {
            // Check for valid response to cache. Opaque responses are from CDNs without CORS.
            if (fetchResponse.status === 200 || fetchResponse.type === 'opaque') {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
  );
});
