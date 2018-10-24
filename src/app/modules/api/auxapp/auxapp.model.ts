import {BaseModel} from '../../backbone/models/base.model';
import {request} from '../../backbone/utils/request.util';
import {ModelSaveOptions} from 'backbone';
import {isUndefined} from 'underscore';
import {Globals} from '../../../../globals';

export class AuxappModel extends BaseModel {

  hostName(): string {
    return Globals.httpApiUrl;
  }

  request(url: string, method: string, options: any = {}) {
    options.withCredentials = true;
    return request(url, method, options, this);
  }

  sync(method: string, model: any, options: any = {}) {
    options.withCredentials = true;
    return super.sync.call(this, method, model, options);
  }

  parse(rsp: any) {
    return rsp.data || rsp;
  }

  save(attributes?: any, options: ModelSaveOptions = {}): any {
    options.patch = isUndefined(options.patch) ? true : options.patch;
    return super.save.call(this, attributes, options);
  }
}
