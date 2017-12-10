import {Injectable} from '@angular/core';
import {Session} from '../../session/models/session.model';
import * as localforage from 'localforage';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {Globals} from '../../../../globals';

@Injectable()
export class AuthService {

  private session = Session.getInstance();
  private checkInterval: number;

  private receiveConnectMessage(event: any): void {
    const origin = event.origin || event.originalEvent.origin;
    if (origin !== Globals.soundcloudRedirectDomain) {
      return;
    }
    this.connectionSuccessFul(event.data);
  }

  getConnectionUrl(): string {
    return '//soundcloud.com/connect?' +
      'client_id=' + Globals.soundcloudClientId + '&' +
      'redirect_uri=' + Globals.soundcloudRedirectUrl + '&' +
      'response_type=code&' +
      'state=v2';
  }

  connect() {
    this.userAnalyticsService.trackEvent('sc_auth_start', 'click', 'auth-service');
    const popup = window.open(this.getConnectionUrl());
    this.checkInterval = window.setInterval(() => {
      popup.postMessage(null, Globals.soundcloudRedirectDomain);
    }, 100);
  }

  disconnect() {
    this.userAnalyticsService.trackEvent('sc_auth_disconnect', 'click', 'auth-service');
    this.session.clear();
    localforage.removeItem('sc_session');
  }

  connectionSuccessFul(params: any) {
    this.userAnalyticsService.trackEvent('sc_auth_success', 'click', 'auth-service');
    window.clearInterval(this.checkInterval);
    this.session.set({
      access_token: params.access_token,
      expires_on: params.expires_on,
      refresh_token: params.refresh_token
    });
  }

  constructor(private userAnalyticsService: UserAnalyticsService) {
    window.addEventListener('message', this.receiveConnectMessage.bind(this), false);
    window.addEventListener('connectionSuccessFul', (ev: CustomEvent) => {
      let creds = ev.detail;
      if (creds) {
        try {
          creds = JSON.parse(creds);
        } catch (err) {

        }
        this.connectionSuccessFul(creds);
      }
    });
  }

}
