import {result} from 'underscore';
import {getAttributesMapKey} from '../utils/get-attributes-map-key';
import {IDynamicInstanceDefinition, IDynamicInstances} from '../utils/interfaces';

export function dynamicInstance(definition: IDynamicInstanceDefinition): any {
  return function (target: any, propertyKey): void {
    const dynamicInstances: IDynamicInstances = result(target, 'dynamicInstances') || {};

    Object.defineProperty(target, 'dynamicInstances', {
      get: function () {
        const mappedKey = getAttributesMapKey(this, propertyKey);
        dynamicInstances[mappedKey] = definition;
        return dynamicInstances;
      },
      set: function () {
      }
    });
  };
}
