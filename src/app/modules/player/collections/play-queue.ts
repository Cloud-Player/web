import {isArray} from 'underscore';
import {PlayQueueItemStatus} from '../src/playqueue-item-status.enum';
import {PlayQueueItem} from '../models/play-queue-item';
import {BaseCollection} from '../../backbone/collections/base.collection';

export class PlayQueue<TModel extends PlayQueueItem> extends BaseCollection<TModel> {
  private static _instance: PlayQueue<PlayQueueItem>;
  private _playIndex = 0;
  private _loopPlayQueue = false;

  model: any = PlayQueueItem;

  static getInstance(): PlayQueue<PlayQueueItem> {
    if (PlayQueue._instance) {
      return PlayQueue._instance;
    } else {
      PlayQueue._instance = new PlayQueue();
      return PlayQueue._instance;
    }
  }

  private pushMiniItems(items: Array<PlayQueueItem>, allItems: Array<any>, maxItems?: number): Array<any> {
    items.forEach((item: PlayQueueItem) => {
      if (maxItems && allItems.length > maxItems) {
        return;
      }
      allItems.push(item.toMiniJSON());
    });
    return allItems;
  }

  private prepareItem(item: any): PlayQueueItem {
    if (!item.id && item instanceof PlayQueueItem) {
      item.set('id', item.track.id);
    } else if (!item.id) {
      item.id = item.track.id;
    }

    return item;
  }

  private setPlayIndex(): number {
    const currentPlaylingItem = this.getPlayingItem();
    if (currentPlaylingItem) {
      this._playIndex = this.indexOf(currentPlaylingItem);
    }
    return this._playIndex;
  }

  getScheduledItemsJSON(maxItems: number): Array<{}> {
    const allItems: Array<{}> = [],
      queuedItems = this.getQueuedItems(),
      scheduledItems = this.getScheduledItems();

    this.pushMiniItems(queuedItems, allItems, maxItems);
    this.pushMiniItems(scheduledItems, allItems, maxItems);
    return allItems;
  }

  getQueuedItems(): TModel[] {
    return this.where({status: PlayQueueItemStatus.Queued});
  }

  getScheduledItems(): TModel[] {
    return this.filter((item: TModel) => {
      return item.isScheduled();
    });
  }

  getPlayingItem(): TModel {
    return this.find(item => item.isPlaying());
  }

  getPausedItem(): TModel {
    return this.find(item => item.isPaused());
  }

  getCurrentItem(): TModel {
    return this.at(this._playIndex);
  }

  getItem(): TModel {
    const pausedItem = this.getPausedItem();
    if (pausedItem) {
      return pausedItem;
    }
    const queuedItems = this.getQueuedItems();
    if (queuedItems.length > 0) {
      return queuedItems[0];
    } else {
      return this.find((playQueueItem: TModel) => {
        return playQueueItem.isScheduled();
      });
    }
  }

  hasNextItem(): boolean {
    if (this._loopPlayQueue) {
      return true;
    } else {
      return this._playIndex < this.length - 1;
    }
  }

  hasPreviousItem(): boolean {
    return this._playIndex > 0;
  }

  hasCurrentItem(): boolean {
    return !!this.getCurrentItem();
  }

  getRequestedPlayingItem() {
    return this.find((playQueueItem) => {
      return playQueueItem.status === PlayQueueItemStatus.RequestedPlaying;
    });
  }

  getNextItem(): PlayQueueItem {
    if (this.hasNextItem()) {
      const total = this.length;
      const next = (total + this._playIndex + 1) % total;
      return this.at(next);
    }
  }

  getPreviousItem(): PlayQueueItem {
    if (this.hasPreviousItem()) {
      return this.at(this._playIndex - 1);
    }
  }

  addAndPlay(item: TModel | any): TModel {
    const addItem = this.add(item, {merge: true});
    addItem.play();
    return addItem;
  }

  queue(item: TModel | any): TModel {
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
    return this._playIndex;
  }

  ensureQueuingOrder(): void {
    const queuedItems = this.getQueuedItems();
    const incr = this.getCurrentItem() ? 1 : 0;
    queuedItems.forEach((item: TModel, index: number) => {
      this.remove(item, {silent: true});
      this.setPlayIndex();
      this.add(item, {at: this.getPlayIndex() + index + incr, silent: true, doNothing: true});
    });
  }

  stopScheduledItemsBeforeCurrentItem(): void {
    const scheduledItem = this.find((item: TModel) => {
      return item.isScheduled();
    });
    if (scheduledItem && this.indexOf(scheduledItem) < this._playIndex) {
      scheduledItem.stop();
      this.stopScheduledItemsBeforeCurrentItem();
    }
  }

  scheduleStoppedItemsAfterCurrentItem(scheduledItem: TModel): void {
    if (scheduledItem && scheduledItem.isStopped()) {
      const index = this.indexOf(scheduledItem);
      if (index > this._playIndex) {
        scheduledItem.set('status', PlayQueueItemStatus.Scheduled);
        this.scheduleStoppedItemsAfterCurrentItem(this.at(index - 1));
      }
    }
  }

  setLoopPlayQueue(allowedToLoop: boolean) {
    this._loopPlayQueue = allowedToLoop;
  }

  add(item: TModel | TModel[] | {}, options: any = {}): any {
    if (options.doNothing || !item) {
      return super.add(item, options);
    }

    if (isArray(item)) {
      const addedItems: Array<PlayQueueItem> = [];
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
          return item.isPlaying() || item.isPaused();
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
        queueItem.progress = 0;
        this.scheduleStoppedItemsAfterCurrentItem(queueItem);
      }
    });

    this.on('remove', () => {
      this.setPlayIndex();
    });
  }
}
