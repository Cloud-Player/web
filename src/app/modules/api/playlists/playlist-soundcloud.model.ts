import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {SoundcloudProxyModel} from '../soundcloud/soundcloud-proxy.model';
import {IPlaylist} from './playlist.interface';
import {PlaylistItemsSoundcloudCollection} from './playlist-item/playlist-items-soundcloud.collection';
import {PlaylistItemSoundcloudModel} from './playlist-item/playlist-item-soundcloud.model';
import {ImageSoundcloudModel} from '../image/image-soundcloud.model';
import {ArtistAuxappModel} from '../artist/artist-auxapp.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {ImageAuxappModel} from '../image/image-auxapp.model';

export class PlaylistSoundcloudModel
  extends SoundcloudProxyModel implements IPlaylist {

  endpoint = '/playlists';

  @attributesKey('provider')
  @defaultValue('soundcloud')
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
  artist: ArtistAuxappModel;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsSoundcloudCollection<PlaylistItemSoundcloudModel>;

  @attributesKey('artwork_url')
  @nested()
  image: ImageAuxappModel;

  private setCover(item: IPlaylistItem) {
    if (item.track.image.getSmallSizeUrl()) {
      this.image.small = item.track.image.getSmallSizeUrl();
      this.image.medium = item.track.image.getMediumSizeUrl();
      this.image.large = item.track.image.getLargeSizeUrl();
    } else {
      item.track.image.on('change', () => {
        this.setCover(item);
      });
    }
  }

  parse(attributes) {
    delete attributes.items;
    return attributes;
  }

  initialize(): void {
    if (this.id) {
      this.items.setEndpoint(this.id);
    }
    this.on('change:id', () => {
      this.items.setEndpoint(this.id);
    });
    this.items.once('add', (item: IPlaylistItem) => {
      if (!this.image.getSmallSizeUrl()) {
        this.setCover(item);
      }
    });
  }
}
