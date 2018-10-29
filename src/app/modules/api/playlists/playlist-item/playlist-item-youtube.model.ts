import {TrackYoutubeModel} from '../../tracks/track-youtube.model';
import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';

export class PlaylistItemYoutubeModel
  extends PlaylistItemAuxappModel implements IPlaylistItem {
  public type = 'youtube';

  @attributesKey('track')
  @nested()
  track: TrackYoutubeModel;
}
