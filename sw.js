var serviceWorkerOption = {
  "assets": [
    "/ebd7bf47dcdbd9ebebea93f422e84dd1.svg",
    "/674f50d287a8c48dc19ba404d20fe713.eot",
    "/af7ae505a9eed503f8b8e6982036873e.woff2",
    "/fee66e712a8a08eef5805a46892932ad.woff",
    "/b06871f281fee6b241d60582ae9369b9.ttf",
    "/912ec66d7572ff821749319396470bde.svg",
    "/win-screenshot.72c50c881a234637ac1418f6a00c7f3a.png",
    "/osx-screenshot.1ea45195d62c85507366f794aaa27816.png",
    "/osx-dmg.6e033680f5cb65a592061aa159b6e9fa.png",
    "/win-exe.25d192266a404622165f3c54c8982243.png",
    "/app.b945f64e823092701306.js",
    "/polyfills.b945f64e823092701306.js",
    "/vendor.b945f64e823092701306.js",
    "/vendor.b945f64e823092701306.css"
  ]
};
        
        /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var g = global;
	var cacheVersion = ("1.0.6");
	var externalDomainWhiteList = [
	    'https://fonts.gstatic.com',
	    'https://fonts.googleapis.com'
	];
	self.addEventListener('install', function (event) {
	    self.skipWaiting();
	    event.waitUntil(self.caches.open(cacheVersion).then(function (cache) {
	        return cache.addAll(g.serviceWorkerOption.assets);
	    }));
	});
	self.addEventListener('fetch', function (event) {
	    var url = new URL(event.request.url);
	    if (url.origin === location.origin || externalDomainWhiteList.indexOf(url.origin) !== -1) {
	        event.respondWith(self.caches.match(event.request)
	            .then(function (response) {
	            if (response) {
	                return response;
	            }
	            var fetchRequest = event.request.clone();
	            return fetch(fetchRequest).then(function (response) {
	                if (!response || response.status !== 200 || response.type !== 'basic') {
	                    return response;
	                }
	                var responseToCache = response.clone();
	                self.caches.open(cacheVersion)
	                    .then(function (cache) {
	                    cache.put(event.request, responseToCache);
	                });
	                return response;
	            });
	        }, function () {
	            // Offline Fallback
	        }));
	    }
	});
	self.addEventListener('activate', function (event) {
	    event.waitUntil(self.caches.keys().then(function (keyList) {
	        return Promise.all(keyList.map(function (key) {
	            if (key !== cacheVersion) {
	                return self.caches.delete(key);
	            }
	        }));
	    }));
	    event.waitUntil(self.clients.claim());
	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ]);