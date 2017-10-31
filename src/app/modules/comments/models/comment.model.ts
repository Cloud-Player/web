import {User} from '../../users/models/user.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';

export class Comment extends SoundcloudModel {
  endpoint = '/comments';

  nested() {
    return {
      user: User
    };
  }
}
