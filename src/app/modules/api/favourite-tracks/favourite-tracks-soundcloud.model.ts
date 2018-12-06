import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IFavouriteTracks} from './favourite-tracks.interface';
import {FavouriteTrackItemsSoundcloudCollection} from './favourite-track-item/favourite-track-items-soundcloud.collection';
import {FavouriteTrackItemSoundcloudModel} from './favourite-track-item/favourite-track-item-soundcloud.model';
import {AuxappModel} from '../auxapp/auxapp.model';

export class FavouriteTracksSoundcloudModel extends AuxappModel implements IFavouriteTracks {
  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsSoundcloudCollection<FavouriteTrackItemSoundcloudModel>;

  setEndpoint(accountId: string) {
    this.queryParams['account_id'] = accountId;
    this.endpoint = `/favourite/soundcloud`;
    this.items.setEndpoint(accountId);
  }
}
