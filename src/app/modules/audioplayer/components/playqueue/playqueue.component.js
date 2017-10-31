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
const user_analytics_service_1 = require('../../../user-analytics/services/user-analytics.service');
let PlayQueueComponent = class PlayQueueComponent {
    constructor(userAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
        this.coverSize = track_cover_component_1.CoverSizes.Medium;
        this.dropTrack = (dropData) => {
            this.userAnalyticsService.trackEvent('drop_track', 'drag-and-drop', 'play-queue');
            if (this.playQueue.length > 0) {
                this.playQueue.queue({ track: dropData });
            }
            else {
                this.playQueue.addAndPlay({ track: dropData });
            }
        };
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
        this.playQueue.on('add', (playQueueItem) => {
            if (playQueueItem.isQueued()) {
                this.userAnalyticsService.trackEvent('queue_track', 'add', 'play-queue');
            }
        });
    }
};
PlayQueueComponent = __decorate([
    core_1.Component({
        selector: 'play-queue',
        styles: [require('./playqueue.style.scss')],
        template: require('./playqueue.template.html')
    }), 
    __metadata('design:paramtypes', [user_analytics_service_1.UserAnalyticsService])
], PlayQueueComponent);
exports.PlayQueueComponent = PlayQueueComponent;
//# sourceMappingURL=playqueue.component.js.map