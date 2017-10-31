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
const tracks_collection_1 = require('../../tracks/collections/tracks.collection');
const authenticated_user_playlist_track_model_1 = require('../models/authenticated_user_playlist_track.model');
let AuthenticatedUserPlaylistTracks = class AuthenticatedUserPlaylistTracks extends tracks_collection_1.Tracks {
    constructor() {
        super(...arguments);
        this.model = authenticated_user_playlist_track_model_1.AuthenticatedUserPlaylistTrack;
        this.queryParams = {};
    }
    parse(attrs) {
        return attrs.tracks;
    }
    create(track) {
        this.add(track);
        this.triggerSave(track);
        return track;
    }
    triggerSave(track) {
        this.trigger('save', track, this);
    }
    setEndpoint(playlistId) {
        this.endpoint = `/me/playlists/${playlistId}`;
    }
};
AuthenticatedUserPlaylistTracks = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AuthenticatedUserPlaylistTracks);
exports.AuthenticatedUserPlaylistTracks = AuthenticatedUserPlaylistTracks;
//# sourceMappingURL=authenticated_user_playlist_tracks.collection.js.map