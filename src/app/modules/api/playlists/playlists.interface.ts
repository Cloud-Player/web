import {BaseModel} from '../../backbone/models/base.model';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {IPlaylist, IPlaylistModelConstructor} from './playlist.interface';

export interface IPlaylists<TModel extends IPlaylist> extends BaseCollection<BaseModel> {
  model: IPlaylistModelConstructor;
}

