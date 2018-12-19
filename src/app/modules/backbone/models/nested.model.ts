import {Collection, Model} from 'backbone';
import {extend, isArray, isObject, isString, result} from 'underscore';
import {IDynamicInstances, INestedDefinition} from '../utils/interfaces';
import {InstanceResolver} from '../utils/instance-resolver';

export class NestedModel extends Model {
  nested(): INestedDefinition {
    return {};
  }

  dynamicInstances(): IDynamicInstances {
    return {};
  }

  constructor(attributes?: any, options: any = {}) {
    options._prepareNesting = true;
    super(attributes, options);
  }

  private _prepare(attributes: {} = {}): Object {
    const nestedAttributes = result(this, 'nested'),
      instanceObject = {};

    if (attributes instanceof Model || attributes instanceof Collection) {
      return this.attributes;
    }

    for (const key in nestedAttributes) {
      if (nestedAttributes.hasOwnProperty(key) && !instanceObject[key]) {
        const instance = InstanceResolver.getInstance(nestedAttributes[key]);

        if (instance) {
          instanceObject[key] = instance;
        } else {
          throw new Error('Nested attribute ' + key + ' is not a valid constructor. Do not set an instance as nested attribute.');
        }
      }
    }

    return instanceObject;
  }

  private _setDynamicInstance(attributes: {} = {}) {
    const dynamicInstances = result(this, 'dynamicInstances');
    for (const key in dynamicInstances) {
      if (dynamicInstances.hasOwnProperty(key)) {
        if (!(this.attributes[key] instanceof Model || this.attributes[key] instanceof Collection)) {
          const instance =
            InstanceResolver.getDynamicInstance(dynamicInstances, key, attributes);
          if (instance) {
            this.attributes[key] = instance;
          }
        }
      }
    }

    return attributes;
  }

  private _setNestedModel(key: string, value: string | any, options: any = {}): void {
    if (isObject(value)) {
      if (options.parse) {
        value = this.get(key).parse(value);
      }
      this.get(key).set(value);
    } else {
      const id = this.get(key).idAttribute;
      this.get(key).set(id, value);
    }
  }

  private _setNestedCollection(key: string, value: string | any, options: any = {}): void {
    if (isObject(value) && !isArray(value)) {
      this.get(key).add(value, options);
    } else if (isArray(value)) {
      value.forEach((val: string | any) => {
        this._setNestedCollection(key, val, options);
      });
    } else {
      const id = this.get(key).model.prototype.idAttribute,
        obj = {};

      obj[id] = value;
      this.get(key).add(obj);
    }
  }

  private _setNestedAttributes(obj: any, options = {}): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const nestedAttrs = result(this, 'nested'),
          dynamicInstances = result(this, 'dynamicInstances'),
          value = obj[key],
          nestedValue = nestedAttrs[key],
          dynamicInstanceValue = dynamicInstances[key];

        if (
          (nestedValue || dynamicInstanceValue) &&
          !(value instanceof Model || value instanceof Collection) &&
          this.get(key)
        ) {

          if (this.get(key) instanceof Model) {
            this._setNestedModel(key, value, options);
          } else if (this.get(key) instanceof Collection) {
            this._setNestedCollection(key, value, options);
          }

          delete obj[key];
        }
      }
    }

    return obj;
  }

  private _nestedModelToJson(model: Model): any {
    let json: any;

    if (model instanceof NestedModel) {
      json = model._prepareDataForServer();
    } else {
      json = super.toJSON.apply(model, arguments);
    }

    return json;
  }

  private _prepareDataForServer() {
    const attrs = extend({}, this.attributes),
      nestedAttrs = result(this, 'nested');

    for (const key in nestedAttrs) {
      if (nestedAttrs.hasOwnProperty(key)) {
        const nestedAttr = this.get(key);

        if (nestedAttr instanceof Model) {
          attrs[key] = this._nestedModelToJson(nestedAttr);
        } else if (nestedAttr instanceof Collection) {
          const jsonArr: Array<any> = [];
          nestedAttr.each(function (model: Model) {
            jsonArr.push(this._nestedModelToJson(model));
          }.bind(this));

          attrs[key] = jsonArr;
        }
      }
    }

    return this.compose(attrs);
  }

  set(key: any, value?: any, options: any = {}) {
    let _options;
    let obj = {};

    if (isString(key)) {
      obj[key] = value;
      _options = options;
    } else {
      obj = key;
      _options = value || options;
    }

    if (_options && _options._prepareNesting) {
      extend(this.attributes, this._prepare(obj));
    }

    this._setDynamicInstance(obj);

    obj = this._setNestedAttributes(obj, _options);

    return super.set.call(this, obj, _options);
  }

  compose(attrs: any): any {
    return attrs;
  }

  toJSON(): any {
    return this._prepareDataForServer();
  }

  clear(options?: any): any {
    const attrs = {};

    for (const key in this.attributes) {
      if (this.get(key) instanceof Model) {
        this.get(key).clear();
      } else if (this.get(key) instanceof Collection) {
        this.get(key).reset();
      } else {
        attrs[key] = void 0;
      }
    }

    return super.set(attrs, extend({}, options, {unset: true}));
  }
}
