import {BaseModel} from '../../backbone/models/base.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {IPlaylistItems} from './playlist-item/playlist-items.interface';
import {AbstractImageModel} from '../image/abstract-image';
import {IArtist} from '../artist/artist.interface';

export interface IPlaylistModelConstructor {
  new(...args): IPlaylist;
}

export interface IPlaylist extends BaseModel {
  canEdit: boolean;
  title: string;
  description: string;
  artist: IArtist;
  image: AbstractImageModel;
  isPublic: boolean;
  items: IPlaylistItems<IPlaylistItem>;
  provider: string;
}

