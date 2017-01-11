import {Injectable} from '@angular/core';
import {Config} from '../../../config/config';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {SoundcloudModel} from '../models/soundcloud.model';

@Injectable()
export class SoundcloudCollection<TModel extends SoundcloudModel> extends BaseCollection<TModel> {
  clientId = Config.soundcloudClientId;

  model: any = SoundcloudModel;

  hostName(): string {
    return '//api.soundcloud.com';
  };

  sync(method: string, model: any, options: any = {}) {
    options.search.set('client_id', this.clientId);
    return super.sync(method, model, options);
  }

  parse(rsp: any) {
    return rsp.data || rsp;
  };
}


