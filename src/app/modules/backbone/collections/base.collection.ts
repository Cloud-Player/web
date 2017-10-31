import {BaseModel} from '../models/base.model';
import {getUrl} from '../utils/get_url.util';
import {extend} from 'underscore';
import {prepareSearchParams} from '../utils/prepare_search_params';
import {SelectableCollection} from './selectable.collection';
import {Injectable} from '@angular/core';

export class BaseCollection<TModel extends BaseModel> extends SelectableCollection<TModel> {
  model: any = BaseModel;

  queryParams: Object = {};

  endpoint: string = null;

  sortOrder: string = null;

  hostName(): string {
    return '';
  }

  basePath(): string {
    return '';
  }

  url = () => {
    return getUrl(this);
  }

  sync(method: string, model: any, options: any = {}) {
    let queryParams = this.queryParams;
    if (options.queryParams) {
      queryParams = extend({}, this.queryParams, options.queryParams);
    }
    options.search = prepareSearchParams(options.search, queryParams);
    return super.sync(method, model, options);
  }

  isAscSorted(attr?: string) {
    if (!attr || this.comparator === attr) {
      return this.sortOrder === 'ASC';
    } else {
      return false;
    }
  }

  isDescSorted(attr?: string) {
    if (!attr || this.comparator === attr) {
      return this.sortOrder === 'DESC';
    } else {
      return false;
    }
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

  toggleSort(attr: string) {
    if (this.comparator !== attr) {
      this.comparator = attr;
      this.sortAscending();
    } else {
      if (this.isAscSorted()) {
        this.sortDescending();
      } else {
        this.sortAscending();
      }
    }
  }

}


