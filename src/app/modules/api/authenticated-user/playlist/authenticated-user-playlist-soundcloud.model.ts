import {PlaylistSoundcloudModel} from '../../playlists/playlist-soundcloud.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {PlaylistItemsSoundcloudCollection} from '../../playlists/playlist-item/playlist-items-soundcloud.collection';
import {PlaylistItemSoundcloudModel} from '../../playlists/playlist-item/playlist-item-soundcloud.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserPlaylistSoundcloudModel
  extends PlaylistSoundcloudModel {

  @attributesKey('canEdit')
  @defaultValue(false)
  canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel>;
}
