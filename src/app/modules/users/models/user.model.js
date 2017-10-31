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
const soundcloud_model_1 = require('../../shared/models/soundcloud.model');
const soundcloud_image_model_1 = require('../../shared/models/soundcloud-image.model');
let User = class User extends soundcloud_model_1.SoundcloudModel {
    constructor() {
        super(...arguments);
        this.endpoint = '/users';
    }
    defaults() {
        return {
            name: ''
        };
    }
    nested() {
        return {
            avatar_url: soundcloud_image_model_1.SoundcloudImageModel
        };
    }
};
User = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map