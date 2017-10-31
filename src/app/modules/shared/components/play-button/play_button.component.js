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
const tracks_collection_1 = require('../../../tracks/collections/tracks.collection');
const play_queue_collection_1 = require('../../../audioplayer/collections/play_queue.collection');
let PlayButtonComponent = class PlayButtonComponent {
    constructor() {
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
    }
    isPlaying() {
        let playingItem = this.playQueue.getPlayingItem();
        return (playingItem && playingItem.get('track').get('id') === this.track.get('id'));
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', track_model_1.Track)
], PlayButtonComponent.prototype, "track", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', tracks_collection_1.Tracks)
], PlayButtonComponent.prototype, "tracks", void 0);
PlayButtonComponent = __decorate([
    core_1.Component({
        selector: 'play-button',
        styles: [require('./play_button.style.scss')],
        template: require('./play_button.template.html')
    }), 
    __metadata('design:paramtypes', [])
], PlayButtonComponent);
exports.PlayButtonComponent = PlayButtonComponent;
//# sourceMappingURL=play_button.component.js.map