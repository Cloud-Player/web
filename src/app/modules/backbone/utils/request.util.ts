import {ajax, Collection, Model} from 'backbone';
import {extend, result} from 'underscore';
import {concatUrlParts} from './concat_url_parts.util';

export function request(url: string, method: string, options: any, instance: Model | Collection<Model> | null) {
  options = options || {};
  const requestOptions = {
    url: url,
    type: method
  };
  let hostName: string;


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
