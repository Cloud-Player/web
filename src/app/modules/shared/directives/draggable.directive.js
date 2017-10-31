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
let DraggableDirective = class DraggableDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    onDragStart(event) {
        let transfer = event.dataTransfer;
        if (this.dragData) {
            try {
                transfer.setData('text', JSON.stringify(this.dragData));
            }
            catch (err) {
                throw new Error('DragData has to be a JSON object!');
            }
        }
        if (this.image && this.imageIsLoaded) {
            transfer.setDragImage(this.image, 10, 10);
        }
        if (this.dragEffect) {
            transfer.effectAllowed = this.dragEffect;
        }
        this.renderer.setElementClass(this.el.nativeElement, 'drag-in-progress', true);
    }
    onDragEnd() {
        this.renderer.setElementClass(this.el.nativeElement, 'drag-in-progress', false);
    }
    onMouseOver() {
        if (this.dragImageUrl && (!this.image || this.image.src !== this.dragImageUrl)) {
            this.image = new Image();
            this.image.src = this.dragImageUrl;
            this.imageIsLoaded = false;
            this.image.onload = () => {
                this.imageIsLoaded = true;
            };
        }
    }
};
__decorate([
    core_1.Input('dragData'), 
    __metadata('design:type', Object)
], DraggableDirective.prototype, "dragData", void 0);
__decorate([
    core_1.Input('dragImageUrl'), 
    __metadata('design:type', String)
], DraggableDirective.prototype, "dragImageUrl", void 0);
__decorate([
    core_1.Input('dragEffect'), 
    __metadata('design:type', String)
], DraggableDirective.prototype, "dragEffect", void 0);
__decorate([
    core_1.HostListener('dragstart', ['$event']), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', [Object]), 
    __metadata('design:returntype', void 0)
], DraggableDirective.prototype, "onDragStart", null);
__decorate([
    core_1.HostListener('dragend'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], DraggableDirective.prototype, "onDragEnd", null);
__decorate([
    core_1.HostListener('mouseover'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], DraggableDirective.prototype, "onMouseOver", null);
DraggableDirective = __decorate([
    core_1.Directive({
        selector: '[draggable]'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
], DraggableDirective);
exports.DraggableDirective = DraggableDirective;
//# sourceMappingURL=draggable.directive.js.map