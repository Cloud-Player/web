import {PlaylistItemsSoundcloudCollection} from '../../playlists/playlist-item/playlist-items-soundcloud.collection';
import {FavouriteTrackItemSoundcloudModel} from './favourite-track-item-soundcloud.model';
import {PlaylistItemSoundcloudModel} from '../../playlists/playlist-item/playlist-item-soundcloud.model';
import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {IFavouriteTrackItems} from './favourite-track-items.interface';
import {SoundcloudProxyCollection} from '../../soundcloud/soundcloud-proxy.collection';

export class FavouriteTrackItemsSoundcloudCollection<TModel extends FavouriteTrackItemSoundcloudModel>
  extends PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel> implements IFavouriteTrackItems<IFavouriteTrackItem> {

  endpoint = '/users/me/favorites';

  model = FavouriteTrackItemSoundcloudModel;

  setEndpoint(playlistId: number) {
    this.queryParams.playlistId = playlistId;
    this.endpoint = `/playlistItems`;
  }

  fetch() {
    return SoundcloudProxyCollection.prototype.fetch.apply(this, arguments);
  }

  create() {
    return SoundcloudProxyCollection.prototype.create.apply(this, arguments);
  }
}
