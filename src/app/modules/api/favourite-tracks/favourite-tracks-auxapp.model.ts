import {IFavouriteTracks} from './favourite-tracks.interface';
import {AuxappModel} from '../auxapp/auxapp.model';
import {nested} from '../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {IPlaylistItem} from '../playlists/playlist-item/playlist-item.interface';
import {ITrack} from '../tracks/track.interface';
import {FavouriteTrackItemsAuxappCollection} from './favourite-track-item/favourite-track-items-auxapp.collection';
import {FavouriteTrackItemAuxappModel} from './favourite-track-item/favourite-track-item-auxapp.model';

export class FavouriteTracksAuxappModel extends AuxappModel implements IFavouriteTracks {
  private _favouriteTracksMap: any;
  endpoint = '/favourite/auxapp';

  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsAuxappCollection<FavouriteTrackItemAuxappModel>;

  parse(attributes) {
    delete attributes.items;
    return attributes;
  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'mine');
    const superCall = super.fetch.apply(this, ...args).then(() => {
      this.items.setEndpoint(this.id);
      this.items.fetch();
      return this;
    });
    this.set('id', id);
    return superCall;
  }

  initialize() {
    this._favouriteTracksMap = {};
    this.items.on('add', (item: IPlaylistItem) => {
      this._favouriteTracksMap[item.track.id] = item.track;
    });
    this.items.on('remove', (item: IPlaylistItem) => {
      this._favouriteTracksMap[item.track.id] = null;
    });
    this.items.on('reset', (item: IPlaylistItem) => {
      this._favouriteTracksMap = {};
    });
  }

  public trackIsFavourited(track: ITrack) {
    return !!this._favouriteTracksMap[track.id];
  }
}

