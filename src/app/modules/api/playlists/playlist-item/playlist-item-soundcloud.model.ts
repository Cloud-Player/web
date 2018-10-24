import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {SoundcloudProxyModel} from '../../soundcloud/soundcloud-proxy.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {PlaylistItemsSoundcloudCollection} from './playlist-items-soundcloud.collection';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../../auxapp/auxapp.model';

export class PlaylistItemSoundcloudModel
  extends AuxappModel implements IPlaylistItem {

  collection: PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel>;

  public type = 'soundcloud';

  @attributesKey('track')
  @nested()
  track: TrackSoundcloudModel;

  @attributesKey('created')
  @defaultValue(0)
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
