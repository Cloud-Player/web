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
import {TrackDeezerModel} from '../../tracks/track-deezer.model';
import {TrackAuxappModel} from '../../tracks/track-auxapp.model';

export class PlayqueueItemAuxappModel
  extends PlaylistItemAuxappModel {

  private _promisePerState = {};
  private _blockUpdate: boolean;
  private _blockUpdateTimeout;

  public static isNewStatus(previousStatus: PlayQueueItemStatus, newStatus: PlayQueueItemStatus) {
    if (!previousStatus) {
      return true;
    }

    if (previousStatus === PlayQueueItemStatus.RequestedPlaying && newStatus === PlayQueueItemStatus.Playing) {
      return false;
    }

    if (previousStatus === PlayQueueItemStatus.RequestedPause && newStatus === PlayQueueItemStatus.Paused) {
      return false;
    }

    if (previousStatus === PlayQueueItemStatus.RequestedStop && newStatus === PlayQueueItemStatus.Stopped) {
      return false;
    }

    if (previousStatus && newStatus && previousStatus === newStatus) {
      return false;
    }

    return true;
  }

  @attributesKey('status')
  @defaultValue(PlayQueueItemStatus.Scheduled)
  status: PlayQueueItemStatus;

  @attributesKey('track')
  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      soundcloud: TrackSoundcloudModel,
      youtube: TrackYoutubeModel,
      mixcloud: TrackMixcloudModel,
      deezer: TrackDeezerModel,
      default: TrackAuxappModel
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

  @attributesKey('socketUpdateTime')
  socketUpdateTime: number;

  seekToSeconds: number;

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

  public newProgressEqualsCurrent(newProgress: number) {
    if (this.progress) {
      return newProgress >= this.progress - 5 && newProgress <= this.progress + 5;
    }
  }

  schedule() {
    this.status = PlayQueueItemStatus.Scheduled;
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

  stop(options: {
    enforceStop: boolean,
    silent: boolean
  } = {
    enforceStop: false,
    silent: false
  }): Promise<any> {
    this.progress = 0;
    if (options.enforceStop) {
      this.set('status', PlayQueueItemStatus.Stopped, {silent: options.silent});
      return Promise.resolve();
    } else {
      this.set('status', PlayQueueItemStatus.RequestedStop, {silent: options.silent});
      return this.resolveOnStatus(PlayQueueItemStatus.Stopped);
    }
  }

  seekTo(to: number): Promise<any> {
    this.progress = to;
    this.seekToSeconds = to;
    this.status = PlayQueueItemStatus.RequestedSeek;
    return this.resolveOnStatus(PlayQueueItemStatus.Playing);
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

  parse(attributes) {
    attributes.status = attributes.state || this.status;
    // When current state is stopped but an update wants to set it into pause ignore the update
    // When the current state is playing or paused and the new status want to put it into playing/paused ignore it as well because
    // the player could be in requested state
    if (
      (this.isStopped() && (attributes.status === PlayQueueItemStatus.Paused)) ||
      (this.status === PlayQueueItemStatus.RequestedPlaying && attributes.status === PlayQueueItemStatus.Playing) ||
      (this.status === PlayQueueItemStatus.RequestedPause && attributes.status === PlayQueueItemStatus.Paused)
    ) {
      attributes.status = this.status;
    }

    // When the model was saved with status playing and the server returns the state but in the meantime the
    // Item switched to pause ignore the update. Maybe the player was not ready yet
    if (this._blockUpdate) {
      attributes.status = this.status;
      delete attributes.progress;
      console.warn('Ignore status update');
    }

    if (this.newProgressEqualsCurrent(attributes.progress)) {
      delete attributes.progress;
    }

    if (!attributes.track || !attributes.track.id) {
      if (!this.track || this.track.isNew()) {
        attributes.track = {
          id: attributes.track_id || attributes.id,
          provider_id: attributes.provider_id || attributes.track_provider_id
        };
      } else {
        delete attributes.track;
      }
    }

    return attributes;
  }

  compose() {
    let status = this.status;
    switch (status) {
      case PlayQueueItemStatus.RequestedPlaying:
      case PlayQueueItemStatus.RequestedSeek:
        status = PlayQueueItemStatus.Playing;
        break;
      case PlayQueueItemStatus.RequestedPause:
        status = PlayQueueItemStatus.Paused;
        break;
      case PlayQueueItemStatus.RequestedStop:
        status = PlayQueueItemStatus.Stopped;
        break;
    }
    const item: any = {
      state: status,
      progress: Math.round(this.progress)
    };
    if (this.isNew()) {
      item.track_provider_id = this.track.provider_id;
      item.track_id = this.track.id.toString();
    }

    // Block further incoming updates for one second
    this._blockUpdate = true;
    if (this._blockUpdateTimeout) {
      clearTimeout(this._blockUpdateTimeout);
    }
    this._blockUpdateTimeout = setTimeout(() => {
      this._blockUpdate = false;
    }, 1000);
    return item;
  }

  save() {
    if (this.urlRoot()) {
      return super.save();
    }
  }
}
