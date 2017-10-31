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
const play_queue_collection_1 = require('../../collections/play_queue.collection');
const underscore_1 = require('underscore');
const localforage = require('localforage');
const h_readable_seconds_pipe_1 = require('../../../shared/pipes/h-readable-seconds.pipe');
const cloud_player_logo_service_1 = require('../../../shared/services/cloud-player-logo.service');
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let AudioPlayerControlsComponent = class AudioPlayerControlsComponent {
    constructor(cloudPlayerLogoService, userAnalyticsService) {
        this.cloudPlayerLogoService = cloudPlayerLogoService;
        this.userAnalyticsService = userAnalyticsService;
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
        this.hadError = false;
        this.isBuffering = false;
        this.currentTimeChange = new core_1.EventEmitter();
        this.transformProgressBarValues = function (input) {
            return this.humanReadableSecPipe.transform(input, null);
        }.bind(this);
        this.audio = new Audio();
        this.playQueue.on('change:status', this.reactOnStatusChange, this);
        this.timeTick = 0;
        this.duration = 0;
        this.humanReadableSecPipe = new h_readable_seconds_pipe_1.HumanReadableSecondsPipe();
        this.setAudioObjectEventListeners();
    }
    setAudioObjectEventListeners() {
        this.audio.addEventListener('canplay', () => {
            this.duration = this.audio.duration;
            this.isBuffering = false;
        });
        let throttledTimeUpdater = underscore_1.throttle(() => {
            this.timeTick = this.audio.currentTime;
            if (this.playQueue.getCurrentItem()) {
                localforage.setItem('sc_current_track', {
                    id: this.playQueue.getCurrentItem().get('track').id,
                    currentTime: this.audio.currentTime,
                    duration: this.audio.duration
                });
                this.currentTimeChange.emit(this.audio.currentTime);
            }
        }, 1000);
        this.audio.addEventListener('timeupdate', throttledTimeUpdater);
        this.audio.addEventListener('ended', () => {
            if (this.playQueue.hasNextItem()) {
                this.nextTrack();
            }
            else {
                this.playQueue.getCurrentItem().stop();
            }
        });
        this.audio.addEventListener('error', () => {
            this.userAnalyticsService.trackEvent('playback_err', 'click', 'audio-player-cmp');
            this.hadError = true;
            this.pauseTrack();
        });
        this.audio.addEventListener('playing', () => {
            this.hadError = false;
            this.cloudPlayerLogoService.play();
        });
        this.audio.addEventListener('waiting', () => {
            this.isBuffering = true;
        });
    }
    initializeLastPlayingTrack(lastTrack) {
        let item = this.playQueue.add({ status: 'PAUSED', track: { id: lastTrack.id } }, { at: 0 });
        item.get('track').fetch().then((track) => {
            this.audio.src = track.getResourceUrl();
        });
        this.audio.currentTime = lastTrack.currentTime;
        this.timeTick = lastTrack.currentTime;
        this.duration = lastTrack.duration;
    }
    setMobileMediaNotification(track) {
        if ('mediaSession' in navigator) {
            let nv = navigator;
            let artwork = track.get('artwork_url');
            nv.mediaSession.metadata = new MediaMetadata({
                title: track.get('title'),
                artist: track.get('user').get('username'),
                artwork: [
                    { src: artwork.getDefaultSize(), sizes: '96x96', type: 'image/jpg' },
                    { src: artwork.getDefaultSize(), sizes: '128x128', type: 'image/jpg' },
                    { src: artwork.getDefaultSize(), sizes: '192x192', type: 'image/jpg' },
                    { src: artwork.getImageByFormat('t300x300'), sizes: '256x256', type: 'image/jpg' },
                    { src: artwork.getImageByFormat('crop'), sizes: '384x384', type: 'image/jpg' },
                    { src: artwork.getLargeSize(), sizes: '512x512', type: 'image/jpg' },
                ]
            });
            this.userAnalyticsService.trackEvent('set_notification_chrome_mob', 'click', 'audio-player-cmp');
            if (this.playQueue.hasPreviousItem()) {
                nv.mediaSession.setActionHandler('previoustrack', () => {
                    this.userAnalyticsService.trackEvent('previous_track_chrome_mob', 'click', 'audio-player-cmp');
                    this.previousTrack();
                });
            }
            if (this.playQueue.hasNextItem()) {
                this.userAnalyticsService.trackEvent('next_track_chrome_mob', 'click', 'audio-player-cmp');
                nv.mediaSession.setActionHandler('nexttrack', () => {
                    this.nextTrack();
                });
            }
        }
    }
    ngOnInit() {
        localforage.getItem('sc_volume').then((volume) => {
            if (volume) {
                this.audio.volume = volume;
            }
        });
        localforage.getItem('sc_current_track').then((currentTrack) => {
            if (currentTrack) {
                this.initializeLastPlayingTrack(currentTrack);
            }
        });
        window.addEventListener('playPauseTrackKeyPressed', this.togglePlayPause.bind(this));
        window.addEventListener('nextTrackKeyPressed', this.nextTrack.bind(this));
        window.addEventListener('previousTrackKeyPressed', this.previousTrack.bind(this));
        window.addEventListener('abc', function () {
            console.log('ABC');
        });
        if (this.playQueue.getPlayingItem()) {
            this.startAudioPlayer(this.playQueue.getPlayingItem());
        }
    }
    reactOnStatusChange(item) {
        switch (item.get('status')) {
            case 'PLAYING':
                this.startAudioPlayer(item);
                break;
            case 'STOPPED':
                this.stopAudioPlayer();
                break;
            case 'PAUSED':
                this.pauseAudioPlayer();
                break;
        }
    }
    setVolume(volume) {
        this.audio.volume = volume;
    }
    saveVolume(volume) {
        let roundedVolumeStr = (Math.round(volume * 10) / 10).toString();
        localforage.setItem('sc_volume', roundedVolumeStr);
    }
    playTrack(playQueueItem) {
        this.userAnalyticsService.trackEvent('play_track', 'click', 'audio-player-cmp');
        playQueueItem = playQueueItem || this.playQueue.getItem();
        if (playQueueItem) {
            playQueueItem.play();
        }
    }
    playTrackFromPosition(newTimeSec) {
        this.audio.currentTime = newTimeSec;
        this.playTrack(this.playQueue.getPlayingItem());
    }
    pauseTrack() {
        this.userAnalyticsService.trackEvent('pause_track', 'click', 'audio-player-cmp');
        let track = this.playQueue.getPlayingItem();
        if (track) {
            track.pause();
        }
        this.pauseAudioPlayer();
    }
    togglePlayPause() {
        let currItem = this.playQueue.getCurrentItem();
        if (currItem) {
            if (currItem.isPlaying()) {
                currItem.pause();
            }
            else {
                currItem.play();
            }
        }
    }
    previousTrack() {
        this.userAnalyticsService.trackEvent('next_track', 'click', 'audio-player-cmp');
        if (this.audio && this.audio.currentTime && this.audio.currentTime > 1) {
            this.playTrackFromPosition(0);
        }
        else {
            if (this.playQueue.hasPreviousItem()) {
                this.timeTick = 0;
                this.playTrack(this.playQueue.getPreviousItem());
            }
        }
    }
    nextTrack() {
        this.userAnalyticsService.trackEvent('previous_track', 'click', 'audio-player-cmp');
        if (this.playQueue.hasNextItem()) {
            this.timeTick = 0;
            this.playTrack(this.playQueue.getNextItem());
        }
    }
    startAudioPlayer(item) {
        let currTime = this.audio.currentTime;
        if (this.audio.src !== item.get('track').getResourceUrl()) {
            this.audio.src = item.get('track').getResourceUrl();
            this.audio.currentTime = 0;
        }
        if (this.hadError) {
            this.audio.src = item.get('track').getResourceUrl();
            this.audio.load();
            this.audio.currentTime = currTime;
        }
        if (item.get('track').get('comments').length === 0) {
            item.get('track').get('comments').fetch();
        }
        this.timeTick = this.audio.currentTime;
        this.audio.play();
        this.setMobileMediaNotification(item.get('track'));
    }
    pauseAudioPlayer() {
        this.audio.pause();
        this.isBuffering = false;
        this.cloudPlayerLogoService.pause();
    }
    stopAudioPlayer() {
        this.audio.pause();
        delete this.audio.src;
    }
};
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], AudioPlayerControlsComponent.prototype, "currentTimeChange", void 0);
AudioPlayerControlsComponent = __decorate([
    core_1.Component({
        selector: 'audio-player-controls',
        styles: [require('./audio-player-controls.style.scss')],
        template: require('./audio-player-controls.template.html')
    }), 
    __metadata('design:paramtypes', [cloud_player_logo_service_1.CloudPlayerLogoService, user_analytics_service_1.UserAnalyticsService])
], AudioPlayerControlsComponent);
exports.AudioPlayerControlsComponent = AudioPlayerControlsComponent;
//# sourceMappingURL=audio-player-controls.component.js.map