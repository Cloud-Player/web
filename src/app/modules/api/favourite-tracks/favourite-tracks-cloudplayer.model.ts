import {IFavouriteTracks} from './favourite-tracks.interface';
import {CloudplayerModel} from '../cloud-player/cloud-player.model';
import {nested} from '../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {IPlaylistItem} from '../playlists/playlist-item/playlist-item.interface';
import {ITrack} from '../tracks/track.interface';
import {FavouriteTrackItemsCloudplayerCollection} from './favourite-track-item/favourite-track-items-cloudplayer.collection';
import {FavouriteTrackItemCloudplayerModel} from './favourite-track-item/favourite-track-item-cloudplayer.model';

export class FavouriteTracksCloudplayerModel extends CloudplayerModel implements IFavouriteTracks {
  private _favouriteTracksMap: any;
  endpoint = '/favourite/cloudplayer';

  @attributesKey('items')
  @nested()
  items: FavouriteTrackItemsCloudplayerCollection<FavouriteTrackItemCloudplayerModel>;

  parse(attributes) {
    delete attributes.items;
    return attributes;
  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'mine');
    const superCall = super.fetch.apply(this, ...args).then(() => {
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
      delete this._favouriteTracksMap[item.track.id];
    });
    this.items.on('reset', (item: IPlaylistItem) => {
      this._favouriteTracksMap = {};
    });
    this.on('change:id', () => {
      this.items.endpoint = `${this.endpoint}/${this.id}/item`;
    });
  }

  public trackIsFavourited(track: ITrack) {
    return !!this._favouriteTracksMap[track.id];
  }
}

