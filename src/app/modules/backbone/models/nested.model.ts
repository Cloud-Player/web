import {Model, Collection} from 'backbone';
import {result, isObject, isArray, extend, isString} from 'underscore';


export class NestedModel extends Model {

  nested() {
    return {};
  }

  constructor(attributes?: any, options: any = {}) {
    options._prepareNesting = true;
    super(attributes, options);
  }

  private _prepare(): Object {
    const nestedAttributes = result(this, 'nested'),
      instanceObject = {};

    for (const key in nestedAttributes) {
      if (typeof nestedAttributes[key] === 'function') {
        const instance = new nestedAttributes[key]();
        instance.parent = this;
        instanceObject[key] = instance;
      } else {
        throw new Error('Nested attribute ' + key + ' is not a valid constructor. Do not set an instance as nested attribute.');
      }
    }

    return instanceObject;
  }

  private _setNestedModel(key: string, value: string | any): void {
    if (isObject(value)) {
      this.get(key).set(value);
    } else {
      const id = this.get(key).idAttribute;
      this.get(key).set(id, value);
    }
  }

  private _setNestedCollection(key: string, value: string | any): void {
    if (isObject(value) && !isArray(value)) {
      this.get(key).add(value);
    } else if (isArray(value)) {
      value.forEach(function (val: string | any) {
        this._setNestedCollection(key, val);
      }.bind(this));
    } else {
      const id = this.get(key).model.prototype.idAttribute,
        obj = {};

      obj[id] = value;
      this.get(key).add(obj);
    }
  }

  private _setNestedAttributes(obj: any): any {

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const nestedAttrs = result(this, 'nested'),
          value = obj[key],
          nestedValue = nestedAttrs[key];

        if (nestedValue && !(value instanceof nestedValue) && this.get(key)) {

          if (this.get(key) instanceof Model) {
            this._setNestedModel(key, value);
          } else if (this.get(key) instanceof Collection) {
            this._setNestedCollection(key, value);
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
          const result: Array<any> = [];

          nestedAttr.each(function (model: Model) {
            result.push(this._nestedModelToJson(model));
          }.bind(this));

          attrs[key] = result;
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
      extend(this.attributes, this._prepare());
    }

    obj = this._setNestedAttributes(obj);

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
