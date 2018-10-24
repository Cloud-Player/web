import {PlaylistItemSoundcloudModel} from './playlist-item-soundcloud.model';
import {IPlaylistItem} from './playlist-item.interface';
import {IPlaylistItems} from './playlist-items.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappCollection} from '../../auxapp/auxapp.collection';
import {AuxappModel} from '../../auxapp/auxapp.model';

export class PlaylistItemsSoundcloudCollection<TModel extends PlaylistItemSoundcloudModel>
  extends AuxappCollection<AuxappModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemSoundcloudModel;

  hasCreatedAttribute = false;

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlist/soundcloud/${playlistId}/item`;
  }

  public sort(options?: any) {
    const orgComparator = this.comparator;
    this.comparator = SortPlaylistItemsComparator.sortItems(this, orgComparator);
    const result = super.sort(options);
    this.comparator = orgComparator;
    return result;
  }

}
