importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(event) {
    // pre cache a load of stuff:
    event.waitUntil(
        cachesPolyfill.open('myapp-static-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/styles/all.css',
                '/styles/imgs/bg.png',
                '/scripts/all.js'
            ]);
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        cachesPolyfill.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});