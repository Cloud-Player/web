import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {CloudplayerModel} from '../cloud-player/cloud-player.model';
import {ImageCloudplayerModel} from '../image/image-cloudplayer.model';
import {IArtist} from './artist.interface';

export class ArtistCloudplayerModel extends CloudplayerModel implements IArtist {

  endpoint = '/account';

  @attributesKey('provider_id')
  @defaultValue('cloudplayer')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageCloudplayerModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  getFullName(): string {
    return this.title;
  }

  getAccountId(): string {
    return this.id;
  }
}
