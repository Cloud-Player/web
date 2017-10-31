import {URLSearchParams} from '@angular/http';
import {isObject, extend, pairs} from 'underscore';

function setSearchParams(searchParams: URLSearchParams, queryParams: {} = {}): URLSearchParams {
  pairs(queryParams).forEach((pair: any) => {
    const key = pair[0],
      value = pair[1];

    searchParams.set(key, value);
  });
  return searchParams;
}

export function prepareSearchParams(searchParams: any, queryParams: any) {
  if (!searchParams) {
    return setSearchParams(new URLSearchParams(), queryParams);
  } else if (searchParams instanceof URLSearchParams) {
    return setSearchParams(searchParams, queryParams);
  } else if (!(searchParams instanceof URLSearchParams) && isObject(searchParams)) {
    queryParams = extend({}, queryParams, searchParams);
    return setSearchParams(new URLSearchParams(), queryParams);
  } else {
    throw new Error('Search property of options has to be an object');
  }
}
