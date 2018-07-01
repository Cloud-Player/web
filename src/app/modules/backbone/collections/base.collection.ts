import {BaseModel} from '../models/base.model';
import {getUrl} from '../utils/get_url.util';
import {extend, findKey, isArray, result} from 'underscore';
import {prepareParams} from '../utils/prepare_params';
import {SelectableCollection} from './selectable.collection';
import {Model, ModelSaveOptions} from 'backbone';
import {IDynamicInstances, IModelConstructor} from '../utils/interfaces';
import {InstanceResolver} from '../utils/instance-resolver';
import {request} from '../utils/request.util';

export class BaseCollection<TModel extends BaseModel> extends SelectableCollection<TModel> {
  model: IModelConstructor = BaseModel;

  queryParams: {
    [key: string]: string | number | boolean
  } = {};
  private dynamicQueryParams: {
    [key: string]: string
  } = {};

  endpoint: string = null;

  sortOrder: string = null;

  isSyncing = false;

  isFetched = false;

  models: Array<TModel>;

  constructor(...args) {
    super(...args);
    this.on('request', () => {
      this.isSyncing = true;
    });
    this.on('sync error destroy', () => {
      this.isSyncing = false;
    });
    this.on('sync error', () => {
      this.isFetched = true;
    });
  }

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
  };

  create(attributes: any, options: ModelSaveOptions = {}) {
    options.wait = true;
    return super.create.call(this, attributes, options);
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

  getMappedComparatorKey(orgComparator: string): string {
    const model = this.first();
    if (model && model.attributesMap) {
      const mappedComparator = findKey(<any>model.attributesMap, (value, key) => {
        return value === orgComparator;
      });
      if (mappedComparator) {
        return mappedComparator;
      } else {
        return orgComparator;
      }
    } else {
      return orgComparator;
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

  singletonFetch(...args): Promise<BaseCollection<TModel>> {
    if (this.isFetched) {
      return Promise.resolve(this);
    } else {
      return <any>this.fetch(...args);
    }
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


