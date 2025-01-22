/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
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
      })
      .then(() => {
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

define(['./workbox-e43f5367'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();

  // Регистрация маршрута для корня (start-url)
  workbox.registerRoute(
    "/",
    new workbox.NetworkFirst({
      cacheName: "start-url",
      plugins: [{
        cacheWillUpdate: async ({ request, response, event, state }) => {
          // Обработка редиректов и возвращение правильного ответа
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

  // Стратегия кэширования для всех остальных запросов (например, статика, изображения)
  workbox.registerRoute(
    /.*\.(html|json|js|css)/i,
    new workbox.StaleWhileRevalidate({
      cacheName: "dynamic-cache",
      plugins: [
        {
          cacheDidUpdate: async ({ cacheName, request, oldResponse, newResponse }) => {
            if (newResponse && newResponse.ok) {
              console.log(`Cache updated for: ${request.url}`);
            }
          }
        }
      ]
    }),
    'GET'
  );

  // Стратегия для кэширования изображений
  workbox.registerRoute(
    /.*\.(png|jpg|jpeg|gif|svg|ico|webp)/i,
    new workbox.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        {
          cacheWillUpdate: async ({ response }) => {
            // Проверка на ошибку 404 и обработка изображения
            if (response && response.status === 404) {
              return new Response('Image not found', { status: 404 });
            }
            return response;
          }
        }
      ]
    }),
    'GET'
  );

  // Стратегия для обработки других ресурсов (например, PDF, XML)
  workbox.registerRoute(
    /.*\.(pdf|xml|txt)/i,
    new workbox.NetworkOnly({
      cacheName: "network-only-cache",
      plugins: []
    }),
    'GET'
  );

  // Стратегия для кэширования всех других ресурсов через NetworkOnly
  workbox.registerRoute(
    /.*/i,
    new workbox.NetworkOnly({
      cacheName: "dev",
      plugins: []
    }),
    'GET'
  );

}));
