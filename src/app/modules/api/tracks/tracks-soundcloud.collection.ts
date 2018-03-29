import {SoundcloudProxyCollection} from '../soundcloud/soundcloud-proxy.collection';
import {TrackSoundcloudModel} from './track-soundcloud.model';
import {ITracks} from './tracks.interface';
import {ITrackModelConstructor} from './track.interface';

export class TracksSoundcloudCollection<TModel extends TrackSoundcloudModel>
  extends SoundcloudProxyCollection<TModel> implements ITracks<TModel> {

  model: ITrackModelConstructor = TrackSoundcloudModel;

  endpoint = '/tracks';

  queryParams: {
    [key: string]: string | number | boolean
  } = {
    q: <any>null,
    limit: 200,
    'duration[from]': 1000
  };

  public static getTrackDetails(trackIds: Array<string>) {
    const url = `${TracksSoundcloudCollection.prototype.hostName.call(this)}/proxy/soundcloud/tracks`;

    if (trackIds.length === 0) {
      return Promise.resolve([]);
    } else {
      return TracksSoundcloudCollection.prototype.request.call(this, url, 'GET', {
        params: {
          ids: trackIds.join(',')
        }
      });
    }
  }
}
