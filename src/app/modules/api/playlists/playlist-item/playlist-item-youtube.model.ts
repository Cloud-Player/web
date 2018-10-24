import {TrackYoutubeModel} from '../../tracks/track-youtube.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {YoutubeProxyModel} from '../../youtube/youtube-proxy.model';
import {queryParam} from '../../../backbone/decorators/query-param.decorator';
import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {TrackDeezerModel} from '../../tracks/track-deezer.model';

export class PlaylistItemYoutubeModel
  extends AuxappModel implements IPlaylistItem {
  public type = 'youtube';

  @attributesKey('track')
  @nested()
  track: TrackYoutubeModel;

  @attributesKey('created')
  created: number;

  parse(attributes) {
    if (!attributes.track) {
      if (!this.track || this.track.isNew()) {
        attributes.track = {
          id: attributes.id,
          provider_id: attributes.provider_id
        };
      } else {
        delete attributes.track;
      }
    }
    delete attributes.track_id;
    delete attributes.track_provider_id;
    return attributes;
  }
}
