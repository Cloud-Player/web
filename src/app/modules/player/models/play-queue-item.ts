import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {PlayQueueItemStatus} from '../src/playqueue-item-status.enum';
import {isNumber} from 'underscore';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {BaseModel} from '../../backbone/models/base.model';
import {TrackYoutubeModel} from '../../api/tracks/track-youtube.model';
import {TrackSoundcloudModel} from '../../api/tracks/track-soundcloud.model';
import {ITrack} from '../../api/tracks/track.interface';

export class PlayQueueItem extends BaseModel {
  private _promisePerState = {};

  @attributesKey('status')
  @defaultValue(PlayQueueItemStatus.Scheduled)
  status: PlayQueueItemStatus;

  @attributesKey('track')
  @dynamicInstance({
    identifierKey: 'provider',
    identifierKeyValueMap: {
      'soundcloud': TrackSoundcloudModel,
      'youtube': TrackYoutubeModel
    }
  })
  track: ITrack;

  @attributesKey('progress')
  @defaultValue(0)
  progress: number;

  @attributesKey('duration')
  @defaultValue(0)
  duration: number;

  private resolveOnStatus(requestedStatus): Promise<any> {
    if (!this._promisePerState[requestedStatus]) {
      this._promisePerState[requestedStatus] = new Promise(resolve => {
        if (this.status === requestedStatus) {
          resolve();
          this._promisePerState[requestedStatus] = null;
        } else {
          const statusListener = () => {
            if (this.status === requestedStatus) {
              this.off('change:status', statusListener, this);
              resolve();
              this._promisePerState[requestedStatus] = null;
            }
          };
          this.on('change:status', statusListener, this);
        }
      });
    }

    return this._promisePerState[requestedStatus];
  }

  queue(): void {
    this.status = PlayQueueItemStatus.Queued;
  }

  unQueue(): void {
    this.status = PlayQueueItemStatus.Scheduled;
    if (this.collection) {
      const collection = this.collection;
      collection.remove(this, {silent: true});
      collection.add(this, {silent: true});
    }
  }

  play(startTime?: number): Promise<any> {
    if (isNumber(startTime)) {
      this.progress = startTime;
    }
    this.status = PlayQueueItemStatus.RequestedPlaying;
    return this.resolveOnStatus(PlayQueueItemStatus.Playing);
  }

  pause(): Promise<any> {
    this.status = PlayQueueItemStatus.RequestedPause;
    return this.resolveOnStatus(PlayQueueItemStatus.Paused);
  }

  stop(): Promise<any> {
    this.status = PlayQueueItemStatus.RequestedStop;
    this.progress = 0;
    return this.resolveOnStatus(PlayQueueItemStatus.Stopped);
  }

  seekTo(to: number): Promise<any> {
    if (this.isPlaying()) {
      return this.pause().then(() => {
        return this.play(to);
      });
    } else {
      return this.play(to);
    }
  }

  restart(): Promise<any> {
    return this.seekTo(0);
  }

  isQueued(): boolean {
    return this.status === PlayQueueItemStatus.Queued;
  }

  isPlaying(): boolean {
    return this.status === PlayQueueItemStatus.Playing || this.status === PlayQueueItemStatus.RequestedPlaying;
  }

  isPaused(): boolean {
    return this.status === PlayQueueItemStatus.Paused || this.status === PlayQueueItemStatus.RequestedPause;
  }

  isStopped(): boolean {
    return this.status === PlayQueueItemStatus.Stopped || this.status === PlayQueueItemStatus.RequestedStop;
  }

  isScheduled(): boolean {
    return this.status === PlayQueueItemStatus.Scheduled;
  }

  toMiniJSON() {
    const item = this.toJSON();
    item.track = this.track.toMiniJSON();
    return item;
  }
}
