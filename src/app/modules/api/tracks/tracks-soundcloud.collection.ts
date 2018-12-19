import {TrackSoundcloudModel} from './track-soundcloud.model';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {queryParam} from '../../backbone/decorators/query-param.decorator';

export class TracksSoundcloudCollection<TModel extends TrackSoundcloudModel>
  extends TracksAuxappCollection<TModel> {

  @queryParam()
  provider_id = null;
  endpoint = 'track/soundcloud';
  model = TrackSoundcloudModel;

}
