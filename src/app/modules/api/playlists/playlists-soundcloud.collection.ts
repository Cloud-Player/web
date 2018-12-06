import {PlaylistSoundcloudModel} from './playlist-soundcloud.model';
import {IPlaylists} from './playlists.interface';
import {IPlaylistModelConstructor} from './playlist.interface';
import {AuxappCollection} from '../auxapp/auxapp.collection';

export class PlaylistsSoundcloudCollection<TModel extends PlaylistSoundcloudModel>
  extends AuxappCollection<TModel> implements IPlaylists<TModel> {

  endpoint = '/playlist/soundcloud';
  model: IPlaylistModelConstructor = PlaylistSoundcloudModel;

}
