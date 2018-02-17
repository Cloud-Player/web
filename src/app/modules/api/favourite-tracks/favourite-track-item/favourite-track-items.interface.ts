import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';
import {IFavouriteTrackItem, IFavouriteTrackItemModelConstructor} from './favourite-track-item.interface';

export interface IFavouriteTrackItems<TModel extends IFavouriteTrackItem> extends BaseCollection<BaseModel> {
  model: IFavouriteTrackItemModelConstructor;
}
