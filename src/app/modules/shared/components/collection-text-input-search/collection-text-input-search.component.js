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
const Observable_1 = require('rxjs/Observable');
const Subject_1 = require('rxjs/Subject');
const base_collection_1 = require('../../../backbone/collections/base.collection');
const client_detector_service_1 = require('../../services/client-detector.service');
let CollectionTextInputSearchComponent = class CollectionTextInputSearchComponent {
    constructor() {
        this.searchTerms = new Subject_1.Subject();
        this.isLoading = false;
        this.isIdle = false;
        this.valueChange = new core_1.EventEmitter();
    }
    isMobileDevice() {
        return client_detector_service_1.ClientDetector.isMobileDevice();
    }
    searchOnInput() {
        if (!this.isMobileDevice()) {
            this.search();
        }
    }
    // Push a search term into the observable stream.
    search(query) {
        if (query) {
            this.query = query;
        }
        this.isIdle = true;
        this.searchTerms.next(this.query);
    }
    focus() {
        this.searchBar.nativeElement.focus();
    }
    ngOnInit() {
        this.collection.on('request', () => {
            this.isLoading = true;
            this.isIdle = false;
        });
        this.collection.on('sync error', () => {
            this.isLoading = false;
        });
        this.searchTerms
            .debounceTime(600) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(term => {
            if (term) {
                this.collection.queryParams[this.queryParam] = term;
            }
            else {
                this.collection.queryParams[this.queryParam] = null;
            }
            this.collection.fetch({ reset: true });
            this.valueChange.emit(term);
            return Observable_1.Observable.of(this.collection);
        }).toPromise();
        this.query = this.collection.queryParams[this.queryParam];
    }
};
__decorate([
    core_1.ViewChild('searchInput'), 
    __metadata('design:type', core_1.ElementRef)
], CollectionTextInputSearchComponent.prototype, "searchBar", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', base_collection_1.BaseCollection)
], CollectionTextInputSearchComponent.prototype, "collection", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], CollectionTextInputSearchComponent.prototype, "queryParam", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], CollectionTextInputSearchComponent.prototype, "valueChange", void 0);
CollectionTextInputSearchComponent = __decorate([
    core_1.Component({
        selector: 'collection-text-input-search',
        styles: [require('./collection-text-input-search.style.scss')],
        template: require('./collection-text-input-search.template.html')
    }), 
    __metadata('design:paramtypes', [])
], CollectionTextInputSearchComponent);
exports.CollectionTextInputSearchComponent = CollectionTextInputSearchComponent;
//# sourceMappingURL=collection-text-input-search.component.js.map