const APP_PREFIX = 'hv-mines_';
const VERSION = 'v0.5.1';
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
    '/Minesweeper/',
    '/Minesweeper/index.html'
];

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                return request;
            } else {
                return fetch(e.request);
            }
        })
    )
});

// Cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(URLS);
        })
    )
});

// Delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            const cacheWhitelist = keyList.filter(function(key) {
                return key.indexOf(APP_PREFIX);
            });

            cacheWhitelist.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(keyList[i]);
                }
            }))
        })
    )
});