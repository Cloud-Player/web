"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const tracking_provider_model_1 = require('./tracking-provider.model');
const underscore_1 = require('underscore');
let GoogleAnalyticsTrackingProvider = class GoogleAnalyticsTrackingProvider extends tracking_provider_model_1.TrackingProviderModel {
    trackEvent(eventName, eventAction, msg) {
        window.ga('send', 'event', eventName, eventAction, msg);
    }
    trackPage(page) {
        window.ga('set', 'page', page);
        window.ga('send', 'pageview');
    }
    setUserId(userId) {
        window.ga('set', 'userId', userId);
    }
    setProperty(property, value) {
        window.ga('set', property, value);
    }
    initialize(GoogleAnalyticsTrackingId) {
        this.set('id', 'GA');
        if (!GoogleAnalyticsTrackingId || !underscore_1.isString(GoogleAnalyticsTrackingId)) {
            throw new Error('Please initialize this provider with a valid Google analytics tracking id by passing the id into the constructor!');
        }
        /*
         * This is the code snippet provided by Google Analytics
         * https://developers.google.com/analytics/devguides/collection/analyticsjs/
         */
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        window.ga('create', GoogleAnalyticsTrackingId, 'auto');
    }
};
GoogleAnalyticsTrackingProvider = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], GoogleAnalyticsTrackingProvider);
exports.GoogleAnalyticsTrackingProvider = GoogleAnalyticsTrackingProvider;
//# sourceMappingURL=google-analytics-tracking-provider.model.js.map