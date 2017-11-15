import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';

export class User extends SoundcloudModel {
  endpoint = '/users';

  @attributesKey('avatar_url')
  @nested()
  image: SoundcloudImageModel;

  @attributesKey('name')
  @defaultValue('')
  name: string;

  @attributesKey('username')
  @defaultValue('')
  username: string;

  @attributesKey('full_name')
  @defaultValue('')
  fullName: string;
}
