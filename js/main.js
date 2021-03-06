/**
 * Global vars
 */
let restaurants;
let neighborhoods;
let cuisines;
var map;
var markers = [];

/**
 * Set a title to map iframe as per aria specs
 */
function fixMapAria() {
  document.querySelector('iframe').title='map of the area';
}

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 * and set events to detect if online or offline to render or not google
 * map.
 */
document.addEventListener('DOMContentLoaded', () => {
/*  window.addEventListener('offline', () => {location.reload()});
  window.addEventListener('online', () => {location.reload()}); */
  /*
 * Register the service worker
 */

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('cache-sw.js')
      .then(function() {
        console.log('Registration worked!');
      })
      .catch(function() {
        console.log('Registration failed!');
      });
  }
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  select.setAttribute('title', 'choose your place');
  select.setAttribute('aria-label', 'choose your place');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
};

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');
  select.setAttribute('title', 'choose your cuisine');
  select.setAttribute('aria-label', 'choose your cuisine');
  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  // Invoke Google map only if online
  if (navigator.onLine) {
    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: loc,
      scrollwheel: false
    });
    google.maps.event.addListenerOnce(map, 'tilesloaded', fixMapAria);
  }
  else {
    document.getElementById('map').innerHTML='<h2 class="offlinemap">Offline map only</h2>';
  }
  updateRestaurants();
};

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
};

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.tabIndex = 0;
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = `${restaurant.name}: ${restaurant.altPhoto}`;
  li.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  neighborhood.tabIndex = 0;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  address.tabIndex = 0;
  li.append(address);

  const more = document.createElement('a');
  more.innerHTML = 'View Details';
  more.href = DBHelper.urlForRestaurant(restaurant);

  /**
   *  change the text of the link for focus to be more explicit.
   */
  more.setAttribute('aria-label', `View details for ${restaurant.name}`);

  li.append(more);

  return li;
};

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  // Invoke Google map only if online
  if (navigator.onLine) {
    restaurants.forEach(restaurant => {
    // Add marker to the map
      const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
      google.maps.event.addListener(marker, 'click', () => {
        window.location.href = marker.url;
      });
      self.markers.push(marker);
    });
  }
};
