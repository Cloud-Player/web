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
const playlist_model_1 = require('../../playlists/models/playlist.model');
const underscore_1 = require('underscore');
const authenticated_user_playlist_tracks_collection_1 = require('../collections/authenticated_user_playlist_tracks.collection');
let AuthenticatedUserPlaylist = class AuthenticatedUserPlaylist extends playlist_model_1.Playlist {
    constructor() {
        super(...arguments);
        this.endpoint = '/me/playlists';
    }
    nested() {
        return underscore_1.extend(super.nested(), {
            tracks: authenticated_user_playlist_tracks_collection_1.AuthenticatedUserPlaylistTracks
        });
    }
    setTracksEndpoint() {
        if (this.id) {
            this.get('tracks').setEndpoint(this.id);
        }
    }
    initialize() {
        this.get('tracks').on('save', () => {
            this.save();
        });
        this.setTracksEndpoint();
        this.on('change:id', this.setTracksEndpoint, this);
    }
    ;
};
AuthenticatedUserPlaylist = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AuthenticatedUserPlaylist);
exports.AuthenticatedUserPlaylist = AuthenticatedUserPlaylist;
//# sourceMappingURL=authenticated_user_playlist.model.js.map