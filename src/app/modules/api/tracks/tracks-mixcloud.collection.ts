import {ITracks} from './tracks.interface';
import {ITrackModelConstructor} from './track.interface';
import {TrackAuxappModel} from './track-auxapp.model';
import {AuxappCollection} from '../auxapp/auxapp.collection';
import {TracksAuxappCollection} from './tracks-auxapp.collection';
import {TrackMixcloudModel} from './track-mixcloud.model';

export class TracksMixcloudCollection<TModel extends TrackMixcloudModel>
  extends TracksAuxappCollection<TModel> {

  model: ITrackModelConstructor = TrackMixcloudModel;

  endpoint = '/track/mixcloud';

  queryParams: {
    [key: string]: string | number | boolean
  } = {};
}
