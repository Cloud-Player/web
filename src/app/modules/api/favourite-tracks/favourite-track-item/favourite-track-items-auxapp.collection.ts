import {FavouriteTrackItemAuxappModel} from './favourite-track-item-auxapp.model';
import {PlaylistItemAuxappModel} from '../../playlists/playlist-item/playlist-item-auxapp.model';
import {IPlaylistItems} from '../../playlists/playlist-item/playlist-items.interface';
import {IPlaylistItem} from '../../playlists/playlist-item/playlist-item.interface';
import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';

export class FavouriteTrackItemsAuxappCollection<TModel extends FavouriteTrackItemAuxappModel>
  extends PlaylistItemsAuxappCollection<PlaylistItemAuxappModel> implements IPlaylistItems<IPlaylistItem> {

  model = FavouriteTrackItemAuxappModel;

  setEndpoint(favouriteId: string) {
    this.endpoint = `favourite/auxapp/${favouriteId}/item`;
  }

  fetch(): any {
    if (this.endpoint) {
      return super.fetch();
    }
  }
}
