import {NestedModel} from './nested.model';
import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {getUrl} from '../utils/get_url.util';

@Injectable()
export class BaseModel extends NestedModel {
  queryParams: Object = {};

  endpoint: string = null;

  hostName(): string {
    return '';
  };

  basePath(): string {
    return '';
  };

  urlRoot(): string {
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
