declare const VERSION: string;

var g: any = global;
var cacheVersion: string = VERSION;
var externalDomainWhiteList = [
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com'
];

self.addEventListener('install', function (event: any) {
  self.skipWaiting();
  event.waitUntil(
    self.caches.open(cacheVersion).then(function (cache) {
      return cache.addAll(g.serviceWorkerOption.assets);
    })
  );
});

self.addEventListener('fetch', function (event: any) {
  var url = new URL(event.request.url);
  if (url.origin === location.origin || externalDomainWhiteList.indexOf(url.origin) !== -1) {
    event.respondWith(
      self.caches.match(event.request)
        .then(
          function (response) {
            if (response) {
              return response;
            }
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function (response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                var responseToCache = response.clone();

                self.caches.open(cacheVersion)
                  .then(function (cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
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

