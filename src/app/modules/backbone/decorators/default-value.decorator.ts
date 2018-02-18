import {clone, result} from 'underscore';
import {getAttributesMapKey} from '../utils/get-attributes-map-key';

export function defaultValue(value: any): any {
  return function (target: any, propertyKey: string): void {
    const defaults = result(target, 'defaults') || {};

    Object.defineProperty(target, 'defaults', {
      get: function () {
        const mappedKey = getAttributesMapKey(this, propertyKey);
        defaults[mappedKey] = value;
        return clone(defaults);
      },
      set: function () {
      }
    });
  };
}
