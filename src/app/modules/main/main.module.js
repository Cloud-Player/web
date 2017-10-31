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
require('./rxjs-extensions');
const core_1 = require('@angular/core');
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
const backbone_module_1 = require('../backbone/backbone.module');
const tracks_module_1 = require('../tracks/tracks.module');
const dashboard_module_1 = require('../dashboard/dashboard.module');
const main_component_1 = require('./components/main/main.component');
const main_routes_1 = require('./main.routes');
const audio_player_module_1 = require('../audioplayer/audio-player.module');
const session_module_1 = require('../session/session.module');
const users_module_1 = require('../users/users.module');
const common_1 = require('@angular/common');
const nav_component_1 = require('./components/nav/nav.component');
const playlist_module_1 = require('../playlists/playlist.module');
const auth_service_1 = require('../shared/services/auth.service');
const shared_module_1 = require('../shared/shared.module');
const desktop_app_view_component_1 = require('./components/desktop-app-view/desktop-app-view.component');
const user_analytics_module_1 = require('../user-analytics/user-analytics.module');
let MainModule = class MainModule {
};
MainModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            backbone_module_1.BackboneModule,
            tracks_module_1.TracksModule,
            dashboard_module_1.DashboardModule,
            main_routes_1.MainRoutingModule,
            audio_player_module_1.AudioPlayerModule,
            session_module_1.SessionModule,
            users_module_1.UsersModule,
            playlist_module_1.PlaylistModule,
            shared_module_1.SharedModule,
            user_analytics_module_1.UserAnalyticsModule
        ],
        declarations: [
            main_component_1.MainComponent,
            nav_component_1.NavComponent,
            desktop_app_view_component_1.DesktopAppViewComponent
        ],
        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, auth_service_1.AuthService],
        bootstrap: [main_component_1.MainComponent]
    }), 
    __metadata('design:paramtypes', [])
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map