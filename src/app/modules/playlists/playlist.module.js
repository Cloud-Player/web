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
const tracks_module_1 = require('../tracks/tracks.module');
const playlist_routes_1 = require('./playlist.routes');
const platform_browser_1 = require('@angular/platform-browser');
const playlist_view_component_1 = require('./components/playlist-view/playlist-view.component');
const shared_module_1 = require('../shared/shared.module');
const playlist_icon_component_1 = require('./components/playlist-icon/playlist-icon.component');
let PlaylistModule = class PlaylistModule {
};
PlaylistModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            tracks_module_1.TracksModule,
            playlist_routes_1.PlaylistsRoutingModule,
            shared_module_1.SharedModule
        ],
        exports: [
            playlist_icon_component_1.PlayListIconComponent
        ],
        declarations: [
            playlist_view_component_1.PlayListViewComponent,
            playlist_icon_component_1.PlayListIconComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], PlaylistModule);
exports.PlaylistModule = PlaylistModule;
//# sourceMappingURL=playlist.module.js.map