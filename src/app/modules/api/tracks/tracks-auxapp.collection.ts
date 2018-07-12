import {ITracks} from './tracks.interface';
import {ITrackModelConstructor} from './track.interface';
import {TrackAuxappModel} from './track-auxapp.model';
import {AuxappCollection} from '../auxapp/auxapp.collection';

export class TracksAuxappCollection<TModel extends TrackAuxappModel>
  extends AuxappCollection<TModel> implements ITracks<TModel> {

  model: ITrackModelConstructor = TrackAuxappModel;

  endpoint = '/tracks';

  queryParams: {
    [key: string]: string | number | boolean
  } = {};
}
