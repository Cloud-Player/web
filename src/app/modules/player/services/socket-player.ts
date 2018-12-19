import {MessageMethodTypes} from '../../shared/services/message';
import {PlayQueueItemStatus} from '../src/playqueue-item-status.enum';
import {PlayqueueItemAuxappModel} from '../../api/playqueue/playqueue-item/playqueue-item-auxapp.model';
import {Injectable} from '@angular/core';
import {SocketMessageService} from '../../shared/services/socket-message';
import {PlayqueueAuxappModel} from '../../api/playqueue/playqueue-auxapp.model';
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

  private addItem(item: IPlayqueueItemMessage, updateWhenExist = true) {
    const existingItem = this.playQueue.items.get(item.id);
    if (!existingItem) {
      const playQueueItem = new PlayqueueItemAuxappModel({
        id: item.id,
        progress: item.progress,
        socketUpdateTime: +new Date(),
        state: item.state,
        track: {
          id: item.track_id,
          provider_id: item.track_provider_id
        }
      });
      this.playQueue.items.add(playQueueItem);
    } else if (updateWhenExist) {
      this.updateItem(item);
    }
  }

  private addItems(items: Array<IPlayqueueItemMessage>) {
    if (isArray(items)) {
      items.forEach((item) => {
        this.addItem(item);
      });
    } else {
      this.addItem(<IPlayqueueItemMessage>items);
    }
  }

  private updateItem(item: IPlayqueueItemMessage) {
    const existingItem = this.playQueue.items.get(item.id);
    if (existingItem) {
      const updatedData: any = {
        id: item.id,
        progress: item.progress,
        socketUpdateTime: +new Date()
      };
      switch (item.state) {
        case PlayQueueItemStatus.Playing:
          if (!existingItem.isPlaying()) {
            updatedData.state = PlayQueueItemStatus.RequestedPlaying;
          } else if (!existingItem.newProgressEqualsCurrent(item.progress)) {
            updatedData.state = PlayQueueItemStatus.RequestedSeek;
            existingItem.seekToSeconds = item.progress;
          }
          updatedData.progress = item.progress || existingItem.progress;
          break;
        case PlayQueueItemStatus.Paused:
          console.error('PAUSE ITEM');
          if (!existingItem.isPaused() && !existingItem.isStopped()) {
            updatedData.state = PlayQueueItemStatus.RequestedPause;
          }
          break;
        case PlayQueueItemStatus.Stopped:
          if (!existingItem.isStopped()) {
            updatedData.state = PlayQueueItemStatus.RequestedStop;
          }
          break;
        case PlayQueueItemStatus.Queued:
          updatedData.state = PlayQueueItemStatus.Queued;
          break;
        case PlayQueueItemStatus.Scheduled:
        default:
          if (existingItem.isQueued()) {
            existingItem.unQueue();
          }
          updatedData.state = PlayQueueItemStatus.Scheduled;
          break;
      }
      existingItem.set(existingItem.parse(updatedData));
    } else {
      this.addItem(item, false);
    }
  }

  private updateItems(items: Array<IPlayqueueItemMessage>) {
    if (isArray(items)) {
      items.forEach((item) => {
        this.updateItem(item);
      });
    } else {
      this.updateItem(<IPlayqueueItemMessage>items);
    }
  }

  private deleteItem(item) {
    this.playQueue.items.remove(item);
  }

  private deleteItems(items) {
    if (isArray(items)) {
      items.forEach((item) => {
        this.deleteItem(item);
      });
    } else {
      this.deleteItem(<IPlayqueueItemMessage>items);
    }
  }

  private subscribeOnPlayqueueChanges(playQueue: PlayqueueAuxappModel) {
  }

  public setPlayqueue(playQueue: PlayqueueAuxappModel) {
    this.playQueue = playQueue;
    if (this.playQueue.id) {
      this.subscribeOnPlayqueueChanges(this.playQueue);
    }
    this.playQueue.on('change:id', this.subscribeOnPlayqueueChanges, this);
  }
}
