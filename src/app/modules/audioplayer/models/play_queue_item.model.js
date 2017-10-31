"use strict";
const track_model_1 = require('../../tracks/models/track.model');
const soundcloud_model_1 = require('../../shared/models/soundcloud.model');
class PlayQueueItem extends soundcloud_model_1.SoundcloudModel {
    defaults() {
        return {
            status: 'NULL'
        };
    }
    nested() {
        return {
            track: track_model_1.Track
        };
    }
    ;
    queue() {
        this.set({
            status: 'QUEUED'
        });
    }
    unQueue() {
        this.set({
            status: 'NULL'
        });
        if (this.collection) {
            let collection = this.collection;
            collection.remove(this);
            collection.add(this);
        }
    }
    play() {
        this.set('status', 'PLAYING');
    }
    pause() {
        this.set('status', 'PAUSED');
    }
    stop() {
        this.set('status', 'STOPPED');
    }
    isQueued() {
        return this.get('status') === 'QUEUED';
    }
    isPlaying() {
        return this.get('status') === 'PLAYING';
    }
    isPaused() {
        return this.get('status') === 'PAUSED';
    }
    isStopped() {
        return this.get('status') === 'STOPPED';
    }
    isScheduled() {
        return this.get('status') === 'NULL';
    }
}
exports.PlayQueueItem = PlayQueueItem;
//# sourceMappingURL=play_queue_item.model.js.map