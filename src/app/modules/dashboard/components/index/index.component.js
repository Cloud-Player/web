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
const tracks_collection_1 = require('../../../tracks/collections/tracks.collection');
const collection_text_input_search_component_1 = require('../../../shared/components/collection-text-input-search/collection-text-input-search.component');
const localforage = require('localforage');
const auth_service_1 = require('../../../shared/services/auth.service');
let DashboardIndexComponent = class DashboardIndexComponent {
    constructor(tracks, authService) {
        this.tracks = tracks;
        this.authService = authService;
        this.title = 'Search Tracks';
        this.isFetching = false;
    }
    connect() {
        this.authService.connect();
    }
    ngAfterViewInit() {
        this.searchBar.focus();
        this.searchBar.valueChange.subscribe((val) => {
            localforage.setItem('sc_search_term', val);
        });
        localforage.getItem('sc_search_term').then((val) => {
            if (val) {
                this.searchBar.search(val);
            }
        });
        this.tracks.on('request', () => {
            this.isFetching = true;
        });
        this.tracks.on('sync error', () => {
            this.isFetching = false;
        });
    }
};
__decorate([
    core_1.ViewChild('searchBar'), 
    __metadata('design:type', collection_text_input_search_component_1.CollectionTextInputSearchComponent)
], DashboardIndexComponent.prototype, "searchBar", void 0);
DashboardIndexComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        styles: [require('./index.style.scss')],
        template: require('./index.template.html')
    }), 
    __metadata('design:paramtypes', [tracks_collection_1.Tracks, auth_service_1.AuthService])
], DashboardIndexComponent);
exports.DashboardIndexComponent = DashboardIndexComponent;
//# sourceMappingURL=index.component.js.map