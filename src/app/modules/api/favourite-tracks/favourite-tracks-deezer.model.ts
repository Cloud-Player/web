import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IFavouriteTracks} from './favourite-tracks.interface';
import {FavouriteTrackItemSoundcloudModel} from './favourite-track-item/favourite-track-item-soundcloud.model';
import {AuxappModel} from '../auxapp/auxapp.model';
import {FavouriteTrackItemsDeezerCollection} from './favourite-track-item/favourite-track-items-deezer.collection';
import {FavouriteTrackItemDeezerModel} from './favourite-track-item/favourite-track-item-deezer.model';

export class FavouriteTracksDeezerModel extends AuxappModel implements IFavouriteTracks {
  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsDeezerCollection<FavouriteTrackItemDeezerModel>;

  setEndpoint(accountId: string) {
    this.queryParams['account_id'] = accountId;
    this.endpoint = `/favourite/deezer`;
    this.items.setEndpoint(accountId);
  }
}
