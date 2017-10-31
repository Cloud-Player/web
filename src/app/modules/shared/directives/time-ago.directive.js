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
const moment = require('moment');
let TimeAgoDirective = class TimeAgoDirective {
    constructor(el) {
        this.el = el;
    }
    setTime(dateVal) {
        let date = new Date(dateVal);
        this.el.nativeElement.textContent = (moment(date).fromNow());
    }
    ngOnInit() {
        this.setTime(this.timeAgo);
        // this.interval = setInterval(()=>{
        //   this.setTime(this.timeAgo);
        // }, 1000 * 60 * 2);
    }
    ngOnDestroy() {
        // if(this.interval){
        //   clearInterval(this.interval);
        // }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], TimeAgoDirective.prototype, "timeAgo", void 0);
TimeAgoDirective = __decorate([
    core_1.Directive({
        selector: '[timeAgo]'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], TimeAgoDirective);
exports.TimeAgoDirective = TimeAgoDirective;
//# sourceMappingURL=time-ago.directive.js.map