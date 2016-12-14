import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';

@Injectable()
export class User extends SoundcloudModel {
  endpoint = '/users';

  defaults() {
    return {
      name: ''
    };
  }
}
