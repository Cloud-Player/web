import {Injectable} from '@angular/core';
import {Model} from 'backbone';
import {Config} from '../../../config/config';
import {BaseCollection} from '../../backbone/collections/base.collection';

@Injectable()
export class SoundcloudCollection<TModel extends Model> extends BaseCollection<Model> {
  clientId = Config.soundcloudClientId;

  hostName(): string{
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


