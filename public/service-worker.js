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
     return cache.addAll([
       '/', 
       '/index.html',
       '/manifest.json',
     ]);
   })
 );
});

self.addEventListener('fetch', (event) => {
 // Ignore chrome-extension:// and other non-http(s) requests
 if (!event.request.url.startsWith('http') || 
     event.request.url.startsWith('chrome-extension://')) {
   return;
 }

 // Strip off query parameters for matching cache
 const url = new URL(event.request.url);
 const urlWithoutParams = `${url.origin}${url.pathname}`;

 event.respondWith(
   caches.match(urlWithoutParams).then((response) => {
     if (response) {
       return response;
     }

     const fetchRequest = event.request.clone();

     return fetch(fetchRequest).then((response) => {
       if (!response || response.status !== 200 || response.type !== 'basic') {
         return response;
       }

       const shouldCache = filePattern.test(url.pathname);

       if (shouldCache) {
         const responseToCache = response.clone();

         caches.open(CACHE_NAME).then((cache) => {
           cache.put(urlWithoutParams, responseToCache).catch(err => {
             console.error('Failed to cache the response:', err);
           });
         });
       }

       return response;
     }).catch(err => {
       console.error('Fetch failed:', err);
       throw err;
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