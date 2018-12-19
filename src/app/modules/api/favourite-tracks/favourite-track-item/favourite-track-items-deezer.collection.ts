import {FavouriteTrackItemYoutubeModel} from './favourite-track-item-youtube.model';
import {IFavouriteTrackItems} from './favourite-track-items.interface';
import {PlaylistItemYoutubeModel} from '../../playlists/playlist-item/playlist-item-youtube.model';
import {PlaylistItemsYoutubeCollection} from '../../playlists/playlist-item/playlist-items-youtube.collection';
import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {FavouriteTrackItemDeezerModel} from './favourite-track-item-deezer.model';

export class FavouriteTrackItemsDeezerCollection<TModel extends FavouriteTrackItemYoutubeModel>
  extends PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel> implements IFavouriteTrackItems<IFavouriteTrackItem> {

  model = FavouriteTrackItemDeezerModel;

  setEndpoint(favouriteId: string) {
    this.endpoint = `favourite/deezer/${favouriteId}/item`;
  }
}
