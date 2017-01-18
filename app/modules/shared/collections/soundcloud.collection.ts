import {Injectable} from '@angular/core';
import {Config} from '../../../config/config';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {SoundcloudModel} from '../models/soundcloud.model';
import {getSession} from '../session-manager.fn';

@Injectable()
export class SoundcloudCollection<TModel extends SoundcloudModel> extends BaseCollection<TModel> {
  clientId = Config.soundcloudClientId;

  model: any = SoundcloudModel;

  hostName(): string {
    return '//api.soundcloud.com';
  };

  sync(method: string, model: any, options: any = {}) {
    this.queryParams['client_id'] = this.clientId;
    let session = getSession();
    if (session && session.get('access_token') && session.isNotExpired()) {
      this.queryParams['oauth_token'] = session.get('access_token');
    }
    return super.sync(method, model, options);
  }

  parse(rsp: any) {
    return rsp.data || rsp;
  };
}


