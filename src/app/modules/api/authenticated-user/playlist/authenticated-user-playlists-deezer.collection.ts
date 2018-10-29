import {IPlaylistModelConstructor} from '../../playlists/playlist.interface';
import {AuthenticatedUserPlaylistDeezerModel} from './authenticated-user-playlist-deezer.model';
import {PlaylistsDeezerCollection} from '../../playlists/playlists-deezer.collection';

export class AuthenticatedUserPlaylistsDeezerCollection<TModel extends AuthenticatedUserPlaylistDeezerModel>
  extends PlaylistsDeezerCollection<TModel> {

  model: IPlaylistModelConstructor = AuthenticatedUserPlaylistDeezerModel;

  setEndpoint(id: string) {
    this.queryParams['account_id'] = id;
    this.endpoint = `/playlist/deezer`;
  }

}
