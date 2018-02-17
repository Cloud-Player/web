import {BaseModel} from '../../backbone/models/base.model';
import {IFavouriteTrackItem} from './favourite-track-item/favourite-track-item.interface';
import {IFavouriteTrackItems} from './favourite-track-item/favourite-track-items.interface';

export interface IFavouriteTracks extends BaseModel {
  items: IFavouriteTrackItems<IFavouriteTrackItem>;
}
