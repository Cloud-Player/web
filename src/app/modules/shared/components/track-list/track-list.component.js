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
const tracks_collection_1 = require('../../../tracks/collections/tracks.collection');
const play_queue_collection_1 = require('../../../audioplayer/collections/play_queue.collection');
const track_cover_component_1 = require('../track-cover/track-cover.component');
const client_detector_service_1 = require('../../services/client-detector.service');
let TrackListComponent = class TrackListComponent {
    constructor(router) {
        this.router = router;
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
    }
    gotoDetail(track) {
        let link = ['/tracks', track.id];
        this.router.navigate(link);
    }
    addToQueue(track) {
        this.playQueue.queue({ track: track });
    }
    getSize() {
        if (client_detector_service_1.ClientDetector.isMobileDevice()) {
            return track_cover_component_1.CoverSizes.Small;
        }
        else {
            return track_cover_component_1.CoverSizes.Regular;
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', tracks_collection_1.Tracks)
], TrackListComponent.prototype, "tracks", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], TrackListComponent.prototype, "canBeDeleted", void 0);
TrackListComponent = __decorate([
    core_1.Component({
        selector: 'track-list',
        styles: [require('./track-list.style.scss')],
        template: require('./track-list.template.html'),
        providers: [tracks_collection_1.Tracks]
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], TrackListComponent);
exports.TrackListComponent = TrackListComponent;
//# sourceMappingURL=track-list.component.js.map