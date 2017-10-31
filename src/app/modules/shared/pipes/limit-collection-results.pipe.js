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
const underscore_1 = require('underscore');
let LimitCollectionresultsPipe = class LimitCollectionresultsPipe {
    constructor() {
        this.valueChange = new core_1.EventEmitter();
        this._throttledScrollHandler = underscore_1.throttle(this._increaseLimitOnBottomReached.bind(this), 500);
        document.addEventListener('scroll', this._throttledScrollHandler, true);
    }
    _increaseLimitOnBottomReached(ev) {
        let srcEl = ev.srcElement;
        if (srcEl.scrollTop / (srcEl.scrollHeight - srcEl.offsetHeight) > 0.8) {
            if (this._limit) {
                this._limit += this._orgLimit;
            }
            else {
                this._limit = this._orgLimit * 2;
            }
            this.valueChange.emit(this._limit);
        }
    }
    transform(items, args = { limit: null }) {
        if (this._limit && this._limit > items.length) {
            document.removeEventListener('scroll', this._throttledScrollHandler, true);
            return items;
        }
        if (items && args.limit && items.length > args.limit) {
            this._orgLimit = args.limit;
            return items.slice(0, this._limit || this._orgLimit);
        }
        else {
            return items;
        }
    }
    ngOnDestroy() {
        document.removeEventListener('scroll', this._throttledScrollHandler, true);
    }
};
LimitCollectionresultsPipe = __decorate([
    core_1.Pipe({ name: 'limitCollectionresults', pure: false }), 
    __metadata('design:paramtypes', [])
], LimitCollectionresultsPipe);
exports.LimitCollectionresultsPipe = LimitCollectionresultsPipe;
//# sourceMappingURL=limit-collection-results.pipe.js.map