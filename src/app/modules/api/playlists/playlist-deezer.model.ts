import {AuxappModel} from '../auxapp/auxapp.model';
import {IPlaylist} from './playlist.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {ArtistAuxappModel} from '../artist/artist-auxapp.model';
import {PlaylistItemDeezerModel} from './playlist-item/playlist-item-deezer.model';
import {PlaylistItemsDeezerCollection} from './playlist-item/playlist-items-deezer.collection';
import {PlaylistAuxappModel} from './playlist-auxapp.model';

export class PlaylistDeezerModel extends PlaylistAuxappModel implements IPlaylist {

  endpoint = '/playlist/deezer';

  @attributesKey('provider')
  @defaultValue('deezer')
  provider: string;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsDeezerCollection<PlaylistItemDeezerModel>;
}

