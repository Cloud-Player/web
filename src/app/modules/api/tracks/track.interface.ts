import {BaseModel} from '../../backbone/models/base.model';
import {AbstractImageModel} from '../image/abstract-image';
import {IArtist} from '../artist/artist.interface';

export interface ITrackModelConstructor {
  new(...args): ITrack;
}

export interface ITrack extends BaseModel {
  type: 'Track';
  hasDetails: boolean;
  provider: string;
  artist: IArtist;
  image: AbstractImageModel;
  title: string;
  duration: number;
  genre: string;
  createdAt: number;
  likes: number;
  clicks: number;
  aspectRatio: number;
  supportsMobilePlayBack: boolean;

  toMiniJSON(): {};
}

