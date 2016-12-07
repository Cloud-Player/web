import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Session extends SoundcloudModel {
  idAttribute = 'access_token';

  defaults() {
    return {
      expires_in: null,
      refresh_token: null
    };
  }

  refresh(): string {
    return this.request('http://menu-flow.com','POST')
  }
}
