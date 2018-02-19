import {CloudplayerModel} from '../cloud-player/cloud-player.model';
import {IPlaylist} from './playlist.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {ImageCloudplayerModel} from '../image/image-cloudplayer.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {PlaylistItemsCloudplayerCollection} from './playlist-item/playlist-items-cloudplayer.collection';
import {PlaylistItemCloudplayerModel} from './playlist-item/playlist-item-cloudplayer.model';
import {ArtistCloudplayerModel} from '../artist/artist-cloudplayer.model';

export class PlaylistCloudplayerModel extends CloudplayerModel implements IPlaylist {
  endpoint = '/playlist/cloudplayer';

  @attributesKey('provider')
  @defaultValue('cloudplayer')
  provider: string;

  @attributesKey('canEdit')
  @defaultValue(false)
  canEdit: boolean;

  @attributesKey('public')
  @defaultValue(false)
  isPublic: boolean;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('user')
  @nested()
  artist: ArtistCloudplayerModel;

  @attributesKey('image')
  @nested()
  image: ImageCloudplayerModel;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsCloudplayerCollection<PlaylistItemCloudplayerModel>;

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

