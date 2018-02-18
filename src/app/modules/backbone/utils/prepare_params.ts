import {extend, isNull, isObject, isUndefined, pairs} from 'underscore';
import {HttpParams} from '@angular/common/http';

function setParams(params: HttpParams, queryParams: {} = {}): HttpParams {
  pairs(queryParams).forEach((pair: any) => {
    const key = pair[0],
      value = pair[1];
    if (!isUndefined(value) && !isNull(value)) {
      params = params.set(key, value);
    }
  });

  return params;
}

export function prepareParams(params: any, queryParams: any) {
  if (!params) {
    return setParams(new HttpParams(), queryParams);
  } else if (params instanceof HttpParams) {
    return setParams(params, queryParams);
  } else if (!(params instanceof HttpParams) && isObject(params)) {
    queryParams = extend({}, queryParams, params);
    return setParams(new HttpParams(), queryParams);
  } else {
    throw new Error('Search property of options has to be an object');
  }
}
