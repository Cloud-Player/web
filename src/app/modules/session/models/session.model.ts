import {Injectable} from '@angular/core';
import {AuthenticatedUser} from './authenticated_user.model';
import {setSession} from '../../shared/session-manager.fn';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import * as localforage from 'localforage';
import {Globals} from '../../../../globals';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';

export class Session extends SoundcloudModel {
  private static instance: Session;

  private refreshTimer: number;

  idAttribute = 'access_token';

  @attributesKey('user')
  @nested()
  user: AuthenticatedUser;

  @attributesKey('refresh_token')
  refreshToken: string;

  @attributesKey('access_token')
  accessToken: string;

  @attributesKey('expires_on')
  expiresOn: number;

  static getInstance(): Session {
    if (!Session.instance) {
      Session.instance = new Session();
    }
    return Session.instance;
  }

  parse(attrs: any = {}) {
    if (attrs.expires_on) {
      attrs.expires_on = parseInt(attrs.expires_on, 10);
    }
    return attrs;
  }

  compose(attrs: any = {}) {
    delete attrs.user;
    return attrs;
  }

  saveLocal(options?: any): void {
    localforage.setItem('sc_session', this.toJSON());
  }

  fetchLocal(options?: any): Session {
    localforage.getItem('sc_session').then((session: any) => {
      if (session) {
        this.set(session);
      }
    });
    return this;
  }

  refresh(): any {
    if (this.refreshToken) {
      return this.request(Globals.soundcloudRedirectUrl + '/', 'PUT', {
        data: {
          refresh_token: this.refreshToken,
          version: 2
        }
      }).then((rsp) => {
        const data = rsp.json();
        this.set(data);
        return this;
      });
    } else {
      return false;
    }
  }

  getExpiresIn(): number {
    return this.expiresOn - (+new Date());
  }

  isNotExpired(): boolean {
    return this.getExpiresIn() > 0;
  }

  initialize() {
    this.on('change:accessToken', () => {
      if (this.accessToken) {
        if (this.isNotExpired()) {
          this.user.authenticated = true;
        } else {
          this.refresh();
        }
      } else {
        this.user.authenticated = false;
      }
      this.saveLocal();
    });

    this.on('change:expiresOn', () => {
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer);
      }
      this.refreshTimer = window.setTimeout(() => {
        this.refresh();
      }, this.getExpiresIn() - 1000);
    });

    this.fetchLocal();
  }

  isValid(): boolean {
    return this.accessToken && this.isNotExpired();
  }
}

setSession(Session.getInstance());
