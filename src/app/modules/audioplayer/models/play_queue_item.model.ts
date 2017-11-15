import {Track} from '../../tracks/models/track.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {PlayQueueItemStatus} from '../enums/playqueue-item-status';

export class PlayQueueItem extends SoundcloudModel {

  @attributesKey('status')
  @defaultValue(PlayQueueItemStatus.Scheduled)
  status: PlayQueueItemStatus;

  @attributesKey('track')
  @nested()
  track: Track;

  @attributesKey('provider')
  @defaultValue('SOUNDCLOUD')
  provider: string;

  queue(): void {
    this.status = PlayQueueItemStatus.Queued;
  }

  unQueue(): void {
    this.status = PlayQueueItemStatus.Scheduled;
    if (this.collection) {
      const collection = this.collection;
      collection.remove(this);
      collection.add(this);
    }
  }

  play(): void {
    this.status = PlayQueueItemStatus.Playing;
  }

  pause(): void {
    this.status = PlayQueueItemStatus.Paused;
  }

  stop(): void {
    this.status = PlayQueueItemStatus.Stopped;
  }

  isQueued(): boolean {
    return this.status === PlayQueueItemStatus.Queued;
  }

  isPlaying(): boolean {
    return this.status === PlayQueueItemStatus.Playing;
  }

  isPaused(): boolean {
    return this.status === PlayQueueItemStatus.Paused;
  }

  isStopped(): boolean {
    return this.status === PlayQueueItemStatus.Stopped;
  }

  isScheduled(): boolean {
    return this.status === PlayQueueItemStatus.Scheduled;
  }
}
