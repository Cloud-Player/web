import {FavouriteTrackItemAuxappModel} from './favourite-track-item-auxapp.model';
import {PlaylistItemAuxappModel} from '../../playlists/playlist-item/playlist-item-auxapp.model';
import {IPlaylistItems} from '../../playlists/playlist-item/playlist-items.interface';
import {IPlaylistItem} from '../../playlists/playlist-item/playlist-item.interface';
import {PlaylistItemsAuxappCollection} from '../../playlists/playlist-item/playlist-items-auxapp.collection';

export class FavouriteTrackItemsAuxappCollection<TModel extends FavouriteTrackItemAuxappModel>
  extends PlaylistItemsAuxappCollection<PlaylistItemAuxappModel> implements IPlaylistItems<IPlaylistItem> {

  endpoint = '/favourite/auxapp/mine/item';
  model = FavouriteTrackItemAuxappModel;

  private prepareItem(item: any): any {
    if (!item.id && item instanceof FavouriteTrackItemAuxappModel) {
      item.set('id', item.track.id);
    } else if (!item.id) {
      item.id = item.track.id;
    }
    return item;
  }

  setEndpoint() {

  }
}
