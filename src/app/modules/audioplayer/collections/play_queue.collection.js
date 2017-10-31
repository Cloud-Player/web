"use strict";
const play_queue_item_model_1 = require('../models/play_queue_item.model');
const underscore_1 = require('underscore');
const soundcloud_collection_1 = require('../../shared/collections/soundcloud.collection');
class PlayQueue extends soundcloud_collection_1.SoundcloudCollection {
    constructor() {
        super(...arguments);
        this.playIndex = 0;
        this.model = play_queue_item_model_1.PlayQueueItem;
    }
    static getInstance() {
        if (PlayQueue.instance) {
            return PlayQueue.instance;
        }
        else {
            PlayQueue.instance = new PlayQueue();
            return PlayQueue.instance;
        }
    }
    getMiniItem(playQueueItem) {
        let mini = playQueueItem.toJSON(true);
        mini.track = {
            id: mini.track.id
        };
        if (mini.status === 'PLAYING') {
            mini.status = 'PAUSED';
        }
        return mini;
    }
    pushMiniItems(items, allItems, maxItems) {
        items.forEach((item) => {
            if (maxItems && allItems.length > maxItems) {
                return;
            }
            allItems.push(this.getMiniItem(item));
        });
        return allItems;
    }
    getScheduledItemsJSON(maxItems) {
        let allItems = [], queuedItems = this.getQueuedItems(), scheduledItems = this.getScheduledItems();
        this.pushMiniItems(queuedItems, allItems, maxItems);
        this.pushMiniItems(scheduledItems, allItems, maxItems);
        return allItems;
    }
    getQueuedItems() {
        return this.where({ status: 'QUEUED' });
    }
    getScheduledItems() {
        return this.filter((item) => {
            return item.isScheduled();
        });
    }
    getPlayingItem() {
        return this.findWhere({ status: 'PLAYING' });
    }
    getPausedItem() {
        return this.findWhere({ status: 'PAUSED' });
    }
    getCurrentItem() {
        return this.findWhere({ status: 'PLAYING' }) || this.findWhere({ status: 'PAUSED' });
    }
    getItem() {
        let pausedItem = this.getPausedItem();
        if (pausedItem) {
            return pausedItem;
        }
        let queuedItems = this.getQueuedItems();
        if (queuedItems.length > 0) {
            return queuedItems[0];
        }
        else {
            return this.find((playQueueItem) => {
                return playQueueItem.isScheduled();
            });
        }
    }
    hasNextItem() {
        return this.playIndex < this.length - 1;
    }
    hasPreviousItem() {
        return this.playIndex > 0;
    }
    hasCurrentItem() {
        return !!this.getCurrentItem();
    }
    getNextItem() {
        if (this.hasNextItem()) {
            return this.at(this.playIndex + 1);
        }
    }
    getPreviousItem() {
        if (this.hasPreviousItem()) {
            return this.at(this.playIndex - 1);
        }
    }
    addAndPlay(item) {
        let addItem = this.add(item, { merge: true });
        addItem.play();
        return addItem;
    }
    queue(item) {
        if (!(item instanceof play_queue_item_model_1.PlayQueueItem)) {
            item = new play_queue_item_model_1.PlayQueueItem(item);
        }
        if (this.get(item)) {
            this.remove(item, { silent: true });
        }
        item.queue();
        return this.add(item, { merge: true });
    }
    getPlayIndex() {
        return this.playIndex;
    }
    setPlayIndex() {
        let currentPlaylingItem = this.getCurrentItem();
        if (currentPlaylingItem) {
            this.playIndex = this.indexOf(currentPlaylingItem);
        }
        return this.playIndex;
    }
    ensureQueuingOrder() {
        let queuedItems = this.getQueuedItems();
        let incr = this.getCurrentItem() ? 1 : 0;
        queuedItems.forEach((item, index) => {
            this.remove(item, { silent: true });
            this.setPlayIndex();
            this.add(item, { at: this.getPlayIndex() + index + incr, silent: true, doNothing: true });
        });
    }
    stopScheduledItemsBeforeCurrentItem() {
        let scheduledItem = this.find((item) => {
            return item.isScheduled();
        });
        if (scheduledItem && this.indexOf(scheduledItem) < this.playIndex) {
            scheduledItem.stop();
            this.stopScheduledItemsBeforeCurrentItem();
        }
    }
    scheduleStoppedItemsAfterCurrentItem(scheduledItem) {
        if (scheduledItem && scheduledItem.isStopped()) {
            let index = this.indexOf(scheduledItem);
            if (index > this.playIndex) {
                scheduledItem.set('status', 'NULL');
                this.scheduleStoppedItemsAfterCurrentItem(this.at(index - 1));
            }
        }
    }
    prepareItem(item) {
        if (!item.id && item instanceof play_queue_item_model_1.PlayQueueItem) {
            item.set('id', item.get('track').get('id'));
        }
        else if (!item.id) {
            item.id = item.track.id;
        }
        return item;
    }
    add(item, options = {}) {
        if (options.doNothing || !item) {
            return super.add(item, options);
        }
        if (underscore_1.isArray(item)) {
            let addedItems = [];
            item.forEach((obj) => {
                addedItems.push(this.prepareItem(obj));
            });
            item = addedItems;
        }
        else {
            item = this.prepareItem(item);
        }
        item = super.add(item, options);
        this.ensureQueuingOrder();
        this.setPlayIndex();
        return item;
    }
    initialize() {
        this.on('change:status', (queueItem) => {
            this.setPlayIndex();
            if (queueItem.isPlaying()) {
                this.filter((item) => {
                    return item.isPlaying() || item.isPaused();
                }).forEach((playingQueueItem) => {
                    if (playingQueueItem.id !== queueItem.id) {
                        playingQueueItem.stop();
                    }
                });
                if (this.hasPreviousItem() && this.getPreviousItem().isScheduled()) {
                    this.stopScheduledItemsBeforeCurrentItem();
                }
                this.ensureQueuingOrder();
            }
            if (queueItem.isStopped()) {
                this.scheduleStoppedItemsAfterCurrentItem(queueItem);
            }
        });
        this.on('remove', () => {
            this.setPlayIndex();
        });
    }
}
exports.PlayQueue = PlayQueue;
//# sourceMappingURL=play_queue.collection.js.map