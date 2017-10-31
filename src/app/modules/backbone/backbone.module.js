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
const http_1 = require('@angular/http');
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const underscore_1 = require('underscore');
require('backbone');
const base_model_1 = require('./models/base.model');
const base_collection_1 = require('./collections/base.collection');
const collection_range_input_search_component_1 = require('./components/collection-range-input-search/collection-range-input-search.component');
const collection_sort_component_1 = require('./components/collection-sort-component/collection-sort.component');
let BackboneModule = class BackboneModule {
    constructor(http) {
        this.http = http;
        Backbone.ajax = (options) => {
            let searchParams = options.search || new http_1.URLSearchParams();
            let requestOption = new http_1.RequestOptions({
                method: options.type,
                body: options.data,
                headers: new http_1.Headers(options.headers),
                search: searchParams,
                url: options.url
            });
            requestOption.headers.append('content-type', 'application/json');
            return http.request(options.url, requestOption)
                .toPromise()
                .then(function (resp) {
                if (options.success && typeof options.success === 'function') {
                    options.success(resp.json(), resp.statusText, this);
                }
                return resp;
            }, function (resp) {
                if (options.error && typeof options.error === 'function') {
                    options.error(this, resp.statusText, resp.toString());
                }
                return new Promise((resolve, reject) => {
                    reject(resp);
                });
            });
        };
        const superSync = Backbone.sync;
        Backbone.sync = (method, model, options) => {
            // we have to set the flag to wait true otherwise all cases were you want to delete mutliple entries will break
            // https://github.com/jashkenas/backbone/issues/3534
            // This flag means that the server has to confirm the creation/deletion before the model will be added/removed to the
            // collection
            options = options || {};
            if (underscore_1.isUndefined(options.wait)) {
                options.wait = true;
            }
            // Instead of the response object we are returning the backbone model in the promise
            return superSync.call(Backbone, method, model, options).then(function () {
                return model;
            });
        };
    }
};
BackboneModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
        exports: [
            collection_range_input_search_component_1.CollectionRangeInputSearchComponent,
            collection_sort_component_1.CollectionSortComponent
        ],
        providers: [
            base_collection_1.BaseCollection,
            base_model_1.BaseModel
        ],
        declarations: [
            collection_range_input_search_component_1.CollectionRangeInputSearchComponent,
            collection_sort_component_1.CollectionSortComponent
        ],
    }), 
    __metadata('design:paramtypes', [http_1.Http])
], BackboneModule);
exports.BackboneModule = BackboneModule;
//# sourceMappingURL=backbone.module.js.map