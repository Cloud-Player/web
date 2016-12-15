import {Model} from 'backbone';
import {Session} from '../models/session.model';

function authenticatedSync(method: string, model: Model, options?: any) {
  let session = Session.getInstance();
  if (session.get('access_token') && session.isNotExpired()) {
    options.search.set('oauth_token', session.get('access_token'));
    return this.superSync(method, model, options);
  } else {
    throw new Error('User is not authenticated!');
  }
}

export function authenticated(constructor: Function) {
  constructor.prototype.superSync = constructor.prototype.sync;
  constructor.prototype.sync = authenticatedSync;
}
