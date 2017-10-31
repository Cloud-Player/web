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
const client_detector_service_1 = require('../../../shared/services/client-detector.service');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let DesktopAppViewComponent = class DesktopAppViewComponent {
    constructor(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
    }
    isWindowsPc() {
        let os = client_detector_service_1.ClientDetector.getOs();
        return (os.name === client_detector_service_1.OsNames.Windows && os.version >= 7);
    }
    isMacPc() {
        let os = client_detector_service_1.ClientDetector.getOs();
        return (os.name === client_detector_service_1.OsNames.MacOs && os.version > 0);
    }
    download(platform) {
        this.userAnalyticsService.trackEvent(`download_desktop_app_${platform}`, 'click', 'desktop-app-view');
    }
};
DesktopAppViewComponent = __decorate([
    core_1.Component({
        selector: 'cloud-player',
        styles: [require('./desktop-app-view.style.scss')],
        template: require('./desktop-app-view.template.html')
    }), 
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService])
], DesktopAppViewComponent);
exports.DesktopAppViewComponent = DesktopAppViewComponent;
//# sourceMappingURL=desktop-app-view.component.js.map