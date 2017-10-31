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
const user_model_1 = require('../../users/models/user.model');
const tracks_collection_1 = require('../../tracks/collections/tracks.collection');
const underscore_1 = require('underscore');
const soundcloud_model_1 = require('../../shared/models/soundcloud.model');
const soundcloud_image_model_1 = require('../../shared/models/soundcloud-image.model');
let Playlist = class Playlist extends soundcloud_model_1.SoundcloudModel {
    constructor() {
        super(...arguments);
        this.endpoint = '/playlists';
    }
    defaults() {
        return {
            title: '',
            isPublic: false
        };
    }
    ;
    nested() {
        return {
            user: user_model_1.User,
            tracks: tracks_collection_1.Tracks,
            artwork_url: soundcloud_image_model_1.SoundcloudImageModel
        };
    }
    ;
    parse(attrs) {
        if (attrs.sharing === 'public') {
            attrs.isPublic = true;
        }
        else {
            attrs.isPublic = false;
        }
        delete attrs.sharing;
        if (!attrs.artwork_url && attrs.tracks.length > 0) {
            attrs.artwork_url = attrs.tracks[0].artwork_url;
        }
        return attrs;
    }
    compose(attrs) {
        return {
            playlist: {
                title: attrs.title,
                sharing: attrs.isPublic ? 'public' : 'private',
                tracks: underscore_1.map(this.get('tracks').toJSON(), (obj) => {
                    return { id: obj.id };
                })
            }
        };
    }
};
Playlist = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Playlist);
exports.Playlist = Playlist;
//# sourceMappingURL=playlist.model.js.map