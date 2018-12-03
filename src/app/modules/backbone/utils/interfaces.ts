import {Collection, Model} from 'backbone';

export interface IModelConstructor {
  new(...args): Model;
}

export interface ICollectionConstructor {
  new(...args): Collection<Model>;
}

export interface IModelOrCollectionConstructor {
  new(...args): Model | Collection<Model>;
}

export interface INestedDefinition {
  [key: string]: IModelOrCollectionConstructor;
}

export interface IDynamicInstanceDefinition {
  identifierKey: string;
  identifierKeyValueMap: {
    [key: string]: IModelOrCollectionConstructor;
    default?: IModelOrCollectionConstructor;
  };
}

export interface IDynamicInstances {
  [key: string]: IDynamicInstanceDefinition;
}
