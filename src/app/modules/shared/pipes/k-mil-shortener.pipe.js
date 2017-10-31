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
let KMilShortenerPipe = class KMilShortenerPipe {
    constructor() {
        this.units = ['', 'K', 'Mil', 'Bil'];
    }
    formatToKMil(input, amount = 0) {
        if (input < 1000) {
            return `${input}${this.units[amount]}`;
        }
        else {
            return this.formatToKMil(Math.round((input / 1000) * 10) / 10, amount + 1);
        }
    }
    transform(value, args) {
        if (!value) {
            return value;
        }
        else {
            return this.formatToKMil(parseInt(value, 10));
        }
    }
};
KMilShortenerPipe = __decorate([
    core_1.Pipe({ name: 'kMilShortener' }), 
    __metadata('design:paramtypes', [])
], KMilShortenerPipe);
exports.KMilShortenerPipe = KMilShortenerPipe;
//# sourceMappingURL=k-mil-shortener.pipe.js.map