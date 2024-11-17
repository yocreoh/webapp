/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'v0.1';

// Add any additional file extensions you want to cache
const fileExtensionsToCache = [
  'html', 'js', 'css', 'json', 
  'png', 'jpg', 'jpeg', 'gif', 'svg', 
  'woff', 'woff2', 'ttf', 'eot'
];

// Create regex pattern for file extensions
const filePattern = new RegExp(`\\.(${fileExtensionsToCache.join('|')})$`);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache all files matching our pattern
      return cache.addAll([
        '/', // Cache the root path
        '/index.html',
        '/manifest.json',
        // The service worker will automatically cache other files as they're requested
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if available
      if (response) {
        return response;
      }

      // Clone the request because it can only be used once
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Should we cache this file?
        const url = new URL(event.request.url);
        const shouldCache = filePattern.test(url.pathname);

        if (shouldCache) {
          // Clone the response because it can only be used once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      });
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});