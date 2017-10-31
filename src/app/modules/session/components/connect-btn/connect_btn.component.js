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
var ConnectBtnComponent = (function () {
    function ConnectBtnComponent() {
        var _this = this;
        this.session = session_model_1.Session.getInstance();
        window.addEventListener('message', this.receiveConnectMessage.bind(this), false);
        window.addEventListener('connectionSuccessFul', function (ev) {
            var creds = ev.detail;
            if (creds) {
                try {
                    creds = JSON.parse(creds);
                }
                catch (err) {
                }
                _this.connectionSuccessFul(creds);
            }
        });
    }
    ConnectBtnComponent.prototype.receiveConnectMessage = function (event) {
        var origin = event.origin || event.originalEvent.origin;
        if (origin !== 'http://sc.menu-flow.com') {
            return;
        }
        this.connectionSuccessFul(event.data);
    };
    ConnectBtnComponent.prototype.getConnectionUrl = function () {
        return '//soundcloud.com/connect?' +
            'client_id=abb6c1cad3f409112a5995bf922e1d1e&' +
            'redirect_uri=http://sc.menu-flow.com/connect&' +
            'response_type=code';
    };
    ConnectBtnComponent.prototype.connect = function () {
        var popup = window.open(this.getConnectionUrl());
        this.checkInterval = setInterval(function () {
            popup.postMessage(null, 'http://sc.menu-flow.com');
        }, 100);
    };
    ConnectBtnComponent.prototype.connectionSuccessFul = function (params) {
        this.session.set({
            access_token: params.access_token,
            expires_on: params.expires_on,
            refresh_token: params.refresh_token
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ConnectBtnComponent.prototype, "auth", void 0);
    ConnectBtnComponent = __decorate([
        core_1.Component({
            selector: 'connect-btn',
            styles: [require('./connect_btn.style.scss')],
            template: require('./connect_btn.template.html')
        }), 
        __metadata('design:paramtypes', [])
    ], ConnectBtnComponent);
    return ConnectBtnComponent;
}());
exports.ConnectBtnComponent = ConnectBtnComponent;
//# sourceMappingURL=connect_btn.component.js.map