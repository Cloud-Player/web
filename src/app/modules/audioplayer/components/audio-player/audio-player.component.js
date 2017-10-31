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
const track_cover_component_1 = require('../../../shared/components/track-cover/track-cover.component');
let AudioPlayerComponent = class AudioPlayerComponent {
    getCoverSize() {
        return track_cover_component_1.CoverSizes.Large;
    }
    updateCurrentTime(val) {
        this.currentPlayingTime = val;
    }
    ngOnInit() {
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
        this.playQueue.on('add change:status', () => {
            if (this.playQueue.hasCurrentItem()) {
                let item = this.playQueue.getCurrentItem();
                if (item) {
                    this.track = item.get('track');
                }
            }
        });
    }
};
AudioPlayerComponent = __decorate([
    core_1.Component({
        selector: 'audio-player',
        styles: [require('./audio-player.style.scss')],
        template: require('./audio-player.template.html')
    }), 
    __metadata('design:paramtypes', [])
], AudioPlayerComponent);
exports.AudioPlayerComponent = AudioPlayerComponent;
//# sourceMappingURL=audio-player.component.js.map