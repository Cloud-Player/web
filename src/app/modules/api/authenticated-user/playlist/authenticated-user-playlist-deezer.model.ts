import {IPlaylist} from '../../playlists/playlist.interface';
import {PlaylistAuxappModel} from '../../playlists/playlist-auxapp.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';
import {PlaylistItemAuxappModel} from '../../playlists/playlist-item/playlist-item-auxapp.model';
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
  @defaultValue(true)
  public canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsDeezerCollection<PlaylistItemDeezerModel>;

  compose(attrs: any) {
    return {
      title: attrs.title,
      public: attrs.public,
      description: attrs.description
    };
  }
}
