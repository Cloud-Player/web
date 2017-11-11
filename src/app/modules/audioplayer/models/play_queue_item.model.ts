import {Track} from '../../tracks/models/track.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';

export enum Status {
  Playing = 'PLAYING',
  Paused = 'PAUSED',
  Stopped = 'STOPPED',
  Queued = 'QUEUED',
  Scheduled = 'NULL'
}

export class PlayQueueItem extends SoundcloudModel {

  @attributesKey('status')
  @defaultValue(Status.Scheduled)
  status: Status;

  @attributesKey('track')
  @nested()
  track: Track;

  queue(): void {
    this.status = Status.Queued;
  }

  unQueue(): void {
    this.status = Status.Scheduled;
    if (this.collection) {
      const collection = this.collection;
      collection.remove(this);
      collection.add(this);
    }
  }

  play(): void {
    this.status = Status.Playing;
  }

  pause(): void {
    this.status = Status.Paused;
  }

  stop(): void {
    this.status = Status.Stopped;
  }

  isQueued(): boolean {
    return this.status === Status.Queued;
  }

  isPlaying(): boolean {
    return this.status === Status.Playing;
  }

  isPaused(): boolean {
    return this.status === Status.Paused;
  }

  isStopped(): boolean {
    return this.status === Status.Stopped;
  }

  isScheduled(): boolean {
    return this.status === Status.Scheduled;
  }
}
