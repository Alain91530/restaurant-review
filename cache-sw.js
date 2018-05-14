let filesToCache = [
  'restaurant.html',
  'index.html',
  'js/main.js',
  'js/dbhelper.js',
  'js/restaurant_info.js',
  'css/styles.css',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'img/favicon.png',
  'img/offlinemap.png',
  '/data/restaurants.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurants-cache').then(function(cache){
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    }
    else {
      // Url is not cached so we try to cache it
      return fetch(event.request)
        .then(function (response) {
        // fetch resolved we cache the url and return the response
          caches.open('restaurants-cache').then(function (cache) {
            // Don't cache google APIs fetch
            if(!(event.request.url.startsWith('https://maps.googleapis.com')||
                 event.request.url.startsWith('https://maps.gstatic.com/mapfiles')||
                 event.request.url.startsWith('https://fonts.googleapis.com'))) {
              console.log(event.request.url);
              cache.add(event.request);
            }
          });
          return response;
        })
        // Fetch return an error, we catch it and display something
        .catch(function () {
          console.log('offline');
        });
    }
  }));
});
