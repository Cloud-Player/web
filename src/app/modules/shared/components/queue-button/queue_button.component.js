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
let QueueButtonComponent = class QueueButtonComponent {
    constructor() {
        this.playQueue = play_queue_collection_1.PlayQueue.getInstance();
    }
    isQueued() {
        let queuedItems = this.playQueue.getQueuedItems();
        if (queuedItems && queuedItems.find((item) => {
            return item.get('track').get('id') === this.track.id;
        })) {
            return true;
        }
        else {
            return false;
        }
    }
    queue() {
        this.playQueue.queue({ track: this.track });
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', track_model_1.Track)
], QueueButtonComponent.prototype, "track", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', tracks_collection_1.Tracks)
], QueueButtonComponent.prototype, "tracks", void 0);
QueueButtonComponent = __decorate([
    core_1.Component({
        selector: 'queue-button',
        styles: [require('./queue_button.style.scss')],
        template: require('./queue_button.template.html')
    }), 
    __metadata('design:paramtypes', [])
], QueueButtonComponent);
exports.QueueButtonComponent = QueueButtonComponent;
//# sourceMappingURL=queue_button.component.js.map