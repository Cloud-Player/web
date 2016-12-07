import {Model, Collection} from 'backbone';
import {isObject, isArray, extend, isString} from 'underscore';


export class NestedModel extends Model {

  nested() {
    return {};
  };

  private _prepare(): Object {
    let nestedAttributes = this.nested(),
      instanceObject = {};

    for (let key in nestedAttributes) {
      if (typeof nestedAttributes[key] === 'function') {
        let instance = new nestedAttributes[key]();

        instance.parent = this;
        instanceObject[key] = instance;
      } else {
        throw new Error('Nested attribute ' + key + ' is not a valid constructor. Do not set an instance as nested attribute.');
      }
    }

    return instanceObject;
  };

  private _setNestedModel(key: string, value: string| any): void {
    if (isObject(value)) {
      this.get(key).set(value);
    } else {
      let id = this.get(key).idAttribute;
      this.get(key).set(id, value);
    }
  };

  private _setNestedCollection(key: string, value: string|any): void {
    if (isObject(value) && !isArray(value)) {
      this.get(key).add(value);
    } else if (isArray(value)) {
      value.forEach(function (val: string|any) {
        this._setNestedCollection(key, val);
      }.bind(this));
    } else {
      let id = this.get(key).model.prototype.idAttribute,
        obj = {};

      obj[id] = value;
      this.get(key).add(obj);
    }
  };

  private _setNestedAttributes(obj: any): any {

    for (let key in obj) {
      let nestedAttrs = this.nested(),
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

    return obj;
  };

  private _nestedModelToJson(model: Model): any {
    let result: any;

    if (model instanceof NestedModel) {
      result = model._prepareDataForServer();
    } else {
      result = model.toJSON();
    }

    return result;
  };

  private _prepareDataForServer() {
    let attrs = extend({}, this.attributes),
      nestedAttrs = this.nested();

    for (let key in nestedAttrs) {
      let nestedAttr = this.get(key);

      if (nestedAttr instanceof Model) {
        attrs[key] = this._nestedModelToJson(nestedAttr);
      } else if (nestedAttr instanceof Collection) {
        let result: Array<any> = [];

        nestedAttr.each(function (model: Model) {
          result.push(this._nestedModelToJson(model));
        }.bind(this));

        attrs[key] = result;
      }
    }

    return this.compose(attrs);
  };

  constructor(attributes: Object|null, options: any) {
    options = options || {};
    if (options.parse) {
      attributes = this.parse(attributes);
      options.parse = false;
    }
    this.attributes = this._prepare();
    this.set(attributes);
    attributes = this.attributes;
    super(attributes, options);
  };

  set(attributes: any, options: any) {
    var obj = {};

    if (isString(attributes)) {
      obj[attributes] = options;
    } else if (isObject(attributes)) {
      obj = attributes;
    }

    if (!isObject(options)) {
      options = null;
    }

    obj = this._setNestedAttributes(obj);

    return super.set.call(this, obj, options);
  };

  compose(attrs: any): any {
    return attrs;
  };

  toJSON(options: any): any {
    // When options are set toJSON is called from the sync method so it is called before the object is send to the server
    // We use this to transform our data before we are sending it to the server
    // It is the counterpart of parse for the server
    if (options) {
      return this._prepareDataForServer();
    } else {
      return super.toJSON.apply(this, arguments);
    }
  };

  clear(options: any): any {
    let attrs = {};

    for (let key in this.attributes) {
      if (this.get(key) instanceof Model) {
        this.get(key).clear();
      } else if (this.get(key) instanceof Collection) {
        this.get(key).reset();
      } else {
        attrs[key] = void 0;
      }
    }

    return super.set(attrs, extend({}, options, {unset: true}));
  };
}
