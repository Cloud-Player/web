import {IFavouriteTrackItem} from './favourite-track-item.interface';
import {PlaylistItemYoutubeModel} from '../../playlists/playlist-item/playlist-item-youtube.model';

export class FavouriteTrackItemYoutubeModel
  extends PlaylistItemYoutubeModel implements IFavouriteTrackItem {

  parse(attributes) {
    const parsedFavouriteTrack = {
      id: attributes.id,
      snippet: attributes.snippet
    };
    parsedFavouriteTrack.snippet.resourceId = attributes.id;
    return super.parse.call(this, parsedFavouriteTrack);
  }

  compose(attributes) {
    return null;
  }

  save(attributes?: any, options: any = {}): any {
    const endpoint = this.endpoint;
    this.endpoint = '/videos/rate';
    const request = this.request(this.url(), 'POST', {
      params: {
        id: this.track.id,
        rating: 'like'
      }
    });
    this.endpoint = endpoint;
    return request;
  }

  destroy(attributes?: any, options: any = {}): any {
    const endpoint = this.endpoint;
    this.endpoint = '/videos/rate';
    this.set('id', null, {silent: true});
    const request = this.request(this.url(), 'POST', {
      params: {
        id: this.track.id,
        rating: 'none'
      }
    }).then(() => {
      this.collection.remove(this);
    });
    this.endpoint = endpoint;
    return request;
  }
}
