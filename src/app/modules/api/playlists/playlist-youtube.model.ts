import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {IPlaylist} from './playlist.interface';
import {YoutubeProxyModel} from '../youtube/youtube-proxy.model';
import {ImageYoutubeModel} from '../image/image-youtube.model';
import {queryParam} from '../../backbone/decorators/query-param.decorator';
import {PlaylistItemYoutubeModel} from './playlist-item/playlist-item-youtube.model';
import {PlaylistItemsYoutubeCollection} from './playlist-item/playlist-items-youtube.collection';
import {ArtistYoutubeModel} from '../artist/artist-youtube.model';

export class PlaylistYoutubeModel extends YoutubeProxyModel implements IPlaylist {
  endpoint = '/playlists';

  @queryParam()
  part = 'snippet';

  @attributesKey('provider')
  @defaultValue('youtube')
  provider: string;

  @attributesKey('canEdit')
  @defaultValue(false)
  canEdit: boolean;

  @attributesKey('isPublic')
  @defaultValue(false)
  isPublic: boolean;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('description')
  description: string;

  @attributesKey('user')
  @nested()
  artist: ArtistYoutubeModel;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsYoutubeCollection<PlaylistItemYoutubeModel>;

  @attributesKey('image')
  @nested()
  image: ImageYoutubeModel;

  parse(attributes) {
    if (attributes.items) {
      attributes = attributes.items[0];
    }
    const parsedPlaylist: any = {
      id: attributes.id
    };
    if (attributes.snippet) {
      parsedPlaylist.title = attributes.snippet.title;
      parsedPlaylist.description = attributes.snippet.description;
      parsedPlaylist.image = attributes.snippet.thumbnails;
      parsedPlaylist.artist = {
        id: attributes.snippet.channelId,
        title: attributes.snippet.channelTitle
      };
    }
    if (attributes.status) {
      parsedPlaylist.isPublic = attributes.status.privacyStatus === 'public';
    }
    return parsedPlaylist;
  }

  initialize(): void {
    if (this.id) {
      this.items.setEndpoint(this.id);
    }
    this.on('change:id', () => {
      this.items.setEndpoint(this.id);
    });
  }
}
