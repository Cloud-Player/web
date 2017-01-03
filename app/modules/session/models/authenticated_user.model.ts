import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {extend} from 'underscore';
import {authenticated} from '../decorators/authenticated.decorator';
import {AuthenticatedUserPlaylists} from '../collections/authenticated_user_playlists.collection';

@Injectable()
@authenticated
export class AuthenticatedUser extends User {
  endpoint = '/me';

  nested() {
    return {
      playlists: AuthenticatedUserPlaylists
    };
  }

  defaults() {
    return extend(super.defaults(), {
      authenticated: false
    });
  }

}
