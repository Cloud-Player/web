import {Model, Collection, ajax} from 'backbone';
import {extend, result} from 'underscore';
import {concatUrlParts} from './concat_url_parts.util';

export function request(url: string, method: string, options: any, instance: Model|Collection<Model>|null) {
  options = options || {};
  let requestOptions = {
    url: url,
    type: method
  }, hostName: string;


  if (url && !url.match(/\/\//)) {
    if (instance instanceof Model || instance instanceof Collection) {
      hostName = result(instance, 'hostName');
    } else {
      hostName = '';
    }
    requestOptions.url = concatUrlParts(hostName, url);
  }

  return ajax(extend(requestOptions, options));
}
