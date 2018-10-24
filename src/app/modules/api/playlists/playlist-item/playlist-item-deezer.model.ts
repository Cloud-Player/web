import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {dynamicInstance} from '../../../backbone/decorators/dynamic-instance.decorator';
import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {TrackYoutubeModel} from '../../tracks/track-youtube.model';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {ITrack} from '../../tracks/track.interface';
import {TrackMixcloudModel} from '../../tracks/track-mixcloud.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {TrackDeezerModel} from '../../tracks/track-deezer.model';

export class PlaylistItemDeezerModel
  extends AuxappModel implements IPlaylistItem {

  public type = 'deezer';

  @attributesKey('track')
  @nested()
  track: TrackDeezerModel;

  @attributesKey('created')
  created: number;

  parse(attributes) {
    if (!attributes.track) {
      if (!this.track || this.track.isNew()) {
        attributes.track = {
          id: attributes.track_id,
          provider_id: attributes.track_provider_id
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
