import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IFavouriteTracks} from './favourite-tracks.interface';
import {FavouriteTrackItemsYoutubeCollection} from './favourite-track-item/favourite-track-items-youtube.collection';
import {FavouriteTrackItemYoutubeModel} from './favourite-track-item/favourite-track-item-youtube.model';
import {AuxappModel} from '../auxapp/auxapp.model';

export class FavouriteTracksYoutubeModel extends AuxappModel implements IFavouriteTracks {
  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsYoutubeCollection<FavouriteTrackItemYoutubeModel>;

  setEndpoint(accountId: string) {
    this.queryParams['account_id'] = accountId;
    this.endpoint = `/favourite/youtube`;
    this.items.setEndpoint(accountId);
  }
}
