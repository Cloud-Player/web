import {Track} from '../models/track';
import {TrackSoundcloud} from '../models/track-soundcloud';
import {IModelConstructor} from '../../backbone/utils/interfaces';
import {SoundcloudCollection} from '../../shared/collections/soundcloud';
import {Tracks} from './tracks';

export class TracksSoundcloud<TModel extends Track> extends Tracks<TModel> {

  model: IModelConstructor = TrackSoundcloud;

  endpoint = '/tracks';

  hostName(): string {
    return SoundcloudCollection.prototype.hostName.apply(this);
  }

  sync(...args) {
    return SoundcloudCollection.prototype.sync.apply(this, args);
  }

}
