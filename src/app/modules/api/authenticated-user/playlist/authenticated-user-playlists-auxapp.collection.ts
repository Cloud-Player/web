import {AuthenticatedUserPlaylistAuxappModel} from './authenticated-user-playlist-auxapp.model';
import {IPlaylistModelConstructor} from '../../playlists/playlist.interface';
import {PlaylistsAuxappCollection} from '../../playlists/playlists-auxapp.collection';

export class AuthenticatedUserPlaylistsAuxappCollection<TModel extends AuthenticatedUserPlaylistAuxappModel>
  extends PlaylistsAuxappCollection<TModel> {

  model: IPlaylistModelConstructor = AuthenticatedUserPlaylistAuxappModel;

  setEndpoint(id: string) {
    this.queryParams['account_id'] = id;
    this.endpoint = `/playlist/auxapp`;
  }

}
