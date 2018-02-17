import {PlaylistItemSoundcloudModel} from '../../playlists/playlist-item/playlist-item-soundcloud.model';
import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {SoundcloudProxyModel} from '../../soundcloud/soundcloud-proxy.model';

export class FavouriteTrackItemSoundcloudModel
  extends PlaylistItemSoundcloudModel implements IFavouriteTrackItem {

  destroy() {
    return SoundcloudProxyModel.prototype.destroy.apply(this, arguments);
  }

  save() {
    return SoundcloudProxyModel.prototype.save.apply(this, arguments);
  }
}
