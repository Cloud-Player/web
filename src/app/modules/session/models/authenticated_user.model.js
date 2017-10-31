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
const underscore_1 = require('underscore');
const authenticated_user_liked_tracks_collection_1 = require('../collections/authenticated_user_liked_tracks.collection');
const authenticated_user_playlists_collection_1 = require('../collections/authenticated_user_playlists.collection');
let AuthenticatedUser = class AuthenticatedUser extends user_model_1.User {
    constructor() {
        super(...arguments);
        this.endpoint = '/me';
    }
    nested() {
        return underscore_1.extend(super.nested(), {
            playlists: authenticated_user_playlists_collection_1.AuthenticatedUserPlaylists,
            likes: authenticated_user_liked_tracks_collection_1.AuthenticatedUserLikedTracks
        });
    }
    defaults() {
        return underscore_1.extend(super.defaults(), {
            authenticated: false
        });
    }
};
AuthenticatedUser = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], AuthenticatedUser);
exports.AuthenticatedUser = AuthenticatedUser;
//# sourceMappingURL=authenticated_user.model.js.map