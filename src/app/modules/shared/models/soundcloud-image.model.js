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
const base_model_1 = require('../../backbone/models/base.model');
let SoundcloudImageModel = class SoundcloudImageModel extends base_model_1.BaseModel {
    getImageByFormat(format) {
        if (this.get('id')) {
            return this.get('id').replace('-large', `-${format}`);
        }
    }
    ;
    getLargeSize() {
        return this.getImageByFormat('t500x500');
    }
    ;
    getMediumSize() {
        return this.getImageByFormat('badge');
    }
    ;
    getSmallSize() {
        return this.getImageByFormat('small');
    }
    ;
    getDefaultSize() {
        return this.get('id');
    }
    ;
};
SoundcloudImageModel = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], SoundcloudImageModel);
exports.SoundcloudImageModel = SoundcloudImageModel;
//# sourceMappingURL=soundcloud-image.model.js.map