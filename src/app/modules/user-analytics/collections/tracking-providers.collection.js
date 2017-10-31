"use strict";
const base_collection_1 = require('../../backbone/collections/base.collection');
const tracking_provider_model_1 = require('../models/tracking-provider.model');
class TrackingProviders extends base_collection_1.BaseCollection {
    constructor() {
        super(...arguments);
        this.model = tracking_provider_model_1.TrackingProviderModel;
    }
    trackEvent(eventName, eventAction, msg) {
        let args = arguments;
        this.each(function (trackingProvider) {
            trackingProvider.trackEvent.apply(this, args);
        });
    }
    trackPage(page) {
        let args = arguments;
        this.each(function (trackingProvider) {
            trackingProvider.trackPage.apply(this, args);
        });
    }
    setUserId(userId) {
        this._userId = userId;
        this.each(function (trackingProvider) {
            trackingProvider.setUserId.call(this, this._userId);
        }, this);
    }
    setProperty(property, value) {
        if (property && value) {
            this.each(function (trackingProvider) {
                trackingProvider.setProperty.call(this, property, value);
            }, this);
        }
    }
    initialize() {
        this.on('add', function () {
            if (this._userId) {
                this.setUserId(this._userId);
            }
        }, this);
    }
}
exports.TrackingProviders = TrackingProviders;
//# sourceMappingURL=tracking-providers.collection.js.map