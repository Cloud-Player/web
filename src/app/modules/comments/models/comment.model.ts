import {User} from '../../users/models/user.model';
import {SoundcloudModel} from '../../shared/models/soundcloud';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';

export class Comment extends SoundcloudModel {
  endpoint = '/comments';

  @attributesKey('user')
  @nested()
  user: User;

  @attributesKey('timestamp')
  timestamp: number;

  @attributesKey('body')
  body: string;
}
