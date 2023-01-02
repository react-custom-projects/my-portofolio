import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// This clientsClaim() should be at the top level
// of your service worker, not inside of, e.g.,
// an event handler.
clientsClaim();

self.skipWaiting();

/*When you use injectManifest, you're responsible
for wiring up precaching logic. When injectManifest
examines your input service worker, it looks
for a special self.__WB_MANIFEST variable and
replaces it with the precache manifest (list of URLS to cache). If this
variable isn't present, injectManifest will throw an error.*/
precacheAndRoute(self.__WB_MANIFEST);

/************** cache google fonts **************/
const sheetCacheName = 'google-fonts-stylesheets',
  fontCacheName = 'google-fonts-webfonts',
  //one year
  maxAgeOneYear = 60 * 60 * 24 * 365,
  maxEntries = 30;

//cache google fonts with stale-while-revalidate strategy
/*stale-while-revalidate => means serve content from the cache
if present, and do (always) a new API to update the cache
for the next time (which means having up-to-date resources at the maximum speed)*/
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: sheetCacheName,
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
/*cache-first => means serve the content from the cache if present.
 Make an API only if the required content is not present in the cache,
 or cached content has expired. */
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: fontCacheName,
    plugins: [
      //cache successful responses only
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      //set expiration date and maximum number of entries to cache
      new ExpirationPlugin({
        maxAgeSeconds: maxAgeOneYear,
        maxEntries,
      }),
    ],
  })
);

/************** cache images **************/
const imagesCacheName = 'images',
  //one month
  maxAgeOneMonth = 60 * 60 * 24 * 30,
  imagesMaxEntries = 60;

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: imagesCacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: maxAgeOneMonth,
        maxEntries: imagesMaxEntries,
      }),
    ],
  })
);

/************** cache static resources **************/
//resources in index.html file (e.g: tailwind, bootstrap, ...etc)
/*const staticResourcesCacheName = 'static-resources';

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: staticResourcesCacheName,
  })
);*/
