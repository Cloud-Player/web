import {TrackYoutubeModel} from './track-youtube.model';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {AuxappCollection} from '../auxapp/auxapp.collection';


export class TracksYoutubeCollection<TModel extends TrackYoutubeModel>
  extends TracksAuxappCollection<TModel> {

  endpoint = 'track/youtube';

  public static getTrackDetails(trackIds: Array<string>): Promise<any> {
    const url = `${AuxappCollection.prototype.hostName.call(this)}/track/youtube`;

    if (trackIds.length === 0) {
      return Promise.resolve({items: []});
    } else {
      return TracksYoutubeCollection.prototype.request.call(this, url, 'GET', {
        params: {
          ids: trackIds.join(',')
        }
      });
    }
  }
}
