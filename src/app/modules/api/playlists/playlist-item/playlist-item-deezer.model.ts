import {IPlaylistItem} from './playlist-item.interface';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {AuxappModel} from '../../auxapp/auxapp.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {TrackDeezerModel} from '../../tracks/track-deezer.model';
import {PlaylistItemAuxappModel} from './playlist-item-auxapp.model';

export class PlaylistItemDeezerModel
  extends PlaylistItemAuxappModel implements IPlaylistItem {

  public type = 'deezer';

  @attributesKey('track')
  @nested()
  track: TrackDeezerModel;
}
