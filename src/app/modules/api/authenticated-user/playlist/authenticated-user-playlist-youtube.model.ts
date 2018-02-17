import {IPlaylist} from '../../playlists/playlist.interface';
import {PlaylistYoutubeModel} from '../../playlists/playlist-youtube.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {PlaylistItemsYoutubeCollection} from '../../playlists/playlist-item/playlist-items-youtube.collection';
import {PlaylistItemYoutubeModel} from '../../playlists/playlist-item/playlist-item-youtube.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';

export class AuthenticatedUserPlaylistYoutubeModel
  extends PlaylistYoutubeModel implements IPlaylist {

  endpoint = '/playlists';

  @attributesKey('canEdit')
  @defaultValue(true)
  canEdit: boolean;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel>;

  compose(attrs: any) {
    return {
      snippet: {
        title: attrs.title
      }
    };
  }

}
