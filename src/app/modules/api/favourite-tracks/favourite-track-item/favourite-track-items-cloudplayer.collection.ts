import {FavouriteTrackItemCloudplayerModel} from './favourite-track-item-cloudplayer.model';
import {PlaylistItemCloudplayerModel} from '../../playlists/playlist-item/playlist-item-cloudplayer.model';
import {IPlaylistItems} from '../../playlists/playlist-item/playlist-items.interface';
import {IPlaylistItem} from '../../playlists/playlist-item/playlist-item.interface';
import {PlaylistItemsCloudplayerCollection} from '../../playlists/playlist-item/playlist-items-cloudplayer.collection';

export class FavouriteTrackItemsCloudplayerCollection<TModel extends FavouriteTrackItemCloudplayerModel>
  extends PlaylistItemsCloudplayerCollection<PlaylistItemCloudplayerModel> implements IPlaylistItems<IPlaylistItem> {

  endpoint = '/favourite/cloudplayer/mine/item';
  model = FavouriteTrackItemCloudplayerModel;

  private prepareItem(item: any): any {
    if (!item.id && item instanceof FavouriteTrackItemCloudplayerModel) {
      item.set('id', item.track.id);
    } else if (!item.id) {
      item.id = item.track.id;
    }
    return item;
  }

  setEndpoint() {

  }
}
