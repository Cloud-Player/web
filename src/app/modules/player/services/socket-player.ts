import {MessageMethodTypes} from '../../shared/services/message';
import {PlayQueueItemStatus} from '../src/playqueue-item-status.enum';
import {PlayqueueItemAuxappModel} from '../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {Injectable} from '@angular/core';
import {SocketMessageService} from '../../shared/services/socket-message';
import {PlayqueueAuxappModel} from '../../api/playqueue/playqueue-auxapp.model';
import {TrackAuxappModel} from '../../api/tracks/track-auxapp.model';
import {TracksAuxappCollection} from '../../api/tracks/tracks-auxapp.collection';
import {isArray} from 'underscore';

interface IPlayqueueItemMessage {
  id: string;
  track_id: string;
  track_provider_id: string;
  state: PlayQueueItemStatus;
  progress: number;
}

@Injectable()
export class SocketPlayerService {
  private playQueue: PlayqueueAuxappModel;

  constructor(private socketMessageService: SocketMessageService) {
  }

  private addItem(item: IPlayqueueItemMessage) {
    const existingItem = this.playQueue.items.getItemByTrackId(item.track_id);
    if (!existingItem) {
      console.log('[PLAYER] ADD', item);
      const playQueueItem = new PlayqueueItemAuxappModel({
        id: item.id,
        progress: item.progress,
        track: {
          id: item.track_id,
          provider: item.track_provider_id
        }
      });
      const addedItem: PlayqueueItemAuxappModel = this.playQueue.items.add(playQueueItem);
      switch (item.state) {
        case PlayQueueItemStatus.Playing:
          addedItem.play();
          break;
        case PlayQueueItemStatus.Queued:
          addedItem.queue();
          break;
      }
    }
  }

  private addItems(items: Array<IPlayqueueItemMessage>) {
    if (isArray(items)) {
      items.forEach((item) => {
        this.addItem(item);
      });
    } else {
      this.addItem(items);
    }
  }

  private updateItem(item: IPlayqueueItemMessage) {
    console.log('[PLAYER] Update', item);
    const existingItem = this.playQueue.items.getItemByTrackId(item.track_id);
    if (existingItem) {
      switch (item.state) {
        case PlayQueueItemStatus.Playing:
          if (!existingItem.isPlaying()) {
            console.log('[PLAYER] PLAY', existingItem.track.title);
            existingItem.play();
          } else {
            existingItem.seekTo(item.progress);
          }
          break;
        case PlayQueueItemStatus.Paused:
          if (!existingItem.isPaused() && !existingItem.isStopped()) {
            console.log('[PLAYER] PAUSE', existingItem.track.title);
            existingItem.pause();
          }
          break;
        case PlayQueueItemStatus.Stopped:
          if (!existingItem.isStopped()) {
            console.log('[PLAYER] STOP', existingItem.track.title);
            existingItem.stop();
          }
          break;
        case PlayQueueItemStatus.Queued:
          if (!existingItem.isQueued()) {
            console.log('[PLAYER] QUEUE', existingItem.track.title);
            existingItem.queue();
          }
          break;
        case PlayQueueItemStatus.Scheduled:
          if (existingItem.isQueued()) {
            console.log('[PLAYER] DEQUEUE', existingItem.track.title);
            existingItem.unQueue();
          }
          break;
      }
    }
  }

  private updateItems(items: Array<IPlayqueueItemMessage>) {
    if (isArray(items)) {
      items.forEach((item) => {
        this.updateItem(item);
      });
    } else {
      this.updateItem(items);
    }
  }

  private deleteItem() {
    this.playQueue.items.reset();
  }

  private deleteItems() {
    this.playQueue.items.reset();
  }

  private subscribeOnPlayqueueChanges(playQueue: PlayqueueAuxappModel) {
    this.socketMessageService.subscribe(`queue.${playQueue.id}.item`, MessageMethodTypes.PUT, this.updateItems.bind(this));
    this.socketMessageService.subscribe(`queue.${playQueue.id}.item`, MessageMethodTypes.POST, this.addItems.bind(this));
    this.socketMessageService.subscribe(`queue.${playQueue.id}.item`, MessageMethodTypes.DELETE, this.deleteItem.bind(this));
    console.log('[PLAYER] Subscribe', playQueue.id);
  }

  public setPlayqueue(playQueue: PlayqueueAuxappModel) {
    this.playQueue = playQueue;
    if (this.playQueue.id) {
      this.subscribeOnPlayqueueChanges(this.playQueue);
    } else {
      console.log('[PLAYER] Wait for id');
      this.playQueue.on('change:id', this.subscribeOnPlayqueueChanges, this);
    }
  }
}
