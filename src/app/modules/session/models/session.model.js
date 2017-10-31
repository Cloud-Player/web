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
const authenticated_user_model_1 = require('./authenticated_user.model');
const session_manager_fn_1 = require('../../shared/session-manager.fn');
const soundcloud_model_1 = require('../../shared/models/soundcloud.model');
const localforage = require('localforage');
const config_1 = require('../../../config/config');
let Session_1 = class Session extends soundcloud_model_1.SoundcloudModel {
    constructor() {
        super(...arguments);
        this.idAttribute = 'access_token';
    }
    static getInstance() {
        if (!Session_1.instance) {
            Session_1.instance = new Session_1();
        }
        return Session_1.instance;
    }
    defaults() {
        return {
            expires_on: null,
            refresh_token: null
        };
    }
    ;
    nested() {
        return {
            user: authenticated_user_model_1.AuthenticatedUser
        };
    }
    ;
    parse(attrs = {}) {
        if (attrs.expires_on) {
            attrs.expires_on = parseInt(attrs.expires_on, 10);
        }
        return attrs;
    }
    compose(attrs = {}) {
        delete attrs.user;
        return attrs;
    }
    ;
    saveLocal(options) {
        localforage.setItem('sc_session', this.toJSON({}));
    }
    ;
    fetchLocal(options) {
        localforage.getItem('sc_session').then((session) => {
            if (session) {
                this.set(session);
            }
        });
        return this;
    }
    ;
    refresh() {
        if (this.get('refresh_token')) {
            return this.request(config_1.Config.soundcloudRedirectUrl + '/', 'PUT', {
                data: {
                    refresh_token: this.get('refresh_token'),
                    version: 2
                }
            }).then((rsp) => {
                let data = rsp.json();
                this.set(data);
                return this;
            });
        }
        else {
            return false;
        }
    }
    ;
    getExpiresIn() {
        return this.get('expires_on') - (+new Date());
    }
    ;
    isNotExpired() {
        return this.getExpiresIn() > 0;
    }
    ;
    initialize() {
        this.on('change:access_token', () => {
            if (this.get('access_token')) {
                if (this.isNotExpired()) {
                    this.get('user').set('authenticated', true);
                }
                else {
                    this.refresh();
                }
            }
            else {
                this.get('user').set('authenticated', false);
            }
            this.saveLocal();
        });
        this.on('change:expires_on', () => {
            if (this.refreshTimer) {
                clearTimeout(this.refreshTimer);
            }
            this.refreshTimer = setTimeout(() => {
                this.refresh();
            }, this.getExpiresIn() - 1000);
        });
        this.fetchLocal();
    }
    ;
    isValid() {
        return this.get('access_token') && this.isNotExpired();
    }
};
let Session = Session_1;
Session = Session_1 = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Session);
exports.Session = Session;
session_manager_fn_1.setSession(Session.getInstance());
//# sourceMappingURL=session.model.js.map