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
const authenticated_user_playlists_1 = require('../authenticated-user-playlists/authenticated_user_playlists');
let AuthenticatedUserPlaylistsViewComponent = class AuthenticatedUserPlaylistsViewComponent extends authenticated_user_playlists_1.AuthenticatedUserPlaylists {
};
AuthenticatedUserPlaylistsViewComponent = __decorate([
    core_1.Component({
        selector: 'authenticated-user-playlists-view',
        template: require('./authenticated-user-playlists-view.template.html'),
        styles: [require('./authenticated-user-playlists-view.style.scss')]
    }), 
    __metadata('design:paramtypes', [])
], AuthenticatedUserPlaylistsViewComponent);
exports.AuthenticatedUserPlaylistsViewComponent = AuthenticatedUserPlaylistsViewComponent;
//# sourceMappingURL=authenticated-user-playlists-view.component.js.map