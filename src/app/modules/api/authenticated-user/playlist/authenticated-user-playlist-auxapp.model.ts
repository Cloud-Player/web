import {IPlaylist} from '../../playlists/playlist.interface';
import {PlaylistAuxappModel} from '../../playlists/playlist-auxapp.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';
import {PlaylistItemAuxappModel} from '../../playlists/playlist-item/playlist-item-auxapp.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserPlaylistAuxappModel
  extends PlaylistAuxappModel implements IPlaylist {

  @attributesKey('account_id')
  public accountId: string;

  @attributesKey('canEdit')
  @defaultValue(true)
  public canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsAuxappCollection<PlaylistItemAuxappModel>;

  compose(attrs: any) {
    return {
      title: attrs.title,
      public: attrs.public,
      description: attrs.description
    };
  }
}
