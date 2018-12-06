import {PlaylistItemYoutubeModel} from './playlist-item-youtube.model';
import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {PlaylistItemsAuxappCollection} from './playlist-items-auxapp.collection';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';

export class PlaylistItemsYoutubeCollection<TModel extends PlaylistItemYoutubeModel>
  extends PlaylistItemsAuxappCollection<PlaylistItemAuxappModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemYoutubeModel;

  setEndpoint(playlistId: string) {
    this.endpoint = `/playlist/youtube/${playlistId}/item`;
  }
}
