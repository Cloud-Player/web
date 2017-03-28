import {Injectable} from '@angular/core';
import {AuthenticatedUser} from './authenticated_user.model';
import Timer = NodeJS.Timer;
import {setSession} from '../../shared/session-manager.fn';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import localforage = require('localforage');

@Injectable()
export class Session extends SoundcloudModel {
  private static instance: Session;

  private refreshTimer: Timer;

  idAttribute = 'access_token';

  static getInstance(): Session {
    if (!Session.instance) {
      Session.instance = new Session();
    }
    return Session.instance;
  }

  defaults(): Object {
    return {
      expires_on: null,
      refresh_token: null
    };
  };

  nested() {
    return {
      user: AuthenticatedUser
    };
  };

  parse(attrs: any = {}) {
    if (attrs.expires_on) {
      attrs.expires_on = parseInt(attrs.expires_on, 10);
    }
    return attrs;
  }

  compose(attrs: any = {}) {
    delete attrs.user;
    return attrs;
  };

  saveLocal(options?: any): void {
    localforage.setItem('sc_session', this.toJSON({}));
  };

  fetchLocal(options?: any): Session {
    localforage.getItem('sc_session').then((session: any)=>{
      if(session){
        this.set(session);
      }
    });
    return this;
  };

  refresh(): any {
    if (this.get('refresh_token')) {
      return this.request('//sc.menu-flow.com/connect/', 'PUT', {
        data: {
          refresh_token: this.get('refresh_token')
        }
      }).then((rsp) => {
        let data = rsp.json();
        this.set(data);
        return this;
      });
    } else {
      return false;
    }
  };

  getExpiresIn(): number {
    return this.get('expires_on') - (+new Date());
  };

  isNotExpired(): boolean {
    return this.getExpiresIn() > 0;
  };

  initialize() {
    this.on('change:access_token', () => {
      if (this.get('access_token')) {
        if (this.isNotExpired()) {
          this.get('user').set('authenticated', true);
        } else {
          this.refresh();
        }
      } else {
        this.get('user').set('authenticated', false);
      }
      this.saveLocal();
    });

    this.on('change:expires_on', () => {
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer);
      }
      this.refreshTimer = setTimeout(() => {
        this.refresh();
      }, this.getExpiresIn() - 1000);
    });

    this.fetchLocal();
  };

  isValid(): boolean {
    return this.get('access_token') && this.isNotExpired();
  }
}

setSession(Session.getInstance());
