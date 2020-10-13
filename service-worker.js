const CACHE_NAME = "port-v8";
var urlsToCache = [
    "/",
    "/nav.html",
    "/manifest.json",
    "/index.html",
    "/pages/home.html",
    "/pages/track.html",
    "/pages/skill.html",
    "/pages/contact.html",
    "/img/pp.png",
    "/img/192.png",
    "/img/512.png",
    "/img/ppkapps.png",
    "/img/sukaderma.png",
    "/img/instruksi.jpg",
    "/img/akun.jpg",
    "/css/materialize.min.css",
    "/css/font-awesome.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdn.materialdesignicons.com/5.6.55/fonts/materialdesignicons-webfont.woff2?v=5.6.55",
    "https://cdn.materialdesignicons.com/5.6.55/fonts/materialdesignicons-webfont.woff?v=5.6.55",
    "https://cdn.materialdesignicons.com/5.6.55/fonts/materialdesignicons-webfont.ttf?v=5.6.55",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://cdn.materialdesignicons.com/5.6.55/css/materialdesignicons.min.css"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});