import {ITrackModelConstructor} from './track.interface';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {TrackMixcloudModel} from './track-mixcloud.model';
import {queryParam} from '../../backbone/decorators/query-param.decorator';

export class TracksMixcloudCollection<TModel extends TrackMixcloudModel>
  extends TracksAuxappCollection<TModel> {

  @queryParam()
  provider_id = null;
  endpoint = '/track/mixcloud';
  model: ITrackModelConstructor = TrackMixcloudModel;

}
