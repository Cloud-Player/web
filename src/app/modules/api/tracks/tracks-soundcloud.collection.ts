import {TrackSoundcloudModel} from './track-soundcloud.model';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {AuxappCollection} from '../auxapp/auxapp.collection';

export class TracksSoundcloudCollection<TModel extends TrackSoundcloudModel>
  extends TracksAuxappCollection<TModel> {

  endpoint = 'track/soundcloud';

  public static getTrackDetails(trackIds: any): Promise<any> {
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
