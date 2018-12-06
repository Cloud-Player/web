import {IPlaylist} from '../../playlists/playlist.interface';
import {PlaylistYoutubeModel} from '../../playlists/playlist-youtube.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {PlaylistItemsYoutubeCollection} from '../../playlists/playlist-item/playlist-items-youtube.collection';
import {PlaylistItemYoutubeModel} from '../../playlists/playlist-item/playlist-item-youtube.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserPlaylistYoutubeModel
  extends PlaylistYoutubeModel implements IPlaylist {

  @attributesKey('canEdit')
  @defaultValue(false)
  canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel>;
}
