import {IPlaylist} from '../../playlists/playlist.interface';
import {PlaylistCloudplayerModel} from '../../playlists/playlist-cloudplayer.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {PlaylistItemsCloudplayerCollection} from '../../playlists/playlist-item/playlist-items-cloudplayer.collection';
import {PlaylistItemCloudplayerModel} from '../../playlists/playlist-item/playlist-item-cloudplayer.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserPlaylistCloudplayerModel
  extends PlaylistCloudplayerModel implements IPlaylist {

  @attributesKey('account_id')
  public accountId: string;

  @attributesKey('canEdit')
  @defaultValue(true)
  public canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsCloudplayerCollection<PlaylistItemCloudplayerModel>;

  compose(attrs: any) {
    return {
      title: attrs.title,
      public: attrs.isPublic,
      account_id: attrs.account_id
    };
  }
}
