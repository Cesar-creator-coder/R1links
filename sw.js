const CACHE_NAME = 'r1amobi-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/rpmHFjBL/file-0000000067d8720e8c1a5a8dc1ba4445-2.jpg',
  'https://i.postimg.cc/wT09x32h/IMG-20260607-WA0004.jpg'
];

// Instala o Service Worker e guarda os arquivos essenciais no celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Ativa o Service Worker e limpa caches antigos se houverem
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Responde às requisições puxando do cache quando estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});