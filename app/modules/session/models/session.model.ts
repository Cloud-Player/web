import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';
import {AuthenticatedUser} from './authenticated_user.model';

@Injectable()
export class Session extends SoundcloudModel {
  private static instance: Session;

  idAttribute = 'access_token';

  static getInstance(): SoundcloudModel {
    if (!Session.instance) {
      Session.instance = new Session();
    }
    return Session.instance;
  }

  defaults() {
    return {
      expires_in: null,
      refresh_token: null
    };
  };

  nested() {
    return {
      user: AuthenticatedUser
    };
  };

  refresh(): any {
    if (this.get('refresh_token')) {
      return this.request('//sc.menu-flow.com', 'POST', {
        data: {
          refresh_token: this.get('refresh_token')
        }
      });
    } else {
      return false;
    }
  }

  initialize() {
    this.on('change:access_token', () => {
      if (this.get('access_token')) {
        this.get('user').set('authenticated', true);
      } else {
        this.get('user').set('authenticated', false);
      }
    });
  }
}
