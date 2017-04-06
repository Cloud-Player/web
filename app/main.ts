import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
let runtime = require('serviceworker-webpack-plugin/lib/runtime');
let registerEvents = require('serviceworker-webpack-plugin/lib/browser/registerEvents');

import {MainModule} from './modules/main/main.module';

if (process.env.ENV === 'prod') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MainModule);

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

} else {
  console.log('serviceWorker not available');
}
