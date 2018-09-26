import {PlaylistItemAuxappModel} from '../../playlists/playlist-item/playlist-item-auxapp.model';
import {isNumber} from 'underscore';
import {PlayQueueItemStatus} from '../../../player/src/playqueue-item-status.enum';
import {dynamicInstance} from '../../../backbone/decorators/dynamic-instance.decorator';
import {ITrack} from '../../tracks/track.interface';
import {TrackMixcloudModel} from '../../tracks/track-mixcloud.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {TrackYoutubeModel} from '../../tracks/track-youtube.model';
import {PlayqueueItemsAuxappCollection} from './playqueue-items-auxapp.collection';
import {AuxappModel} from '../../auxapp/auxapp.model';

export class PlayqueueItemAuxappModel
  extends PlaylistItemAuxappModel {

  private _promisePerState = {};

  @attributesKey('status')
  @defaultValue(PlayQueueItemStatus.Scheduled)
  status: PlayQueueItemStatus;

  @attributesKey('track')
  @dynamicInstance({
    identifierKey: 'provider',
    identifierKeyValueMap: {
      'soundcloud': TrackSoundcloudModel,
      'youtube': TrackYoutubeModel,
      'mixcloud': TrackMixcloudModel
    }
  })
  track: ITrack;

  @attributesKey('progress')
  @defaultValue(0)
  progress: number;

  @attributesKey('duration')
  @defaultValue(0)
  duration: number;

  @attributesKey('indexBeforeShuffle')
  indexBeforeShuffle: number;

  urlRoot = () => {
    return (<PlayqueueItemsAuxappCollection<PlayqueueItemAuxappModel>>this.collection).url();
  };

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

  isRecommended(): boolean {
    return this.status === PlayQueueItemStatus.Recommended;
  }

  toMiniJSON() {
    const item = this.toJSON();
    item.track = this.track.toMiniJSON();
    return item;
  }

  getIndex() {
    return this.collection.indexOf(this);
  }

  // compose() {
  //   return AuxappModel.prototype.compose.apply(this, arguments);
  // }

  parse(attrs) {
    attrs.status = attrs.state;
    delete attrs.state;

    if (!attrs.track || attrs.track === null || (attrs.track && !attrs.track.id)) {
      delete attrs.track;
    } else {
      attrs.track.provider = attrs.track.provider_id;
      delete attrs.track.provider_id;
    }
    return attrs;
  }

  compose() {
    let status = this.status;
    switch (status) {
      case PlayQueueItemStatus.RequestedPlaying:
        status = PlayQueueItemStatus.Playing;
        break;
      case PlayQueueItemStatus.RequestedPause:
        status = PlayQueueItemStatus.Paused;
        break;
      case PlayQueueItemStatus.RequestedStop:
        status = PlayQueueItemStatus.Stopped;
        break;
    }
    if (this.isNew()) {
      return {
        track_provider_id: this.track.provider,
        track_id: this.track.id.toString(),
        state: status
      };
    } else {
      return {
        state: status
      };
    }
  }

  save() {
    if (!this.isSyncing) {
      return super.save();
    } else {
      console.log('IGNORE');
    }
  }
}
