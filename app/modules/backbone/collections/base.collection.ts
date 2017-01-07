import {Model, Collection} from 'backbone';
import {BaseModel} from '../models/base.model';
import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {getUrl} from '../utils/get_url.util';

@Injectable()
export class BaseCollection<TModel extends BaseModel> extends Collection<TModel> {
  model = BaseModel;

  queryParams: Object = {};

  endpoint: string = null;

  hostName(): string {
    return '';
  };

  basePath(): string {
    return '';
  };

  url(): string {
    return getUrl(this);
  };

  fetch(options: any = {}) {
    let queryParams = new URLSearchParams();
    Object.keys(this.queryParams).forEach((prop) => {
      queryParams.set(prop, this.queryParams[prop]);
    });
    options.search = queryParams;
    return super.fetch(options);
  };
}


