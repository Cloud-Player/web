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
const track_model_1 = require('../../tracks/models/track.model');
const tracks_collection_1 = require('../../tracks/collections/tracks.collection');
const play_queue_collection_1 = require('../../audioplayer/collections/play_queue.collection');
let PlayTrackOnEventDirective = class PlayTrackOnEventDirective {
    constructor(el) {
        this.el = el;
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
    }
    registerListener(event) {
        this.el.nativeElement.addEventListener(event, () => {
            if (this.isPlaying()) {
                this.pause();
            }
            else {
                this.play();
            }
        });
    }
    isPlaying() {
        let playingItem = this.playQueue.getPlayingItem();
        return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
    }
    play() {
        this.playQueue.filter((model) => {
            return !model.isQueued();
        }).forEach((model) => {
            this.playQueue.remove(model);
        });
        if (this.tracks) {
            this.tracks.forEach((track) => {
                if (!this.playQueue.get(track)) {
                    this.playQueue.add({ track: track });
                }
            });
        }
        let playQueueItem = this.playQueue.add({ track: this.track });
        playQueueItem.play();
    }
    pause() {
        if (this.isPlaying()) {
            play_queue_collection_1.PlayQueue.getInstance().getPlayingItem().pause();
        }
    }
    ngOnInit() {
        this.el.nativeElement.style.cursor = 'pointer';
        if (this.playTrackOn) {
            this.registerListener(this.playTrackOn);
        }
        else if (this.events) {
            this.events.forEach((ev) => {
                this.registerListener(ev);
            });
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], PlayTrackOnEventDirective.prototype, "playTrackOn", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', track_model_1.Track)
], PlayTrackOnEventDirective.prototype, "track", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], PlayTrackOnEventDirective.prototype, "events", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', tracks_collection_1.Tracks)
], PlayTrackOnEventDirective.prototype, "tracks", void 0);
PlayTrackOnEventDirective = __decorate([
    core_1.Directive({
        selector: '[playTrackOn]'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef])
], PlayTrackOnEventDirective);
exports.PlayTrackOnEventDirective = PlayTrackOnEventDirective;
//# sourceMappingURL=play-track-on-event.directive.js.map