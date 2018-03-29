import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IFavouriteTracks} from './favourite-tracks.interface';
import {SoundcloudProxyModel} from '../soundcloud/soundcloud-proxy.model';
import {FavouriteTrackItemsSoundcloudCollection} from './favourite-track-item/favourite-track-items-soundcloud.collection';
import {FavouriteTrackItemSoundcloudModel} from './favourite-track-item/favourite-track-item-soundcloud.model';

export class FavouriteTracksSoundcloudModel extends SoundcloudProxyModel implements IFavouriteTracks {
  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsSoundcloudCollection<FavouriteTrackItemSoundcloudModel>;

  parse(attributes) {
    const parsedPlaylistItems = [];
    attributes.forEach((track) => {
      parsedPlaylistItems.push({
        id: track.id,
        track: track
      });
    });
    return {
      items: parsedPlaylistItems
    };
  }
}
