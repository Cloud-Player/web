import {IDynamicInstanceDefinition, IDynamicInstances, IModelOrCollectionConstructor} from './interfaces';
import {isObject} from 'underscore';
import {Collection, Model} from 'backbone';

export class InstanceResolver {
  private static isModelOrCollectionConstructor(type: IModelOrCollectionConstructor): boolean {
    if (type) {
      return type.prototype instanceof Model || type.prototype instanceof Collection;
    } else {
      return false;
    }
  }

  private static getDynamicConstructorForIdentifierKeyValue(dynamicInstanceDefinition: IDynamicInstanceDefinition,
                                                            key: string | number): IModelOrCollectionConstructor {
    return dynamicInstanceDefinition.identifierKeyValueMap[key];
  }

  public static getDynamicConstructor(dynamicInstances: IDynamicInstances,
                                      key: string | number,
                                      attributes: Object = {}): IModelOrCollectionConstructor {

    const dynamicInstanceDefinition = dynamicInstances[key];

    if (isObject(dynamicInstanceDefinition) && !dynamicInstanceDefinition.identifierKey) {
      throw new Error('IdentifierKey is missing on dynamicInstance definition!');
    } else if (isObject(dynamicInstanceDefinition)) {
      let identifierValue;

      if (attributes[dynamicInstanceDefinition.identifierKey]) {
        identifierValue = attributes[dynamicInstanceDefinition.identifierKey];
      } else if (isObject(attributes[key])) {
        identifierValue = attributes[key][dynamicInstanceDefinition.identifierKey];
        if (!identifierValue && dynamicInstanceDefinition.identifierKeyValueMap.default) {
          identifierValue = 'default';
        }
      } else if (!identifierValue && !attributes[key] && dynamicInstanceDefinition.identifierKeyValueMap.default) {
        identifierValue = 'default';
      }

      if (identifierValue) {
        let availableConstructor = this.getDynamicConstructorForIdentifierKeyValue(
          dynamicInstanceDefinition,
          identifierValue
        );
        if (!availableConstructor && dynamicInstanceDefinition.identifierKeyValueMap.default) {
          availableConstructor = this.getDynamicConstructorForIdentifierKeyValue(
            dynamicInstanceDefinition,
            'default'
          );
        }
        return availableConstructor;
      }
    }

    return null;
  }

  public static getDynamicInstance(dynamicInstances: IDynamicInstances,
                                   key: string | number,
                                   attributes: Object = {}): Collection<Model> | Model {

    const availableDynamicConstructor = this.getDynamicConstructor(dynamicInstances, key, attributes);

    if (availableDynamicConstructor) {
      return new availableDynamicConstructor();
    } else {
      return null;
    }
  }

  public static getInstance(type: IModelOrCollectionConstructor): Collection<Model> | Model {
    if (this.isModelOrCollectionConstructor(type)) {
      return new type();
    } else {
      return null;
    }
  }
}
