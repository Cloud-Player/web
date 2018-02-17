import {ITrack} from '../../tracks/track.interface';
import {PlaylistItemCloudplayerModel} from './playlist-item-cloudplayer.model';
import {IPlaylistItems} from './playlist-items.interface';
import {CloudplayerCollection} from '../../cloud-player/cloud-player.collection';
import {CloudplayerModel} from '../../cloud-player/cloud-player.model';
import {IPlaylistItem} from './playlist-item.interface';
import {PlaylistItemsSoundcloudCollection} from './playlist-items-soundcloud.collection';
import {PlaylistItemsYoutubeCollection} from './playlist-items-youtube.collection';
import {debounce} from 'underscore';

export class PlaylistItemsCloudplayerCollection<TModel extends PlaylistItemCloudplayerModel>
  extends CloudplayerCollection<CloudplayerModel> implements IPlaylistItems<IPlaylistItem> {

  model = PlaylistItemCloudplayerModel;

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

  setEndpoint(playlistId: number) {
    this.endpoint = `/playlist/cloudplayer/${playlistId}/item`;
  }
}
