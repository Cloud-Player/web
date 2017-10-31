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
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var base_collection_1 = require('../../collections/base.collection');
var CollectionTextInputSearchComponent = (function () {
    function CollectionTextInputSearchComponent() {
        this.searchTerms = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    CollectionTextInputSearchComponent.prototype.search = function () {
        this.searchTerms.next(this.query);
    };
    CollectionTextInputSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) {
            if (term) {
                _this.collection.queryParams[_this.queryParam] = term;
                _this.collection.fetch({ reset: true });
                return Observable_1.Observable.of(_this.collection);
            }
        }).toPromise();
        this.query = this.collection.queryParams[this.queryParam];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', base_collection_1.BaseCollection)
    ], CollectionTextInputSearchComponent.prototype, "collection", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CollectionTextInputSearchComponent.prototype, "queryParam", void 0);
    CollectionTextInputSearchComponent = __decorate([
        core_1.Component({
            selector: 'collection-text-input-search',
            styles: [require('./collection-text-input-search.style.scss')],
            template: require('./collection-text-input-search.template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], CollectionTextInputSearchComponent);
    return CollectionTextInputSearchComponent;
}());
exports.CollectionTextInputSearchComponent = CollectionTextInputSearchComponent;
//# sourceMappingURL=collection-text-input-search.component.js.map