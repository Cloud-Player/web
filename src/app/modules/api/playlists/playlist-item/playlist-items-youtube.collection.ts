import {TracksYoutubeCollection} from '../../tracks/tracks-youtube.collection';
import {ITrack} from '../../tracks/track.interface';
import {PlaylistItemYoutubeModel} from './playlist-item-youtube.model';
import {queryParam} from '../../../backbone/decorators/query-param.decorator';
import {YoutubeProxyCollection} from '../../youtube/youtube-proxy.collection';
import {YoutubeProxyModel} from '../../youtube/youtube-proxy.model';
import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {debounce} from 'underscore';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';

export class PlaylistItemsYoutubeCollection<TModel extends PlaylistItemYoutubeModel>
  extends YoutubeProxyCollection<YoutubeProxyModel> implements IPlaylistItems<IPlaylistItem> {
  private _playlistId: string;
  model = PlaylistItemYoutubeModel;

  @queryParam()
  part = 'snippet';

  @queryParam()
  maxResults = 50;

  hasCreatedAttribute = true;

  constructor(...args) {
    super(...args);
    const debouncedFetchDetails = debounce(this.fetchTrackDetails.bind(this), 100);
    this.on('update reset add', debouncedFetchDetails, this);
    this.on('add', (item) => {
      item.setEndpoint(this._playlistId);
    });
  }

  setEndpoint(playlistId: string) {
    this.queryParams.playlistId = playlistId;
    this.endpoint = `/playlistItems`;
    this._playlistId = playlistId;
  }

  fetchTrackDetails() {
    const trackIds = [];
    this.pluck('track').forEach((track: ITrack) => {
      if (track.id) {
        trackIds.push(track.id);
      }
    });
    return this.getTrackDetails(trackIds);
  }

  getTrackDetails(trackIds: Array<string>) {
    return TracksYoutubeCollection.getTrackDetails(trackIds).then((rsp: any) => {
      rsp.items.forEach((rspItem) => {
        const playlistItem = <PlaylistItemYoutubeModel>this.find((item: PlaylistItemYoutubeModel) => {
          return item.track.id === rspItem.id;
        });
        if (playlistItem) {
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
