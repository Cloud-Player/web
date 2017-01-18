import {Injectable} from '@angular/core';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';

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
