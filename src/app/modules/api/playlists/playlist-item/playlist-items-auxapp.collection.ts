import {ITrack} from '../../tracks/track.interface';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';
import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {PlaylistItemsSoundcloudCollection} from './playlist-items-soundcloud.collection';
import {PlaylistItemsYoutubeCollection} from './playlist-items-youtube.collection';
import {debounce} from 'underscore';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {AuxappCollection} from '../../auxapp/auxapp.collection';

export class PlaylistItemsAuxappCollection<TModel extends PlaylistItemAuxappModel>
  extends AuxappCollection<TModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemAuxappModel;

  hasCreatedAttribute = true;

  public sort(options?: any) {
    const orgComparator = this.comparator;
    this.comparator = SortPlaylistItemsComparator.sortItems(this, orgComparator);
    const result = super.sort(options);
    this.comparator = orgComparator;
    return result;
  }

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlist/auxapp/${playlistId}/item`;
  }
}
