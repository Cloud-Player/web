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
const forms_1 = require('@angular/forms');
const platform_browser_1 = require('@angular/platform-browser');
const playqueue_component_1 = require('./components/playqueue/playqueue.component');
const shared_module_1 = require('../shared/shared.module');
const audio_player_component_1 = require('./components/audio-player/audio-player.component');
const audio_player_controls_component_1 = require('./components/audio-player-controls/audio-player-controls.component');
const underscore_1 = require('underscore');
const localforage = require('localforage');
const play_queue_collection_1 = require('./collections/play_queue.collection');
const tracks_collection_1 = require('../tracks/collections/tracks.collection');
const comments_module_1 = require('../comments/comments.module');
let AudioPlayerModule = class AudioPlayerModule {
    constructor() {
        let playQueue = play_queue_collection_1.PlayQueue.getInstance();
        localforage.getItem('sc_playqueue').then((playQueueItems) => {
            playQueue.add(playQueueItems);
            if (playQueue.length > 0) {
                let playQueueItemTracks = playQueue.map((item) => {
                    return {
                        id: item.id
                    };
                });
                let tmpTracks = new tracks_collection_1.Tracks();
                tmpTracks.add(playQueueItemTracks);
                if (tmpTracks.length > 0) {
                    tmpTracks.refresh().then(function (tracks) {
                        tracks.forEach((track) => {
                            playQueue.add({ track: track }, { merge: true, silent: true });
                        });
                    });
                }
            }
        });
        let debouncedPlayQueueSave = underscore_1.debounce(() => {
            localforage.setItem('sc_playqueue', playQueue.getScheduledItemsJSON(30));
        }, 1000);
        playQueue.on('add remove reset change:status', debouncedPlayQueueSave);
    }
};
AudioPlayerModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            shared_module_1.SharedModule,
            comments_module_1.CommentsModule
        ],
        declarations: [
            audio_player_controls_component_1.AudioPlayerControlsComponent,
            audio_player_component_1.AudioPlayerComponent,
            playqueue_component_1.PlayQueueComponent
        ],
        exports: [
            audio_player_component_1.AudioPlayerComponent
        ]
    }), 
    __metadata('design:paramtypes', [])
], AudioPlayerModule);
exports.AudioPlayerModule = AudioPlayerModule;
//# sourceMappingURL=audio-player.module.js.map