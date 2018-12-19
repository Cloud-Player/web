import {BaseModel} from '../../backbone/models/base.model';
import {AbstractImageModel} from '../image/abstract-image';
import {IArtist} from '../artist/artist.interface';

export interface ITrackModelConstructor {
  new(...args): ITrack;
}

export interface ITrack extends BaseModel {
  type: 'Track';
  hasDetails: boolean;
  provider_id: string;
  artist: IArtist;
  image: AbstractImageModel;
  title: string;
  duration: number;
  genre: Array<string>;
  createdAt: number;
  likes: number;
  clicks: number;
  aspectRatio: number;
  supportsMobilePlayBack: boolean;
  externalLink: string;

  toMiniJSON(): {};
  getGenreString(): string;
}

