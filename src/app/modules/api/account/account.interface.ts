import {BaseModel} from '../../backbone/models/base.model';
import {AbstractImageModel} from '../image/abstract-image';
import {IPlaylists} from '../playlists/playlists.interface';
import {IPlaylist} from '../playlists/playlist.interface';

export interface IAccount extends BaseModel {
  endpoint: string;
  image: AbstractImageModel;
  provider: string;
  playlists: IPlaylists<IPlaylist>;

  getFullName(): string;
}
