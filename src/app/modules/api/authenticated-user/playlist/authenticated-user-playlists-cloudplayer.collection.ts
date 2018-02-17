import {AuthenticatedUserPlaylistCloudplayerModel} from './authenticated-user-playlist-cloudplayer.model';
import {IPlaylistModelConstructor} from '../../playlists/playlist.interface';
import {PlaylistsCloudplayerCollection} from '../../playlists/playlists-cloudplayer.collection';

export class AuthenticatedUserPlaylistsCloudplayerCollection<TModel extends AuthenticatedUserPlaylistCloudplayerModel>
  extends PlaylistsCloudplayerCollection<TModel> {

  model: IPlaylistModelConstructor = AuthenticatedUserPlaylistCloudplayerModel;

  setEndpoint(id: string) {
    this.queryParams['account_id'] = id;
    this.endpoint = `/playlist/cloudplayer`;
  }

}
