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
const base_collection_1 = require('../../collections/base.collection');
let CollectionRangeInputSearchComponent = class CollectionRangeInputSearchComponent {
    constructor() {
        this.searchTerms = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    search() {
        this.searchTerms.next(this.query);
    }
    ngOnInit() {
        this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(term => {
            if (term) {
                this.collection.queryParams[this.queryParam] = term;
                this.collection.fetch({ reset: true });
                return Observable_1.Observable.of(this.collection);
            }
        }).toPromise();
        this.query = this.collection.queryParams[this.queryParam];
    }
};
__decorate([
    core_1.Input(),
    __metadata('design:type', base_collection_1.BaseCollection)
], CollectionRangeInputSearchComponent.prototype, "collection", void 0);
__decorate([
    core_1.Input(),
    __metadata('design:type', String)
], CollectionRangeInputSearchComponent.prototype, "queryParam", void 0);
CollectionRangeInputSearchComponent = __decorate([
    core_1.Component({
        selector: 'app-collection-range-input-search',
        styles: [require('./collection-range-input-search.style.scss')],
        template: require('./collection-range-input-search.template.html')
    }),
    __metadata('design:paramtypes', [])
], CollectionRangeInputSearchComponent);
exports.CollectionRangeInputSearchComponent = CollectionRangeInputSearchComponent;
//# sourceMappingURL=app-collection-range-input-search.component.js.map
