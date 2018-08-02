import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';
import {PlayqueueItemAuxappModel} from './playqueue-item-auxapp.model';
import {isArray, shuffle, sortBy} from 'underscore';
import {PlayQueueItemStatus} from '../../../player/src/playqueue-item-status.enum';

export class PlayqueueItemsAuxappCollection<TModel extends PlayqueueItemAuxappModel>
  extends PlaylistItemsAuxappCollection<TModel> {

  private _playIndex = 0;
  private _loopPlayQueue = false;
  private _isShuffled = false;

  endpoint = null;
  model: any = PlayqueueItemAuxappModel;
  playQueueId: number;

  setEndpoint(playqueueId: number) {
    this.endpoint = `/queue/${playqueueId}/item`;
    this.playQueueId = playqueueId;
  }

  private prepareItem(item: any): PlayqueueItemAuxappModel {
    if (!item.id && item instanceof PlayqueueItemAuxappModel) {
      item.set('id', item.track.id);
    } else if (!item.id) {
      item.id = item.track.id;
    }

    if (!(item instanceof PlayqueueItemAuxappModel) && item.indexBeforeShuffle) {
      this._isShuffled = true;
    }

    return item;
  }

  private setPlayIndex(): number {
    const currentPlaylingItem = this.getPlayingItem();
    const oldPlayIndex = this._playIndex;
    if (currentPlaylingItem) {
      this._playIndex = this.indexOf(currentPlaylingItem);
    }
    if (this._playIndex !== oldPlayIndex) {
      this.trigger('change:playIndex');
    }
    return this._playIndex;
  }

  private pushMiniItems(items: Array<PlayqueueItemAuxappModel>, allItems: Array<any>, maxItems?: number): Array<any> {
    items.forEach((item: PlayqueueItemAuxappModel) => {
      if (maxItems && allItems.length > maxItems) {
        return;
      }
      allItems.push(item.toMiniJSON());
    });
    return allItems;
  }

  getScheduledItemsJSON(maxItems: number): Array<{}> {
    const allItems: Array<{}> = [],
      queuedItems = this.getQueuedItems(),
      scheduledItems = this.getScheduledItems();

    this.pushMiniItems(queuedItems, allItems, maxItems);
    this.pushMiniItems(scheduledItems, allItems, maxItems);
    return allItems;
  }

  getItemByTrackId(trackId: number | string): TModel {
    return this.find(item => item.track.id === trackId);
  }

  getQueuedItems(): TModel[] {
    return this.where({status: PlayQueueItemStatus.Queued});
  }

  getScheduledItems(): TModel[] {
    return this.filter((item: TModel) => {
      return item.isScheduled();
    });
  }

  getStoppedItems(): TModel[] {
    return this.filter((item: TModel) => {
      return item.isStopped();
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
    if (this.length === 0) {
      return false;
    } else if (this._loopPlayQueue) {
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

  getNextItem(): PlayqueueItemAuxappModel {
    if (this.hasNextItem()) {
      const total = this.length;
      const next = (total + this._playIndex + 1) % total;
      return this.at(next);
    }
  }

  getPreviousItem(): PlayqueueItemAuxappModel {
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
    if (!(item instanceof PlayqueueItemAuxappModel)) {
      item = new PlayqueueItemAuxappModel(item);
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

  shuffle(): any {
    let items = [];
    let orgIndex = 0;
    const currentItem = this.getCurrentItem();
    const scheduledItems = this.getScheduledItems();
    if (currentItem) {
      if (!currentItem.indexBeforeShuffle) {
        currentItem.indexBeforeShuffle = orgIndex++;
      }
    }
    scheduledItems.forEach((item) => {
      if (!item.indexBeforeShuffle) {
        item.indexBeforeShuffle = orgIndex;
      }
      orgIndex++;
      items.push(item);
      this.remove(item, {silent: true});
    });
    items = shuffle(items);
    this.add(items, {silent: true});
    this._isShuffled = true;
    this.trigger('change:shuffle', this._isShuffled, this);
  }

  deShuffle() {
    const items = this.getScheduledItems();
    items.push(this.getCurrentItem());
    const sorted = sortBy(items, 'indexBeforeShuffle');
    sorted.forEach((item) => {
      this.remove(item, {silent: true});
      this.add(item, {at: item.indexBeforeShuffle, silent: true});
    });
    this.setPlayIndex();
    this.ensureQueuingOrder();
    this.stopScheduledItemsBeforeCurrentItem();
    this._isShuffled = false;
    this.trigger('change:shuffle', this._isShuffled, this);
  }

  isShuffled(): boolean {
    return this._isShuffled;
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
    this.trigger('change:loop', this._loopPlayQueue, this);
  }

  public isLooped() {
    return this._loopPlayQueue;
  }

  resetQueue() {
    this.filter((model) => {
      return !model.isQueued();
    }).forEach((model) => {
      this.remove(model);
    });
    this._isShuffled = false;
  }

  add(item: TModel | TModel[] | {}, options: any = {}): any {
    if (options.doNothing || !item) {
      return super.add(item, options);
    }

    if (isArray(item)) {
      const addedItems: Array<PlayqueueItemAuxappModel> = [];
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
        }).forEach((playingQueueItem: PlayqueueItemAuxappModel) => {
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
