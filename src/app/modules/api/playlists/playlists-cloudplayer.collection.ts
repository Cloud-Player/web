import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';
import {PlaylistCloudplayerModel} from './playlist-cloudplayer.model';
import {CloudplayerCollection} from '../cloud-player/cloud-player.collection';

export class PlaylistsCloudplayerCollection<TModel extends PlaylistCloudplayerModel>
  extends CloudplayerCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlist/cloudplayer';
  model: IPlaylistModelConstructor = PlaylistCloudplayerModel;

}
