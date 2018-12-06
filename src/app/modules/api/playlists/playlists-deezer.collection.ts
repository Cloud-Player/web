import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';
import {AuxappCollection} from '../auxapp/auxapp.collection';
import {PlaylistDeezerModel} from './playlist-deezer.model';

export class PlaylistsDeezerCollection<TModel extends PlaylistDeezerModel>
  extends AuxappCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlist/deezer';
  model: IPlaylistModelConstructor = PlaylistDeezerModel;

}
