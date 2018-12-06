import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';
import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappCollection} from '../../auxapp/auxapp.collection';

export class PlaylistItemsAuxappCollection<TModel extends PlaylistItemAuxappModel>
  extends AuxappCollection<TModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemAuxappModel;

  hasCreatedAttribute = true;

  setEndpoint(playlistId: string) {
    this.endpoint = `/playlist/auxapp/${playlistId}/item`;
  }

  public sort(options?: any) {
    const orgComparator = this.comparator;
    this.comparator = SortPlaylistItemsComparator.sortItems(this, orgComparator);
    const result = super.sort(options);
    this.comparator = orgComparator;
    return result;
  }
}
