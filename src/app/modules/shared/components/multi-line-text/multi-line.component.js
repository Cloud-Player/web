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
let MultiLineComponent = class MultiLineComponent {
    constructor() {
        this.lines = [];
        this.lineAmountChanged = new core_1.EventEmitter();
    }
    calculateLines(text, maxWidth) {
        let words = text.split(' ');
        words.forEach(function (word) {
            var wordWidth = this._ctx.measureText(word + ' ').width, line = this.lines[this.lines.length - 1];
            if (line && line.width + wordWidth <= maxWidth) {
                line.text += ' ' + word;
                line.width += wordWidth;
            }
            else if (!this.maxLines || this.lines.length <= this.maxLines) {
                this.lines.push({ width: wordWidth + (this.paddingLeft + this.paddingRight), text: word });
            }
        }.bind(this));
        this.lineAmountChanged.emit(this.lines.length);
    }
    ngOnInit() {
        this._ctx = this.canvas.nativeElement.getContext('2d');
        this._ctx.font = this.font || '300 12.5px Raleway';
        this.calculateLines(this.text, this.maxWidth);
    }
    ngOnDestroy() {
        this.lineAmountChanged.emit(this.lines.length * -1);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], MultiLineComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], MultiLineComponent.prototype, "font", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], MultiLineComponent.prototype, "paddingLeft", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], MultiLineComponent.prototype, "paddingRight", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], MultiLineComponent.prototype, "maxWidth", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Number)
], MultiLineComponent.prototype, "maxLines", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], MultiLineComponent.prototype, "lineAmountChanged", void 0);
__decorate([
    core_1.ViewChild('canvas'), 
    __metadata('design:type', core_1.ElementRef)
], MultiLineComponent.prototype, "canvas", void 0);
MultiLineComponent = __decorate([
    core_1.Component({
        selector: 'multi-line',
        styles: [require('./multi-line.style.scss')],
        template: require('./multi-line.template.html')
    }), 
    __metadata('design:paramtypes', [])
], MultiLineComponent);
exports.MultiLineComponent = MultiLineComponent;
//# sourceMappingURL=multi-line.component.js.map