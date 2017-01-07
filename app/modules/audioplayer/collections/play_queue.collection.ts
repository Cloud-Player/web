import {PlayQueueItem} from '../models/play_queue_item.model';
import {BaseCollection} from '../../backbone/collections/base.collection';

export class PlayQueue<TModel extends PlayQueueItem> extends BaseCollection<TModel> {
  private static instance: PlayQueue<PlayQueueItem>;

  private playIndex = 0;

  model = PlayQueueItem;

  static getInstance(): PlayQueue<PlayQueueItem> {
    if (PlayQueue.instance) {
      return PlayQueue.instance;
    } else {
      PlayQueue.instance = new PlayQueue();
      return PlayQueue.instance;
    }
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
    let addItem: TModel = this.add(item);
    addItem.play();
    return addItem;
  }

  queue(item: TModel|any): TModel {
    let playQueueItem: PlayQueueItem;
    if (item instanceof PlayQueueItem) {
      playQueueItem = item;
    } else {
      playQueueItem = new PlayQueueItem(item);
    }
    if (this.get(playQueueItem)) {
      this.remove(playQueueItem, {silent: true});
    }
    playQueueItem.queue();
    return this.add(playQueueItem);
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
      if(index > this.playIndex){
        scheduledItem.set('status', 'NULL');
        this.scheduleStoppedItemsAfterCurrentItem(this.at(index-1));
      }
    }
  }

  add(item: TModel|{}, options: any = {}): TModel {
    if (options.doNothing) {
      return super.add(item, options);
    }
    let playQueueItem: PlayQueueItem;
    if (item instanceof PlayQueueItem) {
      playQueueItem = item;
    } else {
      playQueueItem = new PlayQueueItem(item);
    }
    playQueueItem.set('id', playQueueItem.get('track').get('id'));

    let existingItem = this.get(playQueueItem);
    let addedItem: TModel;
    if (existingItem) {
      existingItem.set(playQueueItem.toJSON());
      addedItem = existingItem;
    } else {
      addedItem = super.add(playQueueItem, options);
    }
    this.ensureQueuingOrder();
    this.setPlayIndex();
    return addedItem;
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
