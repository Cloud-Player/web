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
const base_model_1 = require('../../backbone/models/base.model');
const core_1 = require('@angular/core');
let TrackingProviderModel = class TrackingProviderModel extends base_model_1.BaseModel {
    trackEvent(eventName, eventAction, msg) {
    }
    trackPage(page) {
    }
    setUserId(userId) {
    }
    setProperty(property, value) {
    }
};
TrackingProviderModel = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], TrackingProviderModel);
exports.TrackingProviderModel = TrackingProviderModel;
//# sourceMappingURL=tracking-provider.model.js.map