import {IArtist} from './artist.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {ImageSoundcloudModel} from '../image/image-soundcloud.model';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {SoundcloudProxyModel} from '../soundcloud/soundcloud-proxy.model';

export class ArtistSoundcloudModel extends SoundcloudProxyModel implements IArtist {

  endpoint = '/users';

  @attributesKey('provider')
  @defaultValue('soundcloud')
  provider: string;

  @attributesKey('avatar_url')
  @nested()
  image: ImageSoundcloudModel;

  @attributesKey('username')
  @defaultValue('')
  username: string;

  @attributesKey('full_name')
  @defaultValue('')
  fullName: string;

  getFullName(): string {
    return this.fullName || this.username;
  }

  getAccountId(): string {
    return this.id;
  }
}
