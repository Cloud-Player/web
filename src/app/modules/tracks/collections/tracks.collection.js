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
const track_model_1 = require('../models/track.model');
const core_1 = require('@angular/core');
const soundcloud_collection_1 = require('../../shared/collections/soundcloud.collection');
let Tracks = class Tracks extends soundcloud_collection_1.SoundcloudCollection {
    constructor() {
        super(...arguments);
        this.endpoint = '/tracks';
        this.model = track_model_1.Track;
        this.queryParams = {
            q: null,
            limit: 200,
            'duration[from]': 1
        };
    }
    refresh() {
        return this.fetch({
            search: {
                ids: this.pluck('id'),
                q: null,
                limit: 100
            }
        });
    }
};
Tracks = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Tracks);
exports.Tracks = Tracks;
//# sourceMappingURL=tracks.collection.js.map