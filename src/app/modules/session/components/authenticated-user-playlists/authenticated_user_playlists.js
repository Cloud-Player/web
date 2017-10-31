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
const session_model_1 = require('../../models/session.model');
const authenticated_user_playlist_model_1 = require('../../models/authenticated_user_playlist.model');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let AuthenticatedUserPlaylists = class AuthenticatedUserPlaylists {
    constructor(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
        this.session = session_model_1.Session.getInstance();
        this.user = this.session.get('user');
        this.valueChange = new core_1.EventEmitter();
        this.isFetching = false;
        this.isInCreationMode = false;
        this.tmpPlaylist = new authenticated_user_playlist_model_1.AuthenticatedUserPlaylist();
        this.dropTrack = (dropData, playlist) => {
            this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'menu-playlist-bar');
            playlist.get('tracks').create(dropData);
        };
    }
    fetchPlaylists() {
        if (this.user.get('authenticated') && !this.isFetching) {
            this.isFetching = true;
            let playlist = this.user.get('playlists');
            this.user.get('playlists').fetch().then(() => {
                this.isFetching = false;
                this.valueChange.emit();
            });
        }
    }
    ;
    ngOnInit() {
        this.user.on('change:authenticated', this.fetchPlaylists.bind(this));
        this.fetchPlaylists();
    }
    ;
    save() {
        let newPlaylist = this.user.get('playlists').add(this.tmpPlaylist.toJSON());
        newPlaylist.save().then(() => {
            this.tmpPlaylist.clear();
        });
    }
    cancel() {
        if (!this.tmpPlaylist.get('title') || this.tmpPlaylist.get('title').length < 1) {
            this.isInCreationMode = false;
        }
    }
    addNewPlaylist() {
        this.isInCreationMode = true;
    }
    createPlaylist() {
        this.userAnalyticsService.trackEvent('created_playlist', 'click', 'menu-playlist-bar');
        this.user.get('playlists').create(this.tmpPlaylist.toJSON(), { at: 0 });
        this.isInCreationMode = false;
        this.tmpPlaylist.clear();
    }
    isAuthenticated() {
        return this.session.get('user').get('authenticated');
    }
};
AuthenticatedUserPlaylists = __decorate([
    core_1.Component({
        selector: 'authenticated-user-playlists',
        styles: [require('./authenticated_user_playlists.style.scss')],
        template: require('./authenticated_user_playlists.template.html'),
    }), 
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService])
], AuthenticatedUserPlaylists);
exports.AuthenticatedUserPlaylists = AuthenticatedUserPlaylists;
//# sourceMappingURL=authenticated_user_playlists.js.map