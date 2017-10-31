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
let OptionsBtnComponent = class OptionsBtnComponent {
    constructor(el) {
        this.el = el;
        this.options = [];
        this.optionsAreVisible = false;
        this.openState = new core_1.EventEmitter();
    }
    getScrollOffset() {
        let scrollViewContainer = document.querySelector('scroll-view');
        if (scrollViewContainer) {
            return scrollViewContainer.scrollTop;
        }
        else {
            return document.scrollingElement.scrollTop;
        }
    }
    registerCloseListeners() {
        let close = (ev) => {
            if (!this.toggler.nativeElement.contains(ev.target)) {
                this.close();
            }
            document.removeEventListener('scroll', close, true);
            document.removeEventListener('click', close, true);
        };
        document.addEventListener('scroll', close, true);
        document.addEventListener('click', close, true);
    }
    addOption(option) {
        this.options.push(option);
    }
    open() {
        this.registerCloseListeners();
        this.optionsHolder.nativeElement.style.left = `${this.el.nativeElement.offsetLeft}px`;
        this.optionsHolder.nativeElement.style.top = `${this.el.nativeElement.getBoundingClientRect().top}px`;
        this.optionsAreVisible = true;
        this.openState.emit(true);
    }
    close() {
        this.optionsAreVisible = false;
        this.openState.emit(false);
    }
    toggleOpen() {
        if (this.optionsAreVisible) {
            this.close();
        }
        else {
            this.open();
        }
    }
    ngOnInit() {
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], OptionsBtnComponent.prototype, "openState", void 0);
__decorate([
    core_1.ViewChild('optionsHolder'), 
    __metadata('design:type', core_1.ElementRef)
], OptionsBtnComponent.prototype, "optionsHolder", void 0);
__decorate([
    core_1.ViewChild('toggler'), 
    __metadata('design:type', core_1.ElementRef)
], OptionsBtnComponent.prototype, "toggler", void 0);
OptionsBtnComponent = __decorate([
    core_1.Component({
        selector: 'options-btn',
        styles: [require('./options-btn.style.scss')],
        template: require('./options-btn.template.html')
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], OptionsBtnComponent);
exports.OptionsBtnComponent = OptionsBtnComponent;
let OptionsBtnOptionComponent = class OptionsBtnOptionComponent {
    constructor(el, optionsHolder) {
        this.el = el;
        optionsHolder.addOption(this);
    }
};
OptionsBtnOptionComponent = __decorate([
    core_1.Component({
        selector: 'options-btn-option',
        template: '<li class="option-btn-option"><ng-content></ng-content></li>'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, OptionsBtnComponent])
], OptionsBtnOptionComponent);
exports.OptionsBtnOptionComponent = OptionsBtnOptionComponent;
//# sourceMappingURL=options-btn.component.js.map