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
const track_model_1 = require('../../../tracks/models/track.model');
const session_model_1 = require('../../../session/models/session.model');
const auth_service_1 = require('../../services/auth.service');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let ToggleLikedTrackComponent = class ToggleLikedTrackComponent {
    constructor(authService, userAnalyticsService) {
        this.authService = authService;
        this.userAnalyticsService = userAnalyticsService;
        this.session = session_model_1.Session.getInstance();
        this.showAuthenticateTooltip = false;
    }
    showConnectTooltip() {
        this.showAuthenticateTooltip = true;
        setTimeout(() => {
            this.showAuthenticateTooltip = false;
        }, 2000);
    }
    hasLikedTrack() {
        if (this.track && this.track.get('id') && session_model_1.Session.getInstance().get('user').get('likes').length > 0) {
            return !!session_model_1.Session.getInstance().get('user').get('likes').findWhere({ id: this.track.id });
        }
    }
    connect() {
        this.authService.connect();
    }
    like() {
        if (this.session.isValid()) {
            session_model_1.Session.getInstance().get('user').get('likes').create(this.track.toJSON());
            this.userAnalyticsService.trackEvent('like_track', 'click', 'toggle-like-cmp');
        }
        else {
            this.showConnectTooltip();
        }
    }
    dislike() {
        let likedTrack = session_model_1.Session.getInstance().get('user').get('likes').get(this.track.toJSON());
        if (likedTrack) {
            this.userAnalyticsService.trackEvent('dislike_track', 'click', 'toggle-like-cmp');
            likedTrack.destroy();
        }
    }
    toggleLike() {
        if (!this.hasLikedTrack()) {
            this.like();
        }
        else {
            this.dislike();
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', track_model_1.Track)
], ToggleLikedTrackComponent.prototype, "track", void 0);
ToggleLikedTrackComponent = __decorate([
    core_1.Component({
        selector: 'toggle-liked-track',
        styles: [require('./toggle-liked-track.style.scss')],
        template: require('./toggle-liked-track.template.html'),
        animations: [
            core_1.trigger('visibilityChanged', [
                core_1.state('true', core_1.style({ width: '*', opacity: 1 })),
                core_1.state('false', core_1.style({ width: 0, display: 'none', opacity: 0 })),
                core_1.state('void', core_1.style({ width: 0, display: 'none', opacity: 0 })),
                core_1.transition('* => *', core_1.animate('300ms ease-in-out'))
            ])
        ]
    }), 
    __metadata('design:paramtypes', [auth_service_1.AuthService, user_analytics_service_1.UserAnalyticsService])
], ToggleLikedTrackComponent);
exports.ToggleLikedTrackComponent = ToggleLikedTrackComponent;
//# sourceMappingURL=toggle-liked-track.component.js.map