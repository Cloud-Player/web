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
let TwoRangeSliderComponent = class TwoRangeSliderComponent {
    constructor(el) {
        this.el = el;
        this._tmpMinValue = 0;
        this._tmpMaxValue = 0;
        this._minValue = 0;
        this._maxValue = 0;
        this._min = 0;
        this._max = 0;
        this._step = 0.1;
        this.showLoadingSpinner = false;
        this.dragInProgress = false;
        this.dragHandleMinDisplayValue = 0;
        this.dragHandleMaxDisplayValue = 0;
        this.draggerWidth = 0;
        this.minValueChange = new core_1.EventEmitter();
        this.minValueChanged = new core_1.EventEmitter();
        this.maxValueChange = new core_1.EventEmitter();
        this.maxValueChanged = new core_1.EventEmitter();
    }
    get tmpMinValue() {
        return this._tmpMinValue;
    }
    set tmpMinValue(val) {
        let maxVal = underscore_1.isNumber(this.tmpMaxValue) ? this.tmpMaxValue : this.max;
        if (val >= maxVal) {
            return;
        }
        if (this.allowInfinityMin && val === this.min) {
            val = null;
        }
        this._tmpMinValue = val;
        this.setDragPosFromVal();
        this.dragHandleMinDisplayValue = this.getDisplayValue(val);
        this.minValueChange.emit(val);
    }
    get tmpMaxValue() {
        return this._tmpMaxValue;
    }
    set tmpMaxValue(val) {
        let minVal = underscore_1.isNumber(this.tmpMinValue) ? this.tmpMinValue : this.min;
        if (val <= minVal) {
            return;
        }
        if (this.allowInfinityMax && val === this.max) {
            val = null;
        }
        this._tmpMaxValue = val;
        this.setDragPosFromVal();
        this.dragHandleMaxDisplayValue = this.getDisplayValue(val);
        this.maxValueChange.emit(val);
    }
    get minValue() {
        return this._minValue;
    }
    set minValue(val) {
        if (!this.dragInProgress) {
            this._minValue = val;
            this.tmpMinValue = val;
        }
    }
    get maxValue() {
        return this._maxValue;
    }
    set maxValue(val) {
        if (!this.dragInProgress) {
            this._maxValue = val;
            this.tmpMaxValue = val;
        }
    }
    get max() {
        return this._max;
    }
    set max(val) {
        if (val) {
            this._max = val;
            this.setDragPosFromVal();
        }
    }
    get min() {
        return this._min;
    }
    set min(val) {
        if (val) {
            this._min = val;
            this.setDragPosFromVal();
        }
    }
    get step() {
        return this._step;
    }
    set step(val) {
        if (val) {
            this._step = val;
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
        let minVal = underscore_1.isNumber(this.tmpMinValue) ? this.tmpMinValue : this.min;
        let posMin = (((minVal - this.min) / (this.max - this.min)) * 100);
        let maxVal = underscore_1.isNumber(this.tmpMaxValue) ? this.tmpMaxValue : this.max;
        let posMax = (((maxVal - this.min) / (this.max - this.min)) * 100);
        this.handleOne.nativeElement.style.left = posMin + '%';
        this.handleOne.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * posMin) + 'px)';
        this.handleTwo.nativeElement.style.left = posMax + '%';
        this.handleTwo.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * posMax) + 'px)';
        this.progressLine.nativeElement.style.left = posMin + '%';
        this.progressLine.nativeElement.style.width = (posMax - posMin) + '%';
    }
    ngAfterContentInit() {
        this.el.nativeElement.addEventListener('mousedown', () => {
            this.draggerWidth = this.handleOne.nativeElement.offsetWidth;
            this.dragInProgress = true;
        });
        this.el.nativeElement.addEventListener('mouseup', () => {
            this.dragInProgress = false;
            if (this.minValue !== this.tmpMinValue) {
                this.minValue = this.tmpMinValue;
                this.minValueChanged.emit(this.minValue);
            }
            if (this.maxValue !== this.tmpMaxValue) {
                this.maxValue = this.tmpMaxValue;
                this.maxValueChanged.emit(this.maxValue);
            }
            this.sliderOne.nativeElement.value = underscore_1.isNumber(this._tmpMinValue) ? this._tmpMinValue : this.min;
            this.sliderTwo.nativeElement.value = underscore_1.isNumber(this._tmpMaxValue) ? this._tmpMaxValue : this.max;
        });
        this.setDragPosFromVal();
    }
    ;
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], TwoRangeSliderComponent.prototype, "minValueChange", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], TwoRangeSliderComponent.prototype, "minValueChanged", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], TwoRangeSliderComponent.prototype, "maxValueChange", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], TwoRangeSliderComponent.prototype, "maxValueChanged", void 0);
__decorate([
    core_1.ViewChild('progressBar'), 
    __metadata('design:type', core_1.ElementRef)
], TwoRangeSliderComponent.prototype, "progressBar", void 0);
__decorate([
    core_1.ViewChild('progressLine'), 
    __metadata('design:type', core_1.ElementRef)
], TwoRangeSliderComponent.prototype, "progressLine", void 0);
__decorate([
    core_1.ViewChild('handleOne'), 
    __metadata('design:type', core_1.ElementRef)
], TwoRangeSliderComponent.prototype, "handleOne", void 0);
__decorate([
    core_1.ViewChild('handleTwo'), 
    __metadata('design:type', core_1.ElementRef)
], TwoRangeSliderComponent.prototype, "handleTwo", void 0);
__decorate([
    core_1.ViewChild('sliderOne'), 
    __metadata('design:type', core_1.ElementRef)
], TwoRangeSliderComponent.prototype, "sliderOne", void 0);
__decorate([
    core_1.ViewChild('sliderTwo'), 
    __metadata('design:type', core_1.ElementRef)
], TwoRangeSliderComponent.prototype, "sliderTwo", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Function)
], TwoRangeSliderComponent.prototype, "transformDisplayValue", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], TwoRangeSliderComponent.prototype, "hideSliderValue", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], TwoRangeSliderComponent.prototype, "allowInfinityMin", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], TwoRangeSliderComponent.prototype, "allowInfinityMax", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], TwoRangeSliderComponent.prototype, "minValue", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], TwoRangeSliderComponent.prototype, "maxValue", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], TwoRangeSliderComponent.prototype, "max", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], TwoRangeSliderComponent.prototype, "min", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], TwoRangeSliderComponent.prototype, "step", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], TwoRangeSliderComponent.prototype, "isLoading", null);
TwoRangeSliderComponent = __decorate([
    core_1.Component({
        selector: 'two-range-slider',
        styles: [require('./two-range-slider.style.scss')],
        template: require('./two-range-slider.template.html')
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], TwoRangeSliderComponent);
exports.TwoRangeSliderComponent = TwoRangeSliderComponent;
//# sourceMappingURL=two-range-slider.component.js.map