import {BaseCollection} from '../../backbone/collections/base.collection';
import {request} from '../../backbone/utils/request.util';
import {CloudplayerModel} from './cloud-player.model';

export class CloudplayerCollection<TModel extends CloudplayerModel> extends BaseCollection<TModel> {

  model: any = CloudplayerModel;

  hostName(): string {
    return 'https://api.cloud-player.io';
  }

  request(url: string, method: string, options: any = {}) {
    options.withCredentials = true;
    return request(url, method, options, this);
  }

  sync(method: string, model: any, options: any = {}) {
    options.withCredentials = true;
    return super.sync.call(this, method, model, options);
  }
}


