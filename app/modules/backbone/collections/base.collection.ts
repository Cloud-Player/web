import {Collection} from 'backbone';
import {BaseModel} from '../models/base.model';
import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {getUrl} from '../utils/get_url.util';
import {pairs, isObject} from 'underscore';

@Injectable()
export class BaseCollection<TModel extends BaseModel> extends Collection<TModel> {
  model: any = BaseModel;

  queryParams: Object = {};

  endpoint: string = null;

  sortOrder: string = null;

  private setSearchParams(searchParams: URLSearchParams, obj: {} = {}, discardKeys: Array<string> = []): URLSearchParams {
    Object.keys(obj).forEach((key) => {
      if (discardKeys.indexOf(key) === -1) {
        searchParams.set(key, this.queryParams[key]);
      }
    });
    return searchParams;
  }

  constructor() {
    super();
    this.on('sync', () => {
      this.sortOrder = null;
    });
  }

  hostName(): string {
    return '';
  };

  basePath(): string {
    return '';
  };

  url = () => {
    return getUrl(this);
  };

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

    searchParams = this.setSearchParams(searchParams, this.queryParams, ['GET', 'POST', 'PUT', 'DELETE']);

    options.search = searchParams;
    return super.sync(method, model, options);
  }

  sortAscending() {
    this.sort();
    this.sortOrder = 'ASC';
  }

  sortDescending() {
    if (this.sortOrder !== 'ASC') {
      this.sortAscending();
    }
    this.models = this.models.reverse();
    this.trigger('sort', this);
    this.sortOrder = 'DESC';
  }

}


