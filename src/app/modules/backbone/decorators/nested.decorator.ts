import {result} from 'underscore';
import {getAttributesMapKey} from '../utils/get-attributes-map-key';

export function nested(): any {
  return function (target: any, propertyKey: string): void {
    const nestedAttrs = result(target, 'nested') || {};
    const t = Reflect.getMetadata('design:type', target, propertyKey);

    Object.defineProperty(target, 'nested', {
      get: function () {
        const mappedKey = getAttributesMapKey(this, propertyKey);
        nestedAttrs[mappedKey] = t;
        return nestedAttrs;
      },
      set: function () {
      }
    });
  };
}
