import {getUrl} from '../utils/get_url.util';
import {request} from '../utils/request.util';
import {extend} from 'underscore';
import {prepareParams} from '../utils/prepare_params';
import {SelectableModel} from './selectable.model';

export class BaseModel extends SelectableModel {
  attributesMap: Object;

  queryParams: {
    [key: string]: string | number | boolean
  } = {};
  private dynamicQueryParams: {
    [key: string]: string
  } = {};

  endpoint: string = null;

  urlRoot: Function = (): string => {
    return getUrl(this);
  };

  hostName(): string {
    return '';
  }

  basePath(): string {
    return '';
  }

  request(url: string, method: string, options?: any) {
    return request(url, method, options, this);
  }

  trigger(evType: string, value: string, model: BaseModel) {
    const changedAttr = evType.split(':')[1];
    if (changedAttr && this.attributesMap) {
      if (this.attributesMap[changedAttr] && this.attributesMap[changedAttr] !== changedAttr) {
        const mappedChangeEvent = `change:${this.attributesMap[changedAttr]}`;
        super.trigger.call(this, mappedChangeEvent, value, model);
      }
    }
    return super.trigger.apply(this, arguments);
  }

  sync(method: string, model: any, options: any = {}) {
    let queryParams = this.queryParams;
    if (options.queryParams) {
      queryParams = extend({}, this.queryParams, options.queryParams);
    }
    for (const key in this.dynamicQueryParams) {
      if (this.dynamicQueryParams.hasOwnProperty(key)) {
        queryParams[this.dynamicQueryParams[key]] = this[key];
      }
    }
    options.params = prepareParams(options.params, queryParams);
    return super.sync(method, model, options);
  }
}
