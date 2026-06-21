const CACHE_NAME = 'r1amobi-cache-v2'; // Mudamos para v2 para forçar a atualização nos celulares dos clientes
const assetsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e guarda os arquivos essenciais no celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Ativa o Service Worker e limpa caches antigos (deleta o v1 antigo do celular do cliente)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Motor de carregamento rápido: puxa o código novo e garante o funcionamento estável
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    }).catch(() => {
      return fetch(e.request);
    })
  );
});
