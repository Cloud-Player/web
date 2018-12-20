import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';
import {PlayqueueItemAuxappModel} from './playqueue-item-auxapp.model';
import {debounce, isArray, shuffle, sortBy} from 'underscore';
import {PlayQueueItemStatus} from '../../../player/src/playqueue-item-status.enum';
import {TracksAuxappCollection} from '../../tracks/tracks-auxapp.collection';

export class PlayqueueItemsAuxappCollection<TModel extends PlayqueueItemAuxappModel>
  extends PlaylistItemsAuxappCollection<TModel> {

  private _playIndex;
  private _loopPlayQueue = false;
  private _isShuffled = false;
  private _playRecommended = false;
  private _recommandationsBasedOnItem: PlayqueueItemAuxappModel;
  private _initialItem: PlayqueueItemAuxappModel;

  queryParams = {
    size: 100
  };

  endpoint = null;
  model: any = PlayqueueItemAuxappModel;
  playQueueId: string;

  setEndpoint(playqueueId: string) {
    this.endpoint = `/queue/${playqueueId}/item`;
    this.playQueueId = playqueueId;
  }

  private prepareItem(item: any): PlayqueueItemAuxappModel {
    if (!(item instanceof PlayqueueItemAuxappModel) && item.indexBeforeShuffle) {
      this._isShuffled = true;
    }

    return item;
  }

  private _getPlayIndex() {
    const currentPlaylingItem = this.getPlayingItem() || this.getPausedItem();
    if (currentPlaylingItem) {
      return this.indexOf(currentPlaylingItem);
    } else {
      return -1;
    }
  }

  public setPlayIndex(playQueueItem: TModel): number {
    const currentPlaylingItem = playQueueItem;
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

  getRecommendedItems() {
    return this.filter((playQueueItem) => {
      return playQueueItem.isRecommended();
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
    if (this.getItemByTrackId(item.track.id)) {
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
    const currentPlaying = <TModel>this.at(this._playIndex);
    const items = this.getScheduledItems();
    items.push(this.getCurrentItem());
    const sorted = sortBy(items, 'indexBeforeShuffle');
    sorted.forEach((item) => {
      this.remove(item, {silent: true});
      this.add(item, {at: item.indexBeforeShuffle, silent: true});
    });
    this.setPlayIndex(currentPlaying);
    this.ensureQueuingOrder();
    this.stopScheduledItemsBeforeCurrentItem({
      enforceStop: false,
      silent: true
    });
    this._isShuffled = false;
    this.trigger('change:shuffle', this._isShuffled, this);
  }

  isShuffled(): boolean {
    return this._isShuffled;
  }

  ensureQueuingOrder(): void {
    if (!this._playIndex) {
      return;
    }
    const currentPlaying = <TModel>this.at(this._playIndex);
    const queuedItems = this.getQueuedItems();
    const incr = this.getCurrentItem() ? 1 : 0;
    const currentItem = <PlayqueueItemAuxappModel>this.at(this._playIndex);
    queuedItems.forEach((item: TModel, index: number) => {
      this.remove(item, {silent: true});
      this.add(item, {at: this.getPlayIndex() + index + incr, silent: true, doNothing: true});
    });

    const recommendedItems = this.getRecommendedItems();
    let incr2: number;

    if (this._playRecommended) {
      incr2 = incr + this.getQueuedItems().length;
    } else {
      incr2 = this.length;
    }

    recommendedItems.forEach((item: TModel, index: number) => {
      this.remove(item, {silent: true});
      this.add(item, {at: this.getPlayIndex() + index + incr2, silent: true, doNothing: true});
    });
    this.setPlayIndex(currentPlaying);
  }

  stopItemsBeforeAndScheduleAfter(item: TModel) {
    const existing = this.get(item);
    if (existing) {
      const indexOfExisting = this.indexOf(existing);
      this.each((playqueueItem, index) => {
        if (index < indexOfExisting) {
          if (!playqueueItem.isStopped()) {
            playqueueItem.stop();
          }
        } else if (index > indexOfExisting) {
          if (playqueueItem.isPaused() || playqueueItem.isPlaying() || playqueueItem.isStopped()) {
            playqueueItem.schedule();
          }
        }
      });
    }
  }

  stopScheduledItemsBeforeCurrentItem(options: {
    enforceStop: boolean,
    silent: boolean
  }): void {
    const scheduledItem = this.find((item: TModel) => {
      return item.isScheduled();
    });
    if (scheduledItem && this.indexOf(scheduledItem) < this._playIndex) {
      scheduledItem.stop(options);
      this.stopScheduledItemsBeforeCurrentItem(options);
    }
  }

  setLoopPlayQueue(allowedToLoop: boolean) {
    this._loopPlayQueue = allowedToLoop;
    this.trigger('change:loop', this._loopPlayQueue, this);
  }

  public isLooped() {
    return this._loopPlayQueue;
  }

  public fetchTrackDetails() {
    const trackWithOutDetails = [];
    this.each((item) => {
      if (!item.track.title) {
        trackWithOutDetails.push({
          id: item.track.id,
          provider_id: item.track.provider_id
        });
      }
    });
    if (trackWithOutDetails.length > 0) {
      return TracksAuxappCollection.getTrackDetails(trackWithOutDetails).then((tracksWithDetails: Array<any>) => {
        tracksWithDetails.forEach((trackWithDetail) => {
          const existingItem = this.getItemByTrackId(trackWithDetail.id);
          if (existingItem) {
            existingItem.track.set(existingItem.track.parse(trackWithDetail));
            existingItem.trigger('change:track');
          }
        });
      });
    }
  }

  public fetchRecommendedItems() {
    return Promise.resolve();
  }

  public enableRecommendedTracks(enable: boolean) {
    this._playRecommended = enable;
    this.ensureQueuingOrder();
  }

  public isPlayingRecommendedTracks() {
    return this._playRecommended;
  }

  public setInitialItem(item: PlayqueueItemAuxappModel) {
    this._initialItem = item;
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
    return item;
  }

  parse(items) {
    if (isArray(items)) {
      const cleanedUp = [];
      items.forEach((item, index) => {
        if (item.id && item.track && item.track.provider_id) {
          if (item.state === PlayQueueItemStatus.Playing) {
            item.state = PlayQueueItemStatus.Paused;
          }
          if (item.state === PlayQueueItemStatus.Stopped) {
            item.state = PlayQueueItemStatus.Scheduled;
          }
          cleanedUp.push(item);
        }
      });
      return cleanedUp;
    } else {
      return items;
    }
  }


  initialize(): void {
    this.on('add change:status', (queueItem: TModel) => {
      if (queueItem.isQueued()) {
        this.ensureQueuingOrder();
      }
    });

    this.on('remove', () => {
      const currentItem = <TModel>this.at(this._playIndex);
      this.setPlayIndex(currentItem);
    });

    const debouncedTrackDetailsFetch = debounce(this.fetchTrackDetails.bind(this), 500);
    this.on('add', debouncedTrackDetailsFetch);
    this.on('sync', (itemOrItems) => {
      if (itemOrItems instanceof PlayqueueItemsAuxappCollection) {
        if (!this._playIndex) {
          const playingOrPaused = <TModel>itemOrItems
            .find(item => item.isPlaying() || item.isPaused());
          if (playingOrPaused) {
            this._playIndex = this.indexOf(playingOrPaused);
          } else {
            this._playIndex = 0;
          }
        }
        let currentItem = <TModel>this.at(this._playIndex);
        if (this._initialItem) {
          const existingInitialItem = this.get(this._initialItem);
          if (existingInitialItem && existingInitialItem === currentItem) {
            currentItem.seekTo(existingInitialItem.progress);
          } else {
            currentItem = this.add(this._initialItem, {at: this._playIndex});
          }
          this._initialItem = null;
          this.setPlayIndex(currentItem);
        }
        this.ensureQueuingOrder();
      }
    });
  }
}
