import {TrackSoundcloudModel} from './track-soundcloud.model';
import {TracksAuxappCollection} from './tracks-auxapp.collection';

export class TracksSoundcloudCollection<TModel extends TrackSoundcloudModel>
  extends TracksAuxappCollection<TModel> {

  endpoint = 'track/soundcloud';
  model = TrackSoundcloudModel;

}
