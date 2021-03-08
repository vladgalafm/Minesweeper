const APP_PREFIX = 'hv-mines_';
const VERSION = 'v0.6.2';
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
    '/Minesweeper/',
    '/Minesweeper/index.html',
    '/Minesweeper/update.html',
    '/Minesweeper/offline.html'
];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                return request;

            } else if (!/vladgalafm\.github\.io/.test(e.request.url)) {
                return fetch(e.request).catch(function (error) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        return cache.match('/Minesweeper/offline.html');
                    })
                });

            } else {
                return fetch(e.request).then(function(response) {
                    if (response.status === 200) {
                        caches.open(CACHE_NAME).then(function (cache) {
                            return cache.add(response.url.replace(location.origin, ''));
                        });
                        return response;

                    } else if (response.status === 404) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            return cache.match('/Minesweeper/update.html');
                        })
                    }

                    return response;
                });
            }
        })
    )
});

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS);
        }).then(self.skipWaiting())
    )
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            const cacheWhitelist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX) > -1;
            });

            cacheWhitelist.push(CACHE_NAME);

            return Promise.all(cacheWhitelist.map(function (key, i) {
                if (key !== CACHE_NAME) {
                    return caches.delete(keyList[i]);
                }
            }))
        })
    )
});

// force new service worker installation
self.addEventListener('message', ev => {
    if (ev.data === 'skipWaiting') return self.skipWaiting();
});