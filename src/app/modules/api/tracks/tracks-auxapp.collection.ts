import {ITracks} from './tracks.interface';
import {ITrackModelConstructor} from './track.interface';
import {TrackAuxappModel} from './track-auxapp.model';
import {AuxappCollection} from '../auxapp/auxapp.collection';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {TrackSoundcloudModel} from './track-soundcloud.model';
import {TrackYoutubeModel} from './track-youtube.model';
import {TrackMixcloudModel} from './track-mixcloud.model';
import {TrackDeezerModel} from './track-deezer.model';
import {queryParam} from '../../backbone/decorators/query-param.decorator';

export class TracksAuxappCollection<TModel extends TrackAuxappModel>
  extends AuxappCollection<TModel> implements ITracks<TModel> {

  @queryParam()
  provider_id = 'soundcloud,youtube,mixcloud';

  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      soundcloud: TrackSoundcloudModel,
      youtube: TrackYoutubeModel,
      mixcloud: TrackMixcloudModel,
      deezer: TrackDeezerModel
    }
  })
  model: ITrackModelConstructor = TrackAuxappModel;

  endpoint = '/track';

  queryParams: {
    [key: string]: string | number | boolean
  } = {};

  public static getTrackDetails(tracks: Array<{ id: string, provider_id: string }>): any {
    return TracksAuxappCollection.prototype.request(
      `${TracksAuxappCollection.prototype.hostName()}/track`,
      'POST',
      {
        data: {
          ids: tracks
        }
      });
  }
}
