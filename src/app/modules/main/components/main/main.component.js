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
const session_model_1 = require('../../../session/models/session.model');
let MainComponent = class MainComponent {
    constructor() {
        this.isAuthenticated = false;
        this.session = session_model_1.Session.getInstance();
    }
    ngOnInit() {
        this.session.get('user').on('change:authenticated', (user) => {
            this.setAuthenticated(user);
        });
        if (this.session.isValid()) {
            this.setAuthenticated(this.session.get('user'));
        }
    }
    setAuthenticated(user) {
        if (user.get('authenticated')) {
            user.fetch().then(() => {
                this.isAuthenticated = true;
                user.get('likes').fetch();
            });
        }
        else {
            this.isAuthenticated = false;
        }
    }
    ;
};
MainComponent = __decorate([
    core_1.Component({
        selector: 'cloud-player',
        styles: [require('./main.style.scss')],
        template: require('./main.template.html'),
        encapsulation: core_1.ViewEncapsulation.None
    }), 
    __metadata('design:paramtypes', [])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map