import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IPlaylist} from './playlist.interface';
import {queryParam} from '../../backbone/decorators/query-param.decorator';
import {PlaylistItemYoutubeModel} from './playlist-item/playlist-item-youtube.model';
import {PlaylistItemsYoutubeCollection} from './playlist-item/playlist-items-youtube.collection';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {AuxappModel} from '../auxapp/auxapp.model';
import {PlaylistAuxappModel} from './playlist-auxapp.model';

export class PlaylistYoutubeModel extends PlaylistAuxappModel implements IPlaylist {

  endpoint = '/playlist/youtube';

  @attributesKey('provider')
  @defaultValue('youtube')
  provider: string;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel>;
}
