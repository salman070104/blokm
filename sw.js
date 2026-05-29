const CACHE_NAME = 'blokm-studio-cache-v2';

// Aset yang akan di-pre-cache agar website bisa dibuka secara instan dan offline
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './tentang.html',
  './kontak.html',
  './team.html',
  './paket.html',
  './gallery.html',
  './style.css',
  './gallery-style.css',
  './script.js',
  './gallery-script.js',
  './navbar-scroll.js',
  './assets/logopovicon.png',
  './assets/logo-white.png',
  './assets/foto-studio-bg.png',
  './assets/wedding-album-bg.png',
  './assets/prewedding-album-bg.png',
  './assets/album-sekolah-bg.png',
  './assets/video-kelulusan-bg.png',
  './assets/cetak-foto-bg.png',
  './assets/crew.jpg'
];

// 1. Install Event: Mendownload dan menyimpan semua aset penting ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching core assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Memaksa SW baru langsung aktif
  );
});

// 2. Activate Event: Menghapus cache versi lama secara otomatis ketika SW diupdate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Langsung mengontrol semua halaman aktif
  );
});

// 3. Fetch Event: Strategi Caching yang pintar
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Jangan cache request dari external API atau ekstensi browser
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // A. Strategi Cache-First untuk GAMBAR (karena gambar berukuran besar & jarang berubah)
  if (event.request.destination === 'image' || requestUrl.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Load instan dari cache
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
          }
          return networkResponse;
        });
      })
    );
  } 
  // B. Strategi Stale-While-Revalidate untuk HTML, CSS, JS
  // Mengembalikan cache instan terlebih dahulu, lalu mengupdate cache di background jika ada perubahan di server
  else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const networkFetch = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
          }
          return networkResponse;
        }).catch(() => {
          // Fallback jika offline dan cache tidak ditemukan
          return cachedResponse;
        });

        return cachedResponse || networkFetch;
      })
    );
  }
});
