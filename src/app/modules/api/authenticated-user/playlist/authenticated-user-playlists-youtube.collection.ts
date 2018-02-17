import {PlaylistsYoutubeCollection} from '../../playlists/playlists-youtube.collection';
import {PlaylistYoutubeModel} from '../../playlists/playlist-youtube.model';
import {IPlaylistModelConstructor} from '../../playlists/playlist.interface';
import {AuthenticatedUserPlaylistYoutubeModel} from './authenticated-user-playlist-youtube.model';
import {queryParam} from '../../../backbone/decorators/query-param.decorator';

export class AuthenticatedUserPlaylistsYoutubeCollection<TModel extends AuthenticatedUserPlaylistYoutubeModel>
  extends PlaylistsYoutubeCollection<PlaylistYoutubeModel> {

  endpoint = '/playlists';
  model: IPlaylistModelConstructor = AuthenticatedUserPlaylistYoutubeModel;

  @queryParam()
  public mine = 'true';
}
