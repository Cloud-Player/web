import {PlaylistItemSoundcloudModel} from './playlist-item-soundcloud.model';
import {TracksSoundcloudCollection} from '../../tracks/tracks-soundcloud.collection';
import {ITrack} from '../../tracks/track.interface';
import {SoundcloudProxyModel} from '../../soundcloud/soundcloud-proxy.model';
import {SoundcloudProxyCollection} from '../../soundcloud/soundcloud-proxy.collection';
import {IPlaylistItem} from './playlist-item.interface';
import {IPlaylistItems} from './playlist-items.interface';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {debounce} from 'underscore';

export class PlaylistItemsSoundcloudCollection<TModel extends PlaylistItemSoundcloudModel>
  extends SoundcloudProxyCollection<SoundcloudProxyModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemSoundcloudModel;

  hasCreatedAttribute = false;

  constructor(...args) {
    super(...args);
    const debouncedFetchDetails = debounce(this.fetchTrackDetails.bind(this), 100);
    this.on('update reset add', debouncedFetchDetails, this);
  }

  private fetchTrackDetails() {
    const trackIds = [];
    this.pluck('track').forEach((track: ITrack) => {
      trackIds.push(track.id);
    });
    return this.getTrackDetails(trackIds);
  }

  create(item: TModel): Promise<TModel> {
    this.add(item);
    return this.triggerSave(item);
  }

  triggerSave(item: TModel): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.trigger('save', item, this);
      this.once('save:completed', resolve.bind(this, item));
      this.once('save:error', reject.bind(this));
    });
  }

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlists/${playlistId}`;
  }

  fetch(): any {
    return new Promise<any>((resolve, reject) => {
      this.trigger('fetch');
      this.once('sync', resolve.bind(this));
      this.once('error', reject.bind(this));
    });
  }

  public getTrackDetails(trackIds: Array<string>) {
    return TracksSoundcloudCollection.getTrackDetails(trackIds).then((rsp: any) => {
      rsp.forEach((rspItem) => {
        const playlistItem = <PlaylistItemSoundcloudModel>this.find((item: PlaylistItemSoundcloudModel) => {
          return item.track.id.toString() === rspItem.id.toString();
        });
        if (playlistItem) {
          playlistItem.track.hasDetails = true;
          playlistItem.track.set(playlistItem.track.parse(rspItem));
        }
      });
      return this;
    });
  }

  public sort(options?: any) {
    const orgComparator = this.comparator;
    this.comparator = SortPlaylistItemsComparator.sortItems(this, orgComparator);
    const result = super.sort(options);
    this.comparator = orgComparator;
    return result;
  }

}
