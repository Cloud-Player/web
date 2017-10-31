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
const session_model_1 = require('../../session/models/session.model');
const localforage = require('localforage');
const user_analytics_service_1 = require('../../user-analytics/services/user-analytics.service');
const config_1 = require('../../../config/config');
let AuthService = class AuthService {
    constructor(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
        this.session = session_model_1.Session.getInstance();
        window.addEventListener('message', this.receiveConnectMessage.bind(this), false);
        window.addEventListener('connectionSuccessFul', (ev) => {
            let creds = ev.detail;
            if (creds) {
                try {
                    creds = JSON.parse(creds);
                }
                catch (err) {
                }
                this.connectionSuccessFul(creds);
            }
        });
    }
    receiveConnectMessage(event) {
        let origin = event.origin || event.originalEvent.origin;
        if (origin !== config_1.Config.soundcloudRedirectDomain) {
            return;
        }
        this.connectionSuccessFul(event.data);
    }
    getConnectionUrl() {
        return '//soundcloud.com/connect?' +
            'client_id=' + config_1.Config.soundcloudClientId + '&' +
            'redirect_uri=' + config_1.Config.soundcloudRedirectUrl + '&' +
            'response_type=code&' +
            'state=v2';
    }
    connect() {
        this.userAnalyticsService.trackEvent('sc_auth_start', 'click', 'auth-service');
        let popup = window.open(this.getConnectionUrl());
        this.checkInterval = setInterval(() => {
            popup.postMessage(null, config_1.Config.soundcloudRedirectDomain);
        }, 100);
    }
    disconnect() {
        this.userAnalyticsService.trackEvent('sc_auth_disconnect', 'click', 'auth-service');
        this.session.clear();
        localforage.removeItem('sc_session');
    }
    connectionSuccessFul(params) {
        this.userAnalyticsService.trackEvent('sc_auth_success', 'click', 'auth-service');
        this.session.set({
            access_token: params.access_token,
            expires_on: params.expires_on,
            refresh_token: params.refresh_token
        });
    }
};
AuthService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map