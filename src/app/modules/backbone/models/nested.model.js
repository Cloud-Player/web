"use strict";
const backbone_1 = require('backbone');
const underscore_1 = require('underscore');
class NestedModel extends backbone_1.Model {
    constructor(attributes, options = {}) {
        options._prepareNesting = true;
        super(attributes, options);
    }
    nested() {
        return {};
    }
    ;
    _prepare() {
        let nestedAttributes = this.nested(), instanceObject = {};
        for (let key in nestedAttributes) {
            if (typeof nestedAttributes[key] === 'function') {
                let instance = new nestedAttributes[key]();
                instance.parent = this;
                instanceObject[key] = instance;
            }
            else {
                throw new Error('Nested attribute ' + key + ' is not a valid constructor. Do not set an instance as nested attribute.');
            }
        }
        return instanceObject;
    }
    ;
    _setNestedModel(key, value) {
        if (underscore_1.isObject(value)) {
            this.get(key).set(value);
        }
        else {
            let id = this.get(key).idAttribute;
            this.get(key).set(id, value);
        }
    }
    ;
    _setNestedCollection(key, value) {
        if (underscore_1.isObject(value) && !underscore_1.isArray(value)) {
            this.get(key).add(value);
        }
        else if (underscore_1.isArray(value)) {
            value.forEach(function (val) {
                this._setNestedCollection(key, val);
            }.bind(this));
        }
        else {
            let id = this.get(key).model.prototype.idAttribute, obj = {};
            obj[id] = value;
            this.get(key).add(obj);
        }
    }
    ;
    _setNestedAttributes(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let nestedAttrs = this.nested(), value = obj[key], nestedValue = nestedAttrs[key];
                if (nestedValue && !(value instanceof nestedValue) && this.get(key)) {
                    if (this.get(key) instanceof backbone_1.Model) {
                        this._setNestedModel(key, value);
                    }
                    else if (this.get(key) instanceof backbone_1.Collection) {
                        this._setNestedCollection(key, value);
                    }
                    delete obj[key];
                }
            }
        }
        return obj;
    }
    ;
    _nestedModelToJson(model) {
        let result;
        if (model instanceof NestedModel) {
            result = model._prepareDataForServer();
        }
        else {
            result = model.toJSON();
        }
        return result;
    }
    ;
    _prepareDataForServer() {
        let attrs = underscore_1.extend({}, this.attributes), nestedAttrs = this.nested();
        for (let key in nestedAttrs) {
            if (nestedAttrs.hasOwnProperty(key)) {
                let nestedAttr = this.get(key);
                if (nestedAttr instanceof backbone_1.Model) {
                    attrs[key] = this._nestedModelToJson(nestedAttr);
                }
                else if (nestedAttr instanceof backbone_1.Collection) {
                    let result = [];
                    nestedAttr.each(function (model) {
                        result.push(this._nestedModelToJson(model));
                    }.bind(this));
                    attrs[key] = result;
                }
            }
        }
        return this.compose(attrs);
    }
    ;
    set(attributes, options = {}) {
        let obj = {};
        if (options && options._prepareNesting) {
            underscore_1.extend(this.attributes, this._prepare());
        }
        if (underscore_1.isString(attributes)) {
            obj[attributes] = options;
        }
        else if (underscore_1.isObject(attributes)) {
            obj = attributes;
        }
        if (!underscore_1.isObject(options)) {
            options = null;
        }
        obj = this._setNestedAttributes(obj);
        return super.set.call(this, obj, options);
    }
    ;
    compose(attrs) {
        return attrs;
    }
    ;
    toJSON(options) {
        // When options are set toJSON is called from the sync method so it is called before the object is send to the server
        // We use this to transform our data before we are sending it to the server
        // It is the counterpart of parse for the server
        if (options) {
            return this._prepareDataForServer();
        }
        else {
            return super.toJSON.apply(this, arguments);
        }
    }
    ;
    clear(options) {
        let attrs = {};
        for (let key in this.attributes) {
            if (this.get(key) instanceof backbone_1.Model) {
                this.get(key).clear();
            }
            else if (this.get(key) instanceof backbone_1.Collection) {
                this.get(key).reset();
            }
            else {
                attrs[key] = void 0;
            }
        }
        return super.set(attrs, underscore_1.extend({}, options, { unset: true }));
    }
    ;
}
exports.NestedModel = NestedModel;
//# sourceMappingURL=nested.model.js.map