import {Injectable} from '@angular/core';
import {Config} from '../../../config/config';
import {BaseModel} from '../../backbone/models/base.model';

@Injectable()
export class SoundcloudModel extends BaseModel {
  clientId = Config.soundcloudClientId;

  hostName(): string {
    return '//api.soundcloud.com';
  };

  sync(method: string, model: any, options: any = {}) {
    this.queryParams['client_id'] = this.clientId;
    return super.sync(method, model, options);
  };

  parse(rsp: any) {
    return rsp.data || rsp;
  };
}
