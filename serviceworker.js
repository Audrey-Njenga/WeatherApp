const cacheName = 'v2';

// Install service worker
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    


});
// Activate
self.addEventListener('activate', (e) => {
    console.log("Service Worker Activated");
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName){
                        console.log("Clearing old cache");
                        return caches.delete(cache);
                    }
                    })
            )
        })
    )
})

// Fetch event 


self.addEventListener('fetch', (e) => {
    console.log("Serviceworker fetching");
    e.respondWith(
        fetch(e.request).then(response => {
            // Clone response
            const resClone = resClone.clone();
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone)
            });
            return response;
        }).catch(err => caches.match(e.request).then(response => response))
    )
})