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
const nested_model_1 = require('./nested.model');
const core_1 = require('@angular/core');
const get_url_util_1 = require('../utils/get_url.util');
const request_util_1 = require('../utils/request.util');
const underscore_1 = require('underscore');
const prepare_search_params_1 = require('../utils/prepare_search_params');
let BaseModel = class BaseModel extends nested_model_1.NestedModel {
    constructor() {
        super(...arguments);
        this.queryParams = {};
        this.endpoint = null;
        this.urlRoot = () => {
            return get_url_util_1.getUrl(this);
        };
    }
    hostName() {
        return '';
    }
    ;
    basePath() {
        return '';
    }
    ;
    request(url, method, options) {
        return request_util_1.request(url, method, options, this);
    }
    sync(method, model, options = {}) {
        let queryParams = this.queryParams;
        if (options.queryParams) {
            queryParams = underscore_1.extend({}, this.queryParams, options.queryParams);
        }
        options.search = prepare_search_params_1.prepareSearchParams(options.search, queryParams);
        return super.sync(method, model, options);
    }
};
BaseModel = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], BaseModel);
exports.BaseModel = BaseModel;
//# sourceMappingURL=base.model.js.map