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
let RangeSliderComponent = class RangeSliderComponent {
    constructor(el) {
        this.el = el;
        this.tmpVal = 0;
        this.val = 0;
        this.minVal = 0;
        this.maxVal = 0;
        this.stepVal = 0.1;
        this.showLoadingSpinner = false;
        this.dragInProgress = false;
        this.dragDisplayValue = 0;
        this.draggerWidth = 0;
        this.valueChange = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
    }
    get tmpValue() {
        return this.tmpVal;
    }
    set tmpValue(val) {
        this.tmpVal = val;
        this.setDragPosFromVal();
        this.dragDisplayValue = this.getDisplayValue(val);
        this.valueChange.emit(val);
    }
    get value() {
        return this.val;
    }
    set value(val) {
        if (!this.dragInProgress) {
            this.val = val;
            this.tmpValue = val;
        }
    }
    get max() {
        return this.maxVal;
    }
    set max(val) {
        if (val) {
            this.maxVal = val;
            this.setDragPosFromVal();
        }
    }
    get min() {
        return this.minVal;
    }
    set min(val) {
        if (val) {
            this.minVal = val;
            this.setDragPosFromVal();
        }
    }
    get step() {
        return this.stepVal;
    }
    set step(val) {
        if (val) {
            this.stepVal = val;
        }
    }
    get isLoading() {
        return this.showLoadingSpinner;
    }
    set isLoading(val) {
        this.showLoadingSpinner = val;
    }
    getDisplayValue(value) {
        if (value && typeof this.transformDisplayValue === "function") {
            return this.transformDisplayValue(value);
        }
        else {
            return value;
        }
    }
    setDragPosFromVal() {
        let pos = (((this.tmpVal - this.min) / (this.max - this.min)) * 100);
        this.handle.nativeElement.style.left = pos + '%';
        this.handle.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * pos) + 'px)';
        this.progressBarLine.nativeElement.style.width = pos + '%';
    }
    ngAfterContentInit() {
        this.el.nativeElement.addEventListener('mousedown', () => {
            this.draggerWidth = this.handle.nativeElement.offsetWidth;
            this.dragInProgress = true;
        });
        this.el.nativeElement.addEventListener('mouseup', () => {
            this.dragInProgress = false;
            this.value = this.tmpValue;
            this.valueChanged.emit(this.value);
        });
        this.setDragPosFromVal();
    }
    ;
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], RangeSliderComponent.prototype, "valueChange", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], RangeSliderComponent.prototype, "valueChanged", void 0);
__decorate([
    core_1.ViewChild('progressLine'), 
    __metadata('design:type', core_1.ElementRef)
], RangeSliderComponent.prototype, "progressBarLine", void 0);
__decorate([
    core_1.ViewChild('progressBar'), 
    __metadata('design:type', core_1.ElementRef)
], RangeSliderComponent.prototype, "progressBarBg", void 0);
__decorate([
    core_1.ViewChild('handle'), 
    __metadata('design:type', core_1.ElementRef)
], RangeSliderComponent.prototype, "handle", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Function)
], RangeSliderComponent.prototype, "transformDisplayValue", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], RangeSliderComponent.prototype, "hideSliderValue", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], RangeSliderComponent.prototype, "showCurrentValue", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], RangeSliderComponent.prototype, "value", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], RangeSliderComponent.prototype, "max", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], RangeSliderComponent.prototype, "min", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], RangeSliderComponent.prototype, "step", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], RangeSliderComponent.prototype, "isLoading", null);
RangeSliderComponent = __decorate([
    core_1.Component({
        selector: 'range-slider',
        styles: [require('./range-slider.style.scss')],
        template: require('./range-slider.template.html')
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], RangeSliderComponent);
exports.RangeSliderComponent = RangeSliderComponent;
//# sourceMappingURL=range-slider.component.js.map