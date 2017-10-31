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
const playlists_collection_1 = require('../../playlists/collections/playlists.collection');
const authenticated_user_playlist_model_1 = require('../models/authenticated_user_playlist.model');
let AuthenticatedUserPlaylists = class AuthenticatedUserPlaylists extends playlists_collection_1.Playlists {
    constructor() {
        super(...arguments);
        this.endpoint = '/me/playlists';
        this.model = authenticated_user_playlist_model_1.AuthenticatedUserPlaylist;
    }
};
AuthenticatedUserPlaylists = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AuthenticatedUserPlaylists);
exports.AuthenticatedUserPlaylists = AuthenticatedUserPlaylists;
//# sourceMappingURL=authenticated_user_playlists.collection.js.map