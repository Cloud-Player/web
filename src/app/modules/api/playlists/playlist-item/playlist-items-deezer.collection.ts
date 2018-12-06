import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappCollection} from '../../auxapp/auxapp.collection';
import {PlaylistItemDeezerModel} from './playlist-item-deezer.model';
import {PlaylistItemsAuxappCollection} from './playlist-items-auxapp.collection';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';

export class PlaylistItemsDeezerCollection<TModel extends PlaylistItemDeezerModel>
  extends PlaylistItemsAuxappCollection<PlaylistItemAuxappModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemDeezerModel;

  setEndpoint(playlistId: string) {
    this.endpoint = `/playlist/deezer/${playlistId}/item`;
  }
}
