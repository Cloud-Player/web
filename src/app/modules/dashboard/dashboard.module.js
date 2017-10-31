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
const index_component_1 = require('./components/index/index.component');
const tracks_module_1 = require('../tracks/tracks.module');
const dashboard_routes_1 = require('./dashboard.routes');
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const session_module_1 = require('../session/session.module');
const backbone_module_1 = require('../backbone/backbone.module');
const shared_module_1 = require('../shared/shared.module');
const search_filter_component_1 = require('./components/search-filter/search-filter.component');
const social_share_panel_component_1 = require('./components/social-share-panel/social-share-panel.component');
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            tracks_module_1.TracksModule,
            dashboard_routes_1.DashboardRoutingModule,
            session_module_1.SessionModule,
            backbone_module_1.BackboneModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            index_component_1.DashboardIndexComponent,
            search_filter_component_1.SearchFilterComponent,
            social_share_panel_component_1.SocialSharePanelComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map