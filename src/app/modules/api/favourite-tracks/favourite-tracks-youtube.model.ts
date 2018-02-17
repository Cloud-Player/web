import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IFavouriteTracks} from './favourite-tracks.interface';
import {YoutubeProxyModel} from '../youtube/youtube-proxy.model';
import {TrackYoutubeModel} from '../tracks/track-youtube.model';
import {isArray} from 'underscore';
import {FavouriteTrackItemsYoutubeCollection} from './favourite-track-item/favourite-track-items-youtube.collection';
import {FavouriteTrackItemYoutubeModel} from './favourite-track-item/favourite-track-item-youtube.model';

export class FavouriteTracksYoutubeModel extends YoutubeProxyModel implements IFavouriteTracks {
  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsYoutubeCollection<FavouriteTrackItemYoutubeModel>;

  parse(attributes) {
    const items = [];
    if (isArray(attributes.items)) {
      attributes.items.forEach((track) => {
        items.push({track: new TrackYoutubeModel(track, {parse: true})});
      });
    }
    return {
      items: items
    };
  }
}
