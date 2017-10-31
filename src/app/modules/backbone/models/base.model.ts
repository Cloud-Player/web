import {NestedModel} from './nested.model';
import {Injectable} from '@angular/core';
import {getUrl} from '../utils/get_url.util';
import {request} from '../utils/request.util';
import {extend} from 'underscore';
import {prepareSearchParams} from '../utils/prepare_search_params';
import {SelectableModel} from './selectable.model';
import {serverKey} from '../decorators/server-key.decorator';

export class BaseModel extends SelectableModel {

  queryParams: Object = {};

  endpoint: string = null;

  urlRoot: Function = (): string => {
    return getUrl(this);
  }

  hostName(): string {
    return '';
  }

  basePath(): string {
    return '';
  }

  request(url: string, method: string, options?: any) {
    return request(url, method, options, this);
  }

  sync(method: string, model: any, options: any = {}) {
    let queryParams = this.queryParams;
    if (options.queryParams) {
      queryParams = extend({}, this.queryParams, options.queryParams);
    }
    options.search = prepareSearchParams(options.search, queryParams);
    return super.sync(method, model, options);
  }
}
