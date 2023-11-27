/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
const urlParams = new URLSearchParams(location.search);
const RMD_ver = urlParams.get('ver');
const version = urlParams.get('ver');
const revision = urlParams.get('revision');
const cacheName = `rdmgAPP-${version}`;

importScripts('assets/vendors/workbox-v5.1.4/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.setConfig({
  debug: false,
});

workbox.precaching.precacheAndRoute([
  {url: '/?utm_source=web_app_manifest', revision: null},
  {url: 'assets/bundle/css/proktor.bundle.'+RMD_ver+'.min.css?'+revision, revision: null},
  {url: 'assets/bundle/js/proktor.bundle.'+RMD_ver+'.min.js?'+revision, revision: null},
  {url: 'assets/bundle/js/ng-proktor.bundle.'+RMD_ver+'.min.js?'+revision, revision: null},
  {url: 'assets/bundle/css/guru.bundle.'+RMD_ver+'.min.css?'+revision, revision: null},
  {url: 'assets/bundle/js/guru.bundle.'+RMD_ver+'.min.js?'+revision, revision: null},
  {url: 'assets/bundle/css/login.bundle.'+RMD_ver+'.min.css?'+revision, revision: null},
  {url: 'assets/bundle/js/login.bundle.'+RMD_ver+'.min.js?'+revision, revision: null},
  {url: 'assets/bundle/js/ng-guru.bundle.'+RMD_ver+'.min.js?'+revision, revision: null},
  {url: 'assets/node_modules/coreui/icons/sprites/free.svg', revision: null},
  {url: 'assets/images/bg-01.png?'+revision, revision: null},
  {url: 'assets/images/img/avatars/6.jpg', revision: null},
  {url: 'assets/images/brand/bw-logo.png', revision: null},
  {url: 'assets/images/brand/logo.png', revision: null},
  {url: 'assets/images/brand/m-logo.png', revision: null},
  {url: 'assets/images/not.png', revision: null},
  {url: 'assets/bundle/fonts/fontawesome-webfont.woff2?v=4.6.3', revision: null},
  {url: 'assets/bundle/fonts/material-font.woff2', revision: null},
]);
 
// Demonstrates using default cache
workbox.routing.registerRoute(
    new RegExp('/assets/.*\\.(?:js)'),
    new workbox.strategies.CacheFirst(),
);
workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'css-cache',
  })
);
workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('/proktor/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'proktor-cache',
    })
);
workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('/guru/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'guru-cache',
    })
);
// Demonstrates a custom cache name for a route.
workbox.routing.registerRoute(
    new RegExp('.*\\.(?:png|jpg|jpeg|svg|gif)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache'
    }),
);
workbox.routing.registerRoute(
    new RegExp('.*\\.(?:eot|ttf|woff|woff2)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'fonts-cache',
    }),
);
self.addEventListener('message', function(event){
    msg = event.data;
    console.log("SW Received Message: " + msg);
    if (msg==='clearCache') {
        console.log('Clearing Workbox Cache.');
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                console.log("deleting cache", cacheName);
                caches.delete(cacheName);
            });
        });
    }
});