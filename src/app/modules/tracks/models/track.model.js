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
const soundcloud_model_1 = require('../../shared/models/soundcloud.model');
const soundcloud_image_model_1 = require('../../shared/models/soundcloud-image.model');
const comments_collection_1 = require('../../comments/collections/comments.collection');
let Track = class Track extends soundcloud_model_1.SoundcloudModel {
    constructor() {
        super(...arguments);
        this.endpoint = '/tracks';
    }
    nested() {
        return {
            user: user_model_1.User,
            artwork_url: soundcloud_image_model_1.SoundcloudImageModel,
            comments: comments_collection_1.Comments
        };
    }
    getResourceUrl() {
        return `${this.get('stream_url')}?client_id=${this.clientId}`;
    }
    parse(attrs) {
        attrs = super.parse(attrs);
        attrs.likes = attrs.likes_count || attrs.favoritings_count;
        return attrs;
    }
    initialize() {
        if (this.get('id')) {
            this.get('comments').setTrackId(this.get('id'));
        }
        this.on('change:id', () => {
            this.get('comments').setTrackId(this.get('id'));
        });
    }
};
Track = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Track);
exports.Track = Track;
//# sourceMappingURL=track.model.js.map