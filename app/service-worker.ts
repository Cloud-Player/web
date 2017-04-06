declare const VERSION: string;

var g: any = global;
var cacheVersion: string = VERSION;

self.addEventListener('install', function (event: any) {
  self.skipWaiting()
  event.waitUntil(
    self.caches.open(cacheVersion).then(function (cache) {
      return cache.addAll(g.serviceWorkerOption.assets);
    })
  );
});

self.addEventListener('fetch', function (event: any) {
  var url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      self.caches.match(event.request)
        .then(
          function (response) {
            if (response) {
              return response;
            }
            return fetch(event.request);
          },
          function () {
            // Offline Fallback
          }
        )
    );
  }
});

self.addEventListener('activate', function (event: any) {
  event.waitUntil(
    self.caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheVersion) {
          return self.caches.delete(key);
        }
      }));
    })
  );
  event.waitUntil(self.clients.claim());
});

