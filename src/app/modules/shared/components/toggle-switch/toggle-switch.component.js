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
let ToggleSwitchComponent = class ToggleSwitchComponent {
    constructor() {
        this.valueChange = new core_1.EventEmitter();
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        this.valueChange.emit(val);
    }
    isOn() {
        return this.value;
    }
    toggle() {
        if (this.isOn()) {
            this.turnOff();
        }
        else {
            this.turnOn();
        }
    }
    turnOn() {
        this.value = true;
    }
    turnOff() {
        this.value = false;
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], ToggleSwitchComponent.prototype, "valueChange", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], ToggleSwitchComponent.prototype, "value", null);
ToggleSwitchComponent = __decorate([
    core_1.Component({
        selector: 'toggle-switch',
        styles: [require('./toggle-switch.style.scss')],
        template: require('./toggle-switch.template.html'),
    }), 
    __metadata('design:paramtypes', [])
], ToggleSwitchComponent);
exports.ToggleSwitchComponent = ToggleSwitchComponent;
//# sourceMappingURL=toggle-switch.component.js.map