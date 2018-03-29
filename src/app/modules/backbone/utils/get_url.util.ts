import {Collection, Model} from 'backbone';
import {result} from 'underscore';
import {concatUrlParts} from './concat_url_parts.util';

export function getUrl(instance: Model | Collection<Model>) {
  let hostName: string, basePath: string, endpoint: string;

  if (instance instanceof Model || instance instanceof Collection) {
    hostName = result(instance, 'hostName') || '';
    basePath = result(instance, 'basePath') || '';
    endpoint = result(instance, 'endpoint');
  } else {
    throw new Error('An instance of a collection or a model has to be passed as argument to the function');
  }

  if (!endpoint || endpoint.length === 0) {
    return null;
  } else {
    return concatUrlParts(hostName, basePath, endpoint);
  }
}
