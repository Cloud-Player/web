import {TrackSoundcloudModel} from '../../tracks/track-soundcloud.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {PlaylistItemsSoundcloudCollection} from './playlist-items-soundcloud.collection';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';

export class PlaylistItemSoundcloudModel
  extends PlaylistItemAuxappModel implements IPlaylistItem {

  public type = 'soundcloud';

  @attributesKey('track')
  @nested()
  track: TrackSoundcloudModel;
}
