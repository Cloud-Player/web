import {result} from 'underscore';

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
