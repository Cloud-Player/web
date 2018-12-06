import {AuxappModel} from '../auxapp/auxapp.model';
import {IPlaylist} from './playlist.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {IPlaylistItem} from './playlist-item/playlist-item.interface';
import {PlaylistItemsAuxappCollection} from './playlist-item/playlist-items-auxapp.collection';
import {PlaylistItemAuxappModel} from './playlist-item/playlist-item-auxapp.model';
import {ArtistAuxappModel} from '../artist/artist-auxapp.model';

export class PlaylistAuxappModel extends AuxappModel implements IPlaylist {
  endpoint = '/playlist/auxapp';

  @attributesKey('provider')
  @defaultValue('auxapp')
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

  @attributesKey('description')
  description: string;

  @attributesKey('user')
  @nested()
  artist: ArtistAuxappModel;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('items')
  @nested()
  items: PlaylistItemsAuxappCollection<PlaylistItemAuxappModel>;

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

