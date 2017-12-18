import {SoundcloudModel} from '../../shared/models/soundcloud';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {ImageSoundcloudModel} from '../../shared/models/image-soundcloud';

export class User extends SoundcloudModel {
  endpoint = '/users';

  @attributesKey('avatar_url')
  @nested()
  image: ImageSoundcloudModel;

  @attributesKey('name')
  @defaultValue('')
  name: string;

  @attributesKey('username')
  @defaultValue('')
  username: string;

  @attributesKey('full_name')
  @defaultValue('')
  fullName: string;

  getFullName(): string {
    return this.fullName || this.username;
  }
}
