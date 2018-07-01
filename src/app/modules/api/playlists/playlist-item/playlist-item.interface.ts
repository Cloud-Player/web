import {BaseModel} from '../../../backbone/models/base.model';
import {ITrack} from '../../tracks/track.interface';

export interface IPlaylistItemModelConstructor {
  new(...args): IPlaylistItem;
}

export interface IPlaylistItem extends BaseModel {
  track: ITrack;
  type: string;
  created: number|Date;
}
