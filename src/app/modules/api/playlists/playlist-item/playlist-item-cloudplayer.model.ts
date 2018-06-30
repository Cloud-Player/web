import {CloudplayerModel} from '../../cloud-player/cloud-player.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {dynamicInstance} from '../../../backbone/decorators/dynamic-instance.decorator';
import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {TrackYoutubeModel} from '../../tracks/track-youtube.model';

export class PlaylistItemCloudplayerModel
  extends CloudplayerModel implements IPlaylistItem {

  public type = 'cloudplayer';

  @attributesKey('track')
  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      soundcloud: TrackSoundcloudModel,
      youtube: TrackYoutubeModel
    }
  })
  track: TrackSoundcloudModel;

  @attributesKey('created')
  created: number;

  parse(attributes) {
    const parsedTrack = {
      id: attributes.track_id,
      provider_id: attributes.track_provider_id
    };
    delete attributes.track_id;
    delete attributes.track_provider_id;
    attributes.track = parsedTrack;
    return attributes;
  }

  compose() {
    return {
      track_provider_id: this.track.provider,
      track_id: this.track.id,
      rank: this.collection.length
    };
  }
}
