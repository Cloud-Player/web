import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {PlaylistItemCloudplayerModel} from '../../playlists/playlist-item/playlist-item-cloudplayer.model';

export class FavouriteTrackItemCloudplayerModel
  extends PlaylistItemCloudplayerModel implements IFavouriteTrackItem {

  compose(): any {
    return {
      track_provider_id: this.track.provider,
      track_id: this.track.id.toString()
    };
  }

}
