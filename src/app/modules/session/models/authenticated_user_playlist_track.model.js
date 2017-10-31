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
const track_model_1 = require('../../tracks/models/track.model');
let AuthenticatedUserPlaylistTrack = class AuthenticatedUserPlaylistTrack extends track_model_1.Track {
    constructor() {
        super(...arguments);
        this.endpoint = '/me/playlists';
    }
    destroy() {
        if (this.collection) {
            let collection = this.collection;
            collection.remove(this);
            collection.triggerSave(this);
        }
    }
    ;
    save() {
        if (this.collection) {
            this.collection.add(this.toJSON(), { merge: true });
            this.collection.triggerSave(this);
        }
    }
};
AuthenticatedUserPlaylistTrack = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AuthenticatedUserPlaylistTrack);
exports.AuthenticatedUserPlaylistTrack = AuthenticatedUserPlaylistTrack;
//# sourceMappingURL=authenticated_user_playlist_track.model.js.map