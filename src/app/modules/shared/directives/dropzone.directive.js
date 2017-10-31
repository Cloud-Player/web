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
let DropZoneDirective = class DropZoneDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    onDragEnter() {
        this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
        clearTimeout(this.leaveTimeout);
    }
    onDragOver(event) {
        event.preventDefault();
        this.renderer.setElementClass(this.el.nativeElement, 'drag-over', true);
        clearTimeout(this.leaveTimeout);
    }
    onDragLeave() {
        this.leaveTimeout = setTimeout(() => {
            this.renderer.setElementClass(this.el.nativeElement, 'drag-over', false);
        }, 100);
    }
    onMouseOver(event) {
        if (this.dropCallback) {
            let args = [this.getDragData(event)];
            if (this.dropItemRef) {
                args.push(this.dropItemRef);
            }
            args.push(event);
            this.dropCallback.apply(this, args);
        }
        this.leaveTimeout = setTimeout(() => {
            this.renderer.setElementClass(this.el.nativeElement, 'drag-over', false);
        }, 100);
    }
    getDragData(event) {
        let text = event.dataTransfer.getData('text');
        if (text) {
            return JSON.parse(text);
        }
    }
    ;
};
__decorate([
    core_1.Input('dropCallback'), 
    __metadata('design:type', Function)
], DropZoneDirective.prototype, "dropCallback", void 0);
__decorate([
    core_1.Input('dropItemRef'), 
    __metadata('design:type', Object)
], DropZoneDirective.prototype, "dropItemRef", void 0);
__decorate([
    core_1.HostListener('dragenter', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], DropZoneDirective.prototype, "onDragEnter", null);
__decorate([
    core_1.HostListener('dragover', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], DropZoneDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], DropZoneDirective.prototype, "onDragLeave", null);
__decorate([
    core_1.HostListener('drop', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], DropZoneDirective.prototype, "onMouseOver", null);
DropZoneDirective = __decorate([
    core_1.Directive({
        selector: '[dropzone]'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
], DropZoneDirective);
exports.DropZoneDirective = DropZoneDirective;
//# sourceMappingURL=dropzone.directive.js.map