import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';
import {PlayqueueItemAuxappModel} from './playqueue-item-auxapp.model';
import {debounce, isArray, shuffle, sortBy} from 'underscore';
import {PlayQueueItemStatus} from '../../../player/src/playqueue-item-status.enum';
import {TracksAuxappCollection} from '../../tracks/tracks-auxapp.collection';

export class PlayqueueItemsAuxappCollection<TModel extends PlayqueueItemAuxappModel>
  extends PlaylistItemsAuxappCollection<TModel> {

  private _playIndex = 0;
  private _loopPlayQueue = false;
  private _isShuffled = false;
  private _playRecommended = false;
  private _recommandationsBasedOnItem: PlayqueueItemAuxappModel;
  private _initialItem: PlayqueueItemAuxappModel;

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

  private setPlayIndex(): number {
    const currentPlaylingItem = this.getPlayingItem() || this.getPausedItem();
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
    const items = this.getScheduledItems();
    items.push(this.getCurrentItem());
    const sorted = sortBy(items, 'indexBeforeShuffle');
    sorted.forEach((item) => {
      this.remove(item, {silent: true});
      this.add(item, {at: item.indexBeforeShuffle, silent: true});
    });
    this.setPlayIndex();
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
    const queuedItems = this.getQueuedItems();
    const incr = this.getCurrentItem() ? 1 : 0;
    queuedItems.forEach((item: TModel, index: number) => {
      this.remove(item, {silent: true});
      this.setPlayIndex();
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
      this.setPlayIndex();
      this.add(item, {at: this.getPlayIndex() + index + incr2, silent: true, doNothing: true});
    });
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

  public fetchTrackDetails() {
    const trackWithOutDetails = [];
    this.each((item) => {
      if (!item.track.title) {
        trackWithOutDetails.push({
          id: item.track.id,
          provider_id: item.track.provider
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
    if (
      // this.getRecommendedItems().length > 0 ||
      (this._recommandationsBasedOnItem && this._recommandationsBasedOnItem === this.getCurrentItem())
    ) {
      this._recommandationsBasedOnItem = this.getCurrentItem();
      return new Promise((resolve) => {
        resolve(this);
      });
    } else {
      this._recommandationsBasedOnItem = this.getCurrentItem();
      return this.request(`/queue/${this.playQueueId}/reco`, 'GET').then((recommendedTracks) => {
        const recommendedItems = [];
        recommendedTracks.forEach((recommendedTrack) => {
          const recommendedItem = {
            track: recommendedTrack.track,
            status: PlayQueueItemStatus.Recommended
          };
          recommendedItem.track.provider = recommendedTrack.track_provider_id;
          recommendedItems.push(recommendedItem);
        });
        this.getRecommendedItems().forEach((item) => {
          this.remove(item);
        });
        this.add(recommendedItems);
        return this;
      });
    }
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
    this.setPlayIndex();

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
          this.stopScheduledItemsBeforeCurrentItem({
            enforceStop: true,
            silent: true
          });
        }

        this.ensureQueuingOrder();
      }

      if (queueItem.isQueued()) {
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

    const debouncedTrackDetailsFetch = debounce(this.fetchTrackDetails.bind(this), 500);
    this.on('add', debouncedTrackDetailsFetch);
    this.on('sync', () => {
      this.setPlayIndex();
      if (this._initialItem) {
        const currentItem = this.getCurrentItem();
        if (currentItem) {
          this.remove(currentItem);
        }
        const existingItem = this.getItemByTrackId(this._initialItem.track.id);
        if (existingItem) {
          existingItem.play(this._initialItem.progress);
        } else {
          this.addAndPlay(this._initialItem);
        }
        this.add(currentItem, {at: this._playIndex + 1, silent: true});
        this._initialItem = null;
      }
      this.stopScheduledItemsBeforeCurrentItem({
        enforceStop: true,
        silent: true
      });
      this.ensureQueuingOrder();
    });
  }
}
