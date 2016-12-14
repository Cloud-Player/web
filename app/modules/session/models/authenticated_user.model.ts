import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {extend} from 'underscore';

@Injectable()
export class AuthenticatedUser extends User {
  endpoint = '/me';

  defaults() {
    return extend(super.defaults(), {
      authenticated: false
    });
  }

  sync(method: string, model: AuthenticatedUser, options?: any) {
    if (this.get('authenticated')) {
      options.search.set('oauth_token', this.parent.get('access_token'));
    }
    return super.sync(method, model, options);
  }

}
