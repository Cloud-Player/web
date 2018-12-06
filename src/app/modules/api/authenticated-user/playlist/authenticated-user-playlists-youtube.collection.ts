import {PlaylistsYoutubeCollection} from '../../playlists/playlists-youtube.collection';
import {PlaylistYoutubeModel} from '../../playlists/playlist-youtube.model';
import {IPlaylistModelConstructor} from '../../playlists/playlist.interface';
import {AuthenticatedUserPlaylistYoutubeModel} from './authenticated-user-playlist-youtube.model';

export class AuthenticatedUserPlaylistsYoutubeCollection<TModel extends AuthenticatedUserPlaylistYoutubeModel>
  extends PlaylistsYoutubeCollection<PlaylistYoutubeModel> {

  model: IPlaylistModelConstructor = AuthenticatedUserPlaylistYoutubeModel;

  setEndpoint(id: string) {
    this.queryParams['account_id'] = id;
    this.endpoint = `/playlist/youtube`;
  }
}
