import {NestedModel} from './nested.model';
import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {getUrl} from '../utils/get_url.util';
import {request} from '../utils/request.util';
import {isObject, pairs} from 'underscore';

@Injectable()
export class BaseModel extends NestedModel {
  queryParams: Object = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
    PATCH: {}
  };

  endpoint: string = null;

  urlRoot: Function = (): string => {
    return getUrl(this);
  };

  hostName(): string {
    return '';
  };

  basePath(): string {
    return '';
  };

  request(url: string, method: string, options?: any) {
    return request(url, method, options, this);
  }

  private setSearchParams(searchParams: URLSearchParams, obj: {} = {}, discardKeys: Array<string> = []): URLSearchParams {
    Object.keys(obj).forEach((key) => {
      if (discardKeys.indexOf(key) === -1) {
        searchParams.set(key, this.queryParams[key]);
      }
    });
    return searchParams;
  }

  sync(method: string, model: any, options: any = {}) {
    let searchParams: URLSearchParams;

    if (!(options.search instanceof URLSearchParams)) {
      searchParams = new URLSearchParams();
      if (isObject(options.search)) {
        pairs(options.search).forEach((pair: any) => {
          searchParams.set(pair[0], pair[1]);
        });
      } else if (options.search) {
        throw new Error('Search property of options has to be an object');
      }
    } else {
      searchParams = options.search;
    }

    searchParams = this.setSearchParams(searchParams, this.queryParams, ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);

    switch (method) {
      case 'read':
        searchParams = this.setSearchParams(searchParams, this.queryParams['GET']);
        break;
      case 'create':
        searchParams = this.setSearchParams(searchParams, this.queryParams['POST']);
        break;
      case 'update':
        searchParams = this.setSearchParams(searchParams, this.queryParams['PUT']);
        break;
      case 'delete':
        searchParams = this.setSearchParams(searchParams, this.queryParams['DELETE']);
        break;
      case 'patch':
        searchParams = this.setSearchParams(searchParams, this.queryParams['PATCH']);
        break;
    }

    options.search = searchParams;
    return super.sync(method, model, options);
  }
}
