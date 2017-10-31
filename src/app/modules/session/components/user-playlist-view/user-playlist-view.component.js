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
const router_1 = require('@angular/router');
const session_model_1 = require('../../models/session.model');
const authenticated_user_playlist_model_1 = require('../../models/authenticated_user_playlist.model');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let UserPlayListViewComponent = class UserPlayListViewComponent {
    constructor(route, router, userAnalyticsService) {
        this.route = route;
        this.router = router;
        this.userAnalyticsService = userAnalyticsService;
        this.playlist = new authenticated_user_playlist_model_1.AuthenticatedUserPlaylist();
        this.session = session_model_1.Session.getInstance();
        this.isInEditMode = false;
    }
    fetchPlaylist() {
        if (this.session.isValid() && this.playlist.id) {
            this.playlist.fetch();
        }
    }
    cancel() {
        this.playlist.fetch();
        this.isInEditMode = false;
    }
    save() {
        this.userAnalyticsService.trackEvent('saved_playlist', 'click', 'user-playlist-cmp');
        this.playlist.save().then(() => {
            this.isInEditMode = false;
        });
    }
    destroy() {
        this.userAnalyticsService.trackEvent('destroyed_playlist', 'click', 'user-playlist-cmp');
        let userPlaylists = this.session.get('user').get('playlists');
        let indexOfPlaylist = userPlaylists.indexOf(this.playlist);
        let otherPlaylistId;
        this.playlist.destroy().then(() => {
            if (userPlaylists.at(indexOfPlaylist)) {
                otherPlaylistId = userPlaylists.at(indexOfPlaylist).get('id');
            }
            else if (userPlaylists.at(indexOfPlaylist - 1)) {
                otherPlaylistId = userPlaylists.at(indexOfPlaylist - 1).get('id');
            }
            if (otherPlaylistId) {
                this.router.navigate(['../', otherPlaylistId], { relativeTo: this.route });
            }
            else {
                this.router.navigateByUrl('/');
            }
        });
    }
    ngOnInit() {
        let userPlaylists = this.session.get('user').get('playlists');
        this.route.params.forEach((params) => {
            if (userPlaylists.get(params.id)) {
                this.playlist = this.session.get('user').get('playlists').get(params.id);
            }
            else {
                this.playlist.clear();
                this.playlist.set({ id: params.id });
                this.fetchPlaylist();
            }
            userPlaylists.on('update', () => {
                if (userPlaylists.get(params.id)) {
                    this.playlist = userPlaylists.get(params.id);
                }
            });
        });
        this.session.get('user').on('change:authenticated', this.fetchPlaylist(), this);
    }
};
UserPlayListViewComponent = __decorate([
    core_1.Component({
        selector: 'user-play-list-view',
        template: require('./user-playlist-view.template.html'),
        styles: [require('./user-playlist-view.style.scss')]
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, user_analytics_service_1.UserAnalyticsService])
], UserPlayListViewComponent);
exports.UserPlayListViewComponent = UserPlayListViewComponent;
//# sourceMappingURL=user-playlist-view.component.js.map