import {BaseCollection} from '../../backbone/collections/base.collection';
import {ITrack} from './track.interface';
import {IModelConstructor} from '../../backbone/utils/interfaces';

export class TracksCollection<TModel extends ITrack> extends BaseCollection<TModel> {
  model: IModelConstructor = null;
}
