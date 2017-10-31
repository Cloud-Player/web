"use strict";
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const core_1 = require('@angular/core');
let runtime = require('serviceworker-webpack-plugin/lib/runtime');
let registerEvents = require('serviceworker-webpack-plugin/lib/browser/registerEvents');
const main_module_1 = require('./modules/main/main.module');
if (process.env.ENV === 'prod') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(main_module_1.MainModule);
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    const registration = runtime.register();
    registerEvents(registration, {
        onInstalled: () => {
            console.log('[SW] onInstalled');
        },
        onUpdateReady: () => {
            console.log('[SW] onUpdateReady');
        },
        onUpdating: () => {
            console.log('[SW] onUpdating');
        },
        onUpdateFailed: () => {
            console.log('[SW] onUpdateFailed');
        },
        onUpdated: () => {
            console.log('[SW] onUpdated');
        },
    });
}
else {
    console.log('serviceWorker not available');
}
//# sourceMappingURL=main.js.map