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
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const detail_component_1 = require('./components/detail/detail.component');
const tracks_routes_1 = require('./tracks.routes');
const shared_module_1 = require('../shared/shared.module');
const tracks_collection_1 = require('./collections/tracks.collection');
let TracksModule = class TracksModule {
};
TracksModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            tracks_routes_1.TracksRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            detail_component_1.TracksDetailComponent
        ],
        providers: [
            tracks_collection_1.Tracks
        ]
    }), 
    __metadata('design:paramtypes', [])
], TracksModule);
exports.TracksModule = TracksModule;
//# sourceMappingURL=tracks.module.js.map