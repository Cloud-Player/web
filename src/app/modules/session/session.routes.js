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
const router_1 = require('@angular/router');
const soundcloud_callback_component_1 = require('./components/soundcloud-callback/soundcloud_callback.component');
const liked_tracks_view_component_1 = require('./components/liked-tracks-view/liked-tracks-view.component');
const user_playlist_view_component_1 = require('./components/user-playlist-view/user-playlist-view.component');
const authenticated_user_playlists_view_component_1 = require('./components/authenticated-user-playlists-view/authenticated-user-playlists-view.component');
const authenticated_user_view_component_1 = require('./components/authenticated-user-view/authenticated-user-view.component');
const routes = [
    { path: 'connect', component: soundcloud_callback_component_1.SoundcloudCallbackComponent },
    { path: 'me', component: authenticated_user_view_component_1.AuthenticatedUserViewComponent },
    { path: 'me/likes', component: liked_tracks_view_component_1.LikedTracksViewComponent },
    { path: 'me/playlists', component: authenticated_user_playlists_view_component_1.AuthenticatedUserPlaylistsViewComponent },
    { path: 'me/playlists/:id', component: user_playlist_view_component_1.UserPlayListViewComponent }
];
let SessionRoutingModule = class SessionRoutingModule {
};
SessionRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    }), 
    __metadata('design:paramtypes', [])
], SessionRoutingModule);
exports.SessionRoutingModule = SessionRoutingModule;
//# sourceMappingURL=session.routes.js.map