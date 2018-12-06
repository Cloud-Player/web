import {AuthenticatedUserPlaylistSoundcloudModel} from './authenticated-user-playlist-soundcloud.model';
import {PlaylistSoundcloudModel} from '../../playlists/playlist-soundcloud.model';
import {IPlaylistModelConstructor} from '../../playlists/playlist.interface';
import {PlaylistsSoundcloudCollection} from '../../playlists/playlists-soundcloud.collection';

export class AuthenticatedUserPlaylistsSoundcloudCollection<TModel extends AuthenticatedUserPlaylistSoundcloudModel>
  extends PlaylistsSoundcloudCollection<PlaylistSoundcloudModel> {

  model: IPlaylistModelConstructor = AuthenticatedUserPlaylistSoundcloudModel;

  setEndpoint(id: string) {
    this.queryParams['account_id'] = id;
    this.endpoint = `/playlist/soundcloud`;
  }
}
