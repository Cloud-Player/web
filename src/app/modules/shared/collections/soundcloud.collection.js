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
const config_1 = require('../../../config/config');
const base_collection_1 = require('../../backbone/collections/base.collection');
const soundcloud_model_1 = require('../models/soundcloud.model');
const session_manager_fn_1 = require('../session-manager.fn');
let SoundcloudCollection = class SoundcloudCollection extends base_collection_1.BaseCollection {
    constructor() {
        super(...arguments);
        this.clientId = config_1.Config.soundcloudClientId;
        this.model = soundcloud_model_1.SoundcloudModel;
    }
    hostName() {
        return '//api.soundcloud.com';
    }
    ;
    sync(method, model, options = {}) {
        this.queryParams['client_id'] = this.clientId;
        let session = session_manager_fn_1.getSession();
        if (session && session.isValid()) {
            this.queryParams['oauth_token'] = session.get('access_token');
        }
        return super.sync(method, model, options);
    }
    parse(rsp) {
        return rsp.data || rsp;
    }
    ;
};
SoundcloudCollection = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], SoundcloudCollection);
exports.SoundcloudCollection = SoundcloudCollection;
//# sourceMappingURL=soundcloud.collection.js.map