import {PlaylistItemSoundcloudModel} from './playlist-item-soundcloud.model';
import {IPlaylistItem} from './playlist-item.interface';
import {IPlaylistItems} from './playlist-items.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappCollection} from '../../auxapp/auxapp.collection';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {PlaylistItemsAuxappCollection} from './playlist-items-auxapp.collection';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';

export class PlaylistItemsSoundcloudCollection<TModel extends PlaylistItemSoundcloudModel>
  extends PlaylistItemsAuxappCollection<PlaylistItemAuxappModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemSoundcloudModel;

  hasCreatedAttribute = false;

  setEndpoint(playlistId: string) {
    this.endpoint = `/playlist/soundcloud/${playlistId}/item`;
  }
}
