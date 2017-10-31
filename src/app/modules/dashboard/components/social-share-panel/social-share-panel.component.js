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
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
const localforage = require('localforage');
let SocialSharePanelComponent = class SocialSharePanelComponent {
    constructor(el, userAnalyticsService) {
        this.el = el;
        this.userAnalyticsService = userAnalyticsService;
    }
    shared(type) {
        this.dismiss();
        this.userAnalyticsService.trackEvent('social_shared_on_' + type, 'click', 'social-share-panel-component');
        localforage.setItem('shared_cp', type);
    }
    notShared() {
        this.dismiss();
        this.userAnalyticsService.trackEvent('social_not_shared', 'click', 'social-share-panel-component');
        localforage.setItem('shared_cp', "none");
    }
    dismiss() {
        this.el.nativeElement.remove();
    }
    ngOnInit() {
        this.el.nativeElement.style.display = 'none';
        localforage.getItem('shared_cp').then((value) => {
            if (!value) {
                this.el.nativeElement.style.display = 'block';
            }
        });
    }
};
SocialSharePanelComponent = __decorate([
    core_1.Component({
        selector: 'social-share-panel',
        styles: [require('./social-share-panel.style.scss')],
        template: require('./social-share-panel.template.html')
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, user_analytics_service_1.UserAnalyticsService])
], SocialSharePanelComponent);
exports.SocialSharePanelComponent = SocialSharePanelComponent;
//# sourceMappingURL=social-share-panel.component.js.map