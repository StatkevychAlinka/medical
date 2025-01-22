/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

if (!self.define) {
  let registry = {};
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      new Promise(resolve => {
        if ("document" in self) {
          const script = document.createElement("script");
          script.src = uri;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          nextDefineUri = uri;
          importScripts(uri);
          resolve();
        }
      }).then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}

define(['./workbox-e43f5367'], (function (workbox) {
  'use strict';

  // Activate new service worker immediately after installation
  self.skipWaiting();
  workbox.clientsClaim();

  // Precache important assets
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/styles.css', revision: '1' },
    { url: '/script.js', revision: '1' },
    { url: '/icon-192x192.png', revision: '1' },
    { url: '/icon-512x512.png', revision: '1' },
    { url: '/offline.html', revision: '1' }
  ]);

  // Cache the start URL with NetworkFirst strategy
  workbox.routing.registerRoute(
    '/',
    new workbox.strategies.NetworkFirst({
      cacheName: 'start-url',
      plugins: [{
        cacheWillUpdate: async ({ response }) => {
          if (response && response.type === 'opaqueredirect') {
            return new Response(response.body, {
              status: 200,
              statusText: 'OK',
              headers: response.headers
            });
          }
          return response;
        }
      }]
    }),
    'GET'
  );

  // Cache static resources with CacheFirst strategy
  workbox.routing.registerRoute(
    /\.(?:js|css|html|png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'static-resources',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        })
      ]
    })
  );

  // Fallback to offline page for navigation requests when offline
  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === 'document') {
      return caches.match('/offline.html');
    }
    return Response.error();
  });

  // Clear old caches on activation
  self.addEventListener('activate', event => {
    const cacheWhitelist = ['start-url', 'static-resources'];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
}));
