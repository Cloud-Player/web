import {BaseModel} from '../../../backbone/models/base.model';
import {ITrack} from '../../tracks/track.interface';

export interface IFavouriteTrackItemModelConstructor {
  new(...args): IFavouriteTrackItem;
}

export interface IFavouriteTrackItem extends BaseModel {
  track: ITrack;
  type: string;
}
