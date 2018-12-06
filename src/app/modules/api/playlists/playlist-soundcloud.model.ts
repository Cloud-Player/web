import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IPlaylist} from './playlist.interface';
import {PlaylistItemsSoundcloudCollection} from './playlist-item/playlist-items-soundcloud.collection';
import {PlaylistItemSoundcloudModel} from './playlist-item/playlist-item-soundcloud.model';
import {ArtistAuxappModel} from '../artist/artist-auxapp.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {AuxappModel} from '../auxapp/auxapp.model';
import {PlaylistAuxappModel} from './playlist-auxapp.model';

export class PlaylistSoundcloudModel
  extends PlaylistAuxappModel implements IPlaylist {

  endpoint = '/playlist/soundcloud';

  @attributesKey('provider')
  @defaultValue('soundcloud')
  provider: string;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel>;
}
