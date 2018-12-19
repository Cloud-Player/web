import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {PlaylistItemAuxappModel} from '../../playlists/playlist-item/playlist-item-auxapp.model';

export class FavouriteTrackItemAuxappModel
  extends PlaylistItemAuxappModel implements IFavouriteTrackItem {

  compose(): any {
    return {
      track_provider_id: this.track.provider_id,
      track_id: this.track.id.toString()
    };
  }

}
