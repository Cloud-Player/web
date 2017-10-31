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
const tracking_providers_collection_1 = require('../collections/tracking-providers.collection');
let UserAnalyticsService = class UserAnalyticsService {
    constructor() {
        this.trackingProviders = new tracking_providers_collection_1.TrackingProviders();
    }
    addProvider(provider) {
        this.trackingProviders.add(provider);
    }
    trackEvent(eventName, eventAction, msg) {
        this.trackingProviders.trackEvent(eventName, eventAction, msg);
    }
    trackPage(page) {
        this.trackingProviders.trackPage(page);
    }
    setUserId(userId) {
        this.trackingProviders.setUserId(userId);
    }
    setProperty(property, value) {
        this.trackingProviders.setProperty(property, value);
    }
};
UserAnalyticsService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], UserAnalyticsService);
exports.UserAnalyticsService = UserAnalyticsService;
//# sourceMappingURL=user-analytics.service.js.map