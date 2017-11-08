import {isUndefined} from 'underscore';

export function attributesKey(name: string): any {
  return function (target: any, propertyKey: string): void {
    const attributesMap = target.attributesMap || {};

    if (isUndefined(attributesMap[name])) {
      attributesMap[name] = propertyKey;
    } else if (attributesMap[name] !== propertyKey) {
      throw new Error(`[@attributesKey] The property ${propertyKey} is invalid because the attribute '${name}' is` +
        `already mapped on the property ${attributesMap[name]}`);
    }

    Object.defineProperty(target, 'attributesMap', {
      get: function () {
        return attributesMap;
      }
    });

    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this.get(name);
      },
      set: function (value) {
        this.set(name, value);
      }
    });
  };
}
