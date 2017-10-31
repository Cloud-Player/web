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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const session_routes_1 = require('./session.routes');
const soundcloud_callback_component_1 = require('./components/soundcloud-callback/soundcloud_callback.component');
const authenticated_user_playlists_1 = require('./components/authenticated-user-playlists/authenticated_user_playlists');
const liked_tracks_view_component_1 = require('./components/liked-tracks-view/liked-tracks-view.component');
const shared_module_1 = require('../shared/shared.module');
const user_playlist_view_component_1 = require('./components/user-playlist-view/user-playlist-view.component');
const authenticated_user_playlists_view_component_1 = require('./components/authenticated-user-playlists-view/authenticated-user-playlists-view.component');
const playlist_module_1 = require('../playlists/playlist.module');
const authenticated_user_view_component_1 = require('./components/authenticated-user-view/authenticated-user-view.component');
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            session_routes_1.SessionRoutingModule,
            playlist_module_1.PlaylistModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            soundcloud_callback_component_1.SoundcloudCallbackComponent,
            authenticated_user_playlists_1.AuthenticatedUserPlaylists,
            liked_tracks_view_component_1.LikedTracksViewComponent,
            user_playlist_view_component_1.UserPlayListViewComponent,
            authenticated_user_playlists_view_component_1.AuthenticatedUserPlaylistsViewComponent,
            authenticated_user_view_component_1.AuthenticatedUserViewComponent
        ],
        exports: [
            authenticated_user_playlists_1.AuthenticatedUserPlaylists,
            authenticated_user_playlists_view_component_1.AuthenticatedUserPlaylistsViewComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.module.js.map