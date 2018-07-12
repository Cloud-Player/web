import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';
import {PlaylistAuxappModel} from './playlist-auxapp.model';
import {AuxappCollection} from '../auxapp/auxapp.collection';

export class PlaylistsAuxappCollection<TModel extends PlaylistAuxappModel>
  extends AuxappCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlist/auxapp';
  model: IPlaylistModelConstructor = PlaylistAuxappModel;

}
