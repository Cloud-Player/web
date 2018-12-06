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
      const playQueueItem = new PlayqueueItemAuxappModel({
        id: item.id,
        progress: item.progress,
        track: {
          id: item.track_id,
          provider: item.track_provider_id
        }
      });
      this.playQueue.items.add(playQueueItem);
    }
    this.updateItem(item);
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
    const existingItem = this.playQueue.items.getItemByTrackId(item.track_id);
    if (existingItem) {
      existingItem.socketData = {
        status: item.state,
        progress: item.progress
      };
      switch (item.state) {
        case PlayQueueItemStatus.Playing:
          if (!existingItem.isPlaying()) {
            existingItem.play(item.progress);
          } else {
            existingItem.seekTo(item.progress);
          }
          break;
        case PlayQueueItemStatus.Paused:
          console.error('PAUSE ITEM');
          if (!existingItem.isPaused() && !existingItem.isStopped()) {
            existingItem.pause();
          }
          break;
        case PlayQueueItemStatus.Stopped:
          if (!existingItem.isStopped()) {
            existingItem.stop();
          }
          break;
        case PlayQueueItemStatus.Queued:
          if (!existingItem.isQueued()) {
            existingItem.queue();
          }
          break;
        case PlayQueueItemStatus.Scheduled:
          if (existingItem.isQueued()) {
            existingItem.unQueue();
          }
          break;
      }
    } else {
      this.addItem(item);
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
  }

  public setPlayqueue(playQueue: PlayqueueAuxappModel) {
    this.playQueue = playQueue;
    if (this.playQueue.id) {
      this.subscribeOnPlayqueueChanges(this.playQueue);
    }
    this.playQueue.on('change:id', this.subscribeOnPlayqueueChanges, this);
  }
}
