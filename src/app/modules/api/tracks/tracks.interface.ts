import {BaseModel} from '../../backbone/models/base.model';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {ITrack, ITrackModelConstructor} from './track.interface';

export interface ITracks<TModel extends ITrack> extends BaseCollection<BaseModel> {
  model: ITrackModelConstructor;
}

