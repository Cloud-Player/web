import {BaseModel} from '../models/base.model';
import {pairs} from 'underscore';

export function getAttributesMapKey(model: BaseModel, key: string) {
  let mappedKey = key;
  pairs(model.attributesMap).every(function (pair) {
    if (pair[1] === key) {
      mappedKey = pair[0];
      return false;
    } else {
      return true;
    }
  });
  return mappedKey;
}
