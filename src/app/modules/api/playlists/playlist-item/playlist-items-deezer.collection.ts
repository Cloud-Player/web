import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';
import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappCollection} from '../../auxapp/auxapp.collection';
import {PlaylistItemDeezerModel} from './playlist-item-deezer.model';

export class PlaylistItemsDeezerCollection<TModel extends PlaylistItemDeezerModel>
  extends AuxappCollection<TModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemDeezerModel;

  hasCreatedAttribute = true;

  public sort(options?: any) {
    const orgComparator = this.comparator;
    this.comparator = SortPlaylistItemsComparator.sortItems(this, orgComparator);
    const result = super.sort(options);
    this.comparator = orgComparator;
    return result;
  }

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlist/deezer/${playlistId}/item`;
  }
}
