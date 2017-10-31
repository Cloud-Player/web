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
const backbone_1 = require('backbone');
const base_model_1 = require('../models/base.model');
const core_1 = require('@angular/core');
const get_url_util_1 = require('../utils/get_url.util');
const underscore_1 = require('underscore');
const prepare_search_params_1 = require('../utils/prepare_search_params');
let BaseCollection = class BaseCollection extends backbone_1.Collection {
    constructor() {
        super();
        this.model = base_model_1.BaseModel;
        this.queryParams = {};
        this.endpoint = null;
        this.sortOrder = null;
        this.url = () => {
            return get_url_util_1.getUrl(this);
        };
        this.on('sync', () => {
            this.sortOrder = null;
        });
    }
    hostName() {
        return '';
    }
    ;
    basePath() {
        return '';
    }
    ;
    sync(method, model, options = {}) {
        let queryParams = this.queryParams;
        if (options.queryParams) {
            queryParams = underscore_1.extend({}, this.queryParams, options.queryParams);
        }
        options.search = prepare_search_params_1.prepareSearchParams(options.search, queryParams);
        return super.sync(method, model, options);
    }
    sortAscending() {
        this.sort();
        this.sortOrder = 'ASC';
    }
    sortDescending() {
        if (this.sortOrder !== 'ASC') {
            this.sortAscending();
        }
        this.models = this.models.reverse();
        this.trigger('sort', this);
        this.sortOrder = 'DESC';
    }
};
BaseCollection = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], BaseCollection);
exports.BaseCollection = BaseCollection;
//# sourceMappingURL=base.collection.js.map