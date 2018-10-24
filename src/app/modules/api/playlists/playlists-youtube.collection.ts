import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';
import {PlaylistYoutubeModel} from './playlist-youtube.model';
import {YoutubeProxyCollection} from '../youtube/youtube-proxy.collection';
import {AuxappCollection} from '../auxapp/auxapp.collection';

export class PlaylistsYoutubeCollection<TModel extends PlaylistYoutubeModel>
  extends AuxappCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlist/youtube';
  model: IPlaylistModelConstructor = PlaylistYoutubeModel;
}
