import {PlayQueueItem} from '../models/play_queue_item.model';
import {isArray} from 'underscore';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';

export class PlayQueue<TModel extends PlayQueueItem> extends SoundcloudCollection<TModel> {
  private static instance: PlayQueue<PlayQueueItem>;

  private playIndex = 0;

  model: any = PlayQueueItem;

  static getInstance(): PlayQueue<PlayQueueItem> {
    if (PlayQueue.instance) {
      return PlayQueue.instance;
    } else {
      PlayQueue.instance = new PlayQueue();
      return PlayQueue.instance;
    }
  }

  private getMiniItem(playQueueItem: PlayQueueItem): {} {
    let mini = playQueueItem.toJSON(true);
    mini.track = {
      id: mini.track.id
    };
    if (mini.status === 'PLAYING') {
      mini.status = 'PAUSED';
    }
    return mini;
  }

  private pushMiniItems(items: Array<PlayQueueItem>, allItems: Array<any>, maxItems?: number): Array<any> {
    items.forEach((item: PlayQueueItem) => {
      if (maxItems && allItems.length > maxItems) {
        return;
      }
      allItems.push(this.getMiniItem(item));
    });
    return allItems;
  }

  getScheduledItemsJSON(maxItems: number): Array<{}> {
    let allItems: Array<{}> = [],
      queuedItems = this.getQueuedItems(),
      scheduledItems = this.getScheduledItems();

    this.pushMiniItems(queuedItems, allItems, maxItems);
    this.pushMiniItems(scheduledItems, allItems, maxItems);
    return allItems;
  }

  getQueuedItems(): TModel[] {
    return this.where({status: 'QUEUED'});
  }

  getScheduledItems(): TModel[] {
    return this.filter((item: TModel) => {
      return item.isScheduled();
    });
  }

  getPlayingItem(): TModel {
    return this.findWhere({status: 'PLAYING'});
  }

  getPausedItem(): TModel {
    return this.findWhere({status: 'PAUSED'});
  }

  getCurrentItem(): TModel {
    return this.findWhere({status: 'PLAYING'}) || this.findWhere({status: 'PAUSED'});
  }

  getItem(): TModel {
    let pausedItem = this.getPausedItem();
    if (pausedItem) {
      return pausedItem;
    }
    let queuedItems = this.getQueuedItems();
    if (queuedItems.length > 0) {
      return queuedItems[0];
    } else {
      return this.find((playQueueItem: TModel) => {
        return playQueueItem.isScheduled();
      });
    }
  }

  hasNextItem(): boolean {
    return this.playIndex < this.length - 1;
  }

  hasPreviousItem(): boolean {
    return this.playIndex > 0;
  }

  hasCurrentItem(): boolean {
    return !!this.getCurrentItem();
  }

  getNextItem(): PlayQueueItem {
    if (this.hasNextItem()) {
      return this.at(this.playIndex + 1);
    }
  }

  getPreviousItem(): PlayQueueItem {
    if (this.hasPreviousItem()) {
      return this.at(this.playIndex - 1);
    }
  }

  addAndPlay(item: TModel|any): TModel {
    let addItem: TModel = this.add(item, {merge: true});
    addItem.play();
    return addItem;
  }

  queue(item: TModel|any): TModel {
    if (!(item instanceof PlayQueueItem)) {
      item = new PlayQueueItem(item);
    }
    if (this.get(item)) {
      this.remove(item, {silent: true});
    }
    item.queue();
    return this.add(item, {merge: true});
  }

  getPlayIndex(): number {
    return this.playIndex;
  }

  setPlayIndex(): number {
    let currentPlaylingItem = this.getCurrentItem();
    if (currentPlaylingItem) {
      this.playIndex = this.indexOf(currentPlaylingItem);
    }
    return this.playIndex;
  }

  ensureQueuingOrder(): void {
    let queuedItems = this.getQueuedItems();
    let incr = this.getCurrentItem() ? 1 : 0;
    queuedItems.forEach((item: TModel, index: number) => {
      this.remove(item, {silent: true});
      this.setPlayIndex();
      this.add(item, {at: this.getPlayIndex() + index + incr, silent: true, doNothing: true});
    });
  }

  stopScheduledItemsBeforeCurrentItem(): void {
    let scheduledItem = this.find((item: TModel) => {
      return item.isScheduled();
    });
    if (scheduledItem && this.indexOf(scheduledItem) < this.playIndex) {
      scheduledItem.stop();
      this.stopScheduledItemsBeforeCurrentItem();
    }
  }

  scheduleStoppedItemsAfterCurrentItem(scheduledItem: TModel): void {
    if (scheduledItem && scheduledItem.isStopped()) {
      let index = this.indexOf(scheduledItem);
      if (index > this.playIndex) {
        scheduledItem.set('status', 'NULL');
        this.scheduleStoppedItemsAfterCurrentItem(this.at(index - 1));
      }
    }
  }

  private prepareItem(item: any): PlayQueueItem {
    if (item instanceof PlayQueueItem) {
      item.set('id', item.get('track').get('id'));
    } else {
      item.id = item.track.id;
    }
    return item;
  }

  add(item: TModel|TModel[]|{}, options: any = {}): any {
    if (options.doNothing) {
      return super.add(item, options);
    }

    if (isArray(item)) {
      let addedItems: Array<PlayQueueItem> = [];
      item.forEach((obj: any) => {
        addedItems.push(this.prepareItem(obj));
      });
      item = addedItems;
    } else {
      item = this.prepareItem(item);
    }

    item = super.add(item, options);

    this.ensureQueuingOrder();
    this.setPlayIndex();

    return item;
  }

  initialize(): void {
    this.on('change:status', (queueItem: TModel) => {
      this.setPlayIndex();

      if (queueItem.isPlaying()) {
        this.filter((item: TModel) => {
          return item.isPlaying();
        }).forEach((playingQueueItem: PlayQueueItem) => {
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
