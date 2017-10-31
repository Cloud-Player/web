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
var core_1 = require('@angular/core');
var session_model_1 = require('../../models/session.model');
var ShowWhenAuthenticatedComponent = (function () {
    function ShowWhenAuthenticatedComponent() {
        this.session = session_model_1.Session.getInstance();
        this.isAuthenticated = false;
    }
    ShowWhenAuthenticatedComponent.prototype.setAuthenticated = function (user) {
        var _this = this;
        if (user.get('authenticated')) {
            user.fetch().then(function () {
                _this.isAuthenticated = true;
                user.get('likes').fetch();
            });
        }
        else {
            this.isAuthenticated = false;
        }
    };
    ;
    ShowWhenAuthenticatedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.get('user').on('change:authenticated', function (user) {
            _this.setAuthenticated(user);
        });
        if (this.session.isValid()) {
            this.setAuthenticated(this.session.get('user'));
        }
    };
    ;
    ShowWhenAuthenticatedComponent = __decorate([
        core_1.Component({
            selector: 'show-when-authenticated',
            template: require('./show_when_authenticated.html'),
        }), 
        __metadata('design:paramtypes', [])
    ], ShowWhenAuthenticatedComponent);
    return ShowWhenAuthenticatedComponent;
}());
exports.ShowWhenAuthenticatedComponent = ShowWhenAuthenticatedComponent;
//# sourceMappingURL=show_when_authenticated.js.map