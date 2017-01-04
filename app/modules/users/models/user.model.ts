import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';
import {SoundcloudImageModel} from '../../main/models/soundcloud-image.model';

@Injectable()
export class User extends SoundcloudModel {
  endpoint = '/users';

  defaults() {
    return {
      name: ''
    };
  }

  nested() {
    return {
      avatar_url: SoundcloudImageModel
    };
  }
}
