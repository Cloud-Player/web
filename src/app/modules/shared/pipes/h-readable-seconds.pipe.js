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
let HumanReadableSecondsPipe = class HumanReadableSecondsPipe {
    formatToHHMMSS(input) {
        let time = new Date(null);
        time.setSeconds(input);
        // format time from hh:mm:ss to mm:ss when hh is 0
        if (time.getHours() === 1) {
            return time.toISOString().substr(14, 5);
        }
        else {
            return time.toISOString().substr(12, 7);
        }
    }
    transform(value, args) {
        if (!value) {
            return value;
        }
        else {
            return this.formatToHHMMSS(parseInt(value, 10));
        }
    }
};
HumanReadableSecondsPipe = __decorate([
    core_1.Pipe({ name: 'hReadableSeconds' }), 
    __metadata('design:paramtypes', [])
], HumanReadableSecondsPipe);
exports.HumanReadableSecondsPipe = HumanReadableSecondsPipe;
//# sourceMappingURL=h-readable-seconds.pipe.js.map