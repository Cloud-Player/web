import {result} from 'underscore';
import {getAttributesMapKey} from '../utils/get-attributes-map-key';
import {IDynamicInstanceDefinition, IDynamicInstances} from '../utils/interfaces';

export function queryParam(): any {
  return function (target: any, propertyKey: any, value: any): void {
    const dynamicQueryParams: any = result(target, 'dynamicQueryParams') || {};
    Object.defineProperty(target, 'dynamicQueryParams', {
      get: function () {
        dynamicQueryParams[propertyKey] = value || propertyKey;
        return dynamicQueryParams;
      },
      set: function () {
      }
    });
  };
}
