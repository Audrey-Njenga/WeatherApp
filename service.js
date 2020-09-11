const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'css/style.css',
    'js/app.js'
];

// Install service worker
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("Caching files");
                cache.addAll(cacheAssets);
            }).then(
                () => self.skipWaiting()
            )
    );
});


// Activate
self.addEventListener('activate', (e) => {
    console.log("Service Worker Activated");
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        console.log("Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// Fetch event 
self.addEventListener('fetch', (e)=>{
    console.log("Serviceworker fetching");
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})