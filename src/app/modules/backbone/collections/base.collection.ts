import {BaseModel} from '../models/base.model';
import {getUrl} from '../utils/get_url.util';
import {extend, isArray, result} from 'underscore';
import {prepareParams} from '../utils/prepare_params';
import {SelectableCollection} from './selectable.collection';
import {Model} from 'backbone';
import {IDynamicInstances, IModelConstructor} from '../utils/interfaces';
import {InstanceResolver} from '../utils/instance-resolver';
import {request} from '../utils/request.util';

export class BaseCollection<TModel extends BaseModel> extends SelectableCollection<TModel> {
  model: IModelConstructor = BaseModel;

  queryParams: {
    [key: string]: string | number | boolean
  } = {};

  endpoint: string = null;

  sortOrder: string = null;

  private prepareDynamicModel(item: TModel | {}): TModel | {} {
  private prepareDynamicModel(item: TModel | {}, options): TModel | {} {
    if (!(item instanceof this.model)) {
      const dynamicInstances = result(this, 'dynamicInstances');
      const instance = InstanceResolver.getDynamicInstance(dynamicInstances, 'model', item);

      if (instance instanceof Model) {
        if (options.parse) {
          item = instance.parse(item);
        }
        instance.set(item, options);
        item = instance;
      }
    }

    return item;
  }

  dynamicInstances(): IDynamicInstances {
    return {};
  }

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
    options.params = prepareParams(options.params, queryParams);
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

  request(url: string, method: string, options?: any) {
    return request(url, method, options, this);
  }

  add(item: TModel | TModel[] | {}, options: any = {}): any {
    if (isArray(item)) {
      const addedItems: Array<TModel | {}> = [];
      item.forEach((obj: any) => {
        addedItems.push(this.prepareDynamicModel(obj, options));
      });
      item = addedItems;
    } else {
      item = this.prepareDynamicModel(item, options);
    }

    item = super.add(item, options);
    return item;
  }

}


