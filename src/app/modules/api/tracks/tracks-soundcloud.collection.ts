import {SoundcloudProxyCollection} from '../soundcloud/soundcloud-proxy.collection';
import {TrackSoundcloudModel} from './track-soundcloud.model';
import {ITracks} from './tracks.interface';
import {ITrackModelConstructor} from './track.interface';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {AuxappCollection} from '../auxapp/auxapp.collection';

export class TracksSoundcloudCollection<TModel extends TrackSoundcloudModel>
  extends TracksAuxappCollection<TModel> {

  endpoint = 'track/soundcloud';

  public static getTrackDetails(trackIds: Array<string>): Promise<any> {
    const url = `${AuxappCollection.prototype.hostName.call(this)}/track/soundcloud`;

    if (trackIds.length === 0) {
      return Promise.resolve({items: []});
    } else {
      return TracksSoundcloudCollection.prototype.request.call(this, url, 'GET', {
        params: {
          ids: trackIds.join(',')
        }
      });
    }
  }
}
