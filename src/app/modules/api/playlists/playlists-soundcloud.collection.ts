import {SoundcloudProxyCollection} from '../soundcloud/soundcloud-proxy.collection';
import {PlaylistSoundcloudModel} from './playlist-soundcloud.model';
import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';

export class PlaylistsSoundcloudCollection<TModel extends PlaylistSoundcloudModel>
  extends SoundcloudProxyCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlists';
  model: IPlaylistModelConstructor = PlaylistSoundcloudModel;

}
