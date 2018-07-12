import {ITrack} from '../../tracks/track.interface';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';
import {IPlaylistItems} from './playlist-items.interface';
import {IPlaylistItem} from './playlist-item.interface';
import {PlaylistItemsSoundcloudCollection} from './playlist-items-soundcloud.collection';
import {PlaylistItemsYoutubeCollection} from './playlist-items-youtube.collection';
import {debounce} from 'underscore';
import {SortPlaylistItemsComparator} from './sort-playlist-items-comparator';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {AuxappCollection} from '../../auxapp/auxapp.collection';

export class PlaylistItemsAuxappCollection<TModel extends PlaylistItemAuxappModel>
  extends AuxappCollection<AuxappModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemAuxappModel;

  hasCreatedAttribute = true;

  constructor(...args) {
    super(...args);
    const debouncedFetchDetails = debounce(this.fetchDetails.bind(this), 100);
    this.on('update reset add', debouncedFetchDetails, this);
  }

  private fetchDetails() {
    const url = `${this.hostName()}/proxy/youtube/videos`;
    const youtubeTrackIds = [];
    const soundcloudTrackIds = [];
    this.pluck('track').forEach((track: ITrack) => {
      if (!track.hasDetails) {
        switch (track.provider) {
          case 'youtube':
            youtubeTrackIds.push(track.id);
            break;
          case 'soundcloud':
            soundcloudTrackIds.push(track.id);
            break;
        }
      }
    });
    PlaylistItemsSoundcloudCollection.prototype.getTrackDetails.call(this, soundcloudTrackIds);
    PlaylistItemsYoutubeCollection.prototype.getTrackDetails.call(this, youtubeTrackIds);
  }

  public sort(options?: any) {
    const orgComparator = this.comparator;
    this.comparator = SortPlaylistItemsComparator.sortItems(this, orgComparator);
    const result = super.sort(options);
    this.comparator = orgComparator;
    return result;
  }

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlist/auxapp/${playlistId}/item`;
  }
}
