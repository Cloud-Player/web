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
const user_analytics_service_1 = require('./services/user-analytics.service');
const google_analytics_tracking_provider_model_1 = require('./models/google-analytics-tracking-provider.model');
const router_1 = require('@angular/router');
let UserAnalyticsModule = class UserAnalyticsModule {
    constructor(userAnalyticsService, router, route) {
        this.userAnalyticsService = userAnalyticsService;
        this.router = router;
        this.route = route;
        userAnalyticsService.addProvider(new google_analytics_tracking_provider_model_1.GoogleAnalyticsTrackingProvider('UA-96117674-1'));
        userAnalyticsService.setProperty('anonymizeIp', true);
        this.router.events
            .filter(event => event instanceof router_1.NavigationEnd)
            .subscribe(() => {
            let currentRoute = this.route.root;
            while (currentRoute.children[0] !== undefined) {
                currentRoute = currentRoute.children[0];
            }
            userAnalyticsService.trackPage(currentRoute.snapshot.routeConfig.path);
        });
    }
};
UserAnalyticsModule = __decorate([
    core_1.NgModule({
        providers: [user_analytics_service_1.UserAnalyticsService]
    }), 
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService, router_1.Router, router_1.ActivatedRoute])
], UserAnalyticsModule);
exports.UserAnalyticsModule = UserAnalyticsModule;
//# sourceMappingURL=user-analytics.module.js.map