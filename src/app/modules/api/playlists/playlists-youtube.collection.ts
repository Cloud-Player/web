import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';
import {PlaylistYoutubeModel} from './playlist-youtube.model';
import {YoutubeProxyCollection} from '../youtube/youtube-proxy.collection';

export class PlaylistsYoutubeCollection<TModel extends PlaylistYoutubeModel>
  extends YoutubeProxyCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlists';
  model: IPlaylistModelConstructor = PlaylistYoutubeModel;
  queryParams = {
    part: 'snippet, status'
  };

}
