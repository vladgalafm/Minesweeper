const APP_PREFIX = 'hv-mines_';
const VERSION = 'v0.5.5';
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
    '/Minesweeper/',
    '/Minesweeper/index.html'
];
let needUpdate = false;

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
    needUpdate = true;
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
        }).then(function() {
            console.debug('Should we reload the page?');
            if (needUpdate) {
                console.debug('Yes we should');
                location.reload();
            }
        })
    )
});