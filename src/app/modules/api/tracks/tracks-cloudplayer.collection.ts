import {ITracks} from './tracks.interface';
import {ITrackModelConstructor} from './track.interface';
import {TrackCloudplayerModel} from './track-cloudplayer.model';
import {CloudplayerCollection} from '../cloud-player/cloud-player.collection';

export class TracksCloudplayerCollection<TModel extends TrackCloudplayerModel>
  extends CloudplayerCollection<TModel> implements ITracks<TModel> {

  model: ITrackModelConstructor = TrackCloudplayerModel;

  endpoint = '/tracks';

  queryParams: {
    [key: string]: string | number | boolean
  } = {};
}
