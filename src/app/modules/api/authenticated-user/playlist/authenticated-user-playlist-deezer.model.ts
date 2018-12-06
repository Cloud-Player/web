import {IPlaylist} from '../../playlists/playlist.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {PlaylistItemsDeezerCollection} from '../../playlists/playlist-item/playlist-items-deezer.collection';
import {PlaylistItemDeezerModel} from '../../playlists/playlist-item/playlist-item-deezer.model';
import {PlaylistDeezerModel} from '../../playlists/playlist-deezer.model';

export class AuthenticatedUserPlaylistDeezerModel
  extends PlaylistDeezerModel implements IPlaylist {

  @attributesKey('account_id')
  public accountId: string;

  @attributesKey('canEdit')
  @defaultValue(false)
  public canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsDeezerCollection<PlaylistItemDeezerModel>;
}
