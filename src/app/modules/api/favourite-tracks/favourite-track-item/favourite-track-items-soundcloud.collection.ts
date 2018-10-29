import {PlaylistItemsSoundcloudCollection} from '../../playlists/playlist-item/playlist-items-soundcloud.collection';
import {FavouriteTrackItemSoundcloudModel} from './favourite-track-item-soundcloud.model';
import {PlaylistItemSoundcloudModel} from '../../playlists/playlist-item/playlist-item-soundcloud.model';
import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {IFavouriteTrackItems} from './favourite-track-items.interface';

export class FavouriteTrackItemsSoundcloudCollection<TModel extends FavouriteTrackItemSoundcloudModel>
  extends PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel> implements IFavouriteTrackItems<IFavouriteTrackItem> {

  model = FavouriteTrackItemSoundcloudModel;

  setEndpoint(favouriteId: string) {
    this.endpoint = `favourite/soundcloud/${favouriteId}/item`;
  }
}
