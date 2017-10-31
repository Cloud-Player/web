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
let FillHeightDirective = class FillHeightDirective {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        let offsetTop = this.el.nativeElement.offsetTop;
        this.el.nativeElement.style.height = `calc(100vh - ${offsetTop}px)`;
        this.el.nativeElement.classList.add('scrollable');
    }
};
FillHeightDirective = __decorate([
    core_1.Directive({
        selector: '[fillHeight]'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], FillHeightDirective);
exports.FillHeightDirective = FillHeightDirective;
//# sourceMappingURL=fill-height.directive.js.map