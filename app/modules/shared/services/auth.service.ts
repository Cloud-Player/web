import {Injectable} from '@angular/core';
import {Session} from '../../session/models/session.model';
import Timer = NodeJS.Timer;
import localforage = require('localforage');
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';

@Injectable()
export class AuthService {

  private session = Session.getInstance();
  private checkInterval: Timer;

  private receiveConnectMessage(event: any): void {
    let origin = event.origin || event.originalEvent.origin;
    if (origin !== 'http://sc.menu-flow.com') {
      return;
    }
    this.connectionSuccessFul(event.data);
  }

  getConnectionUrl(): string {
    return '//soundcloud.com/connect?' +
      'client_id=abb6c1cad3f409112a5995bf922e1d1e&' +
      'redirect_uri=http://sc.menu-flow.com/connect&' +
      'response_type=code';
  }

  connect() {
    this.userAnalyticsService.trackEvent('sc_auth_start', 'click', 'auth-service');
    let popup = window.open(this.getConnectionUrl());
    this.checkInterval = setInterval(() => {
      popup.postMessage(null, 'http://sc.menu-flow.com');
    }, 100);
  }

  disconnect() {
    this.userAnalyticsService.trackEvent('sc_auth_disconnect', 'click', 'auth-service');
    this.session.clear();
    localforage.removeItem('sc_session');
  }

  connectionSuccessFul(params: any) {
    this.userAnalyticsService.trackEvent('sc_auth_success', 'click', 'auth-service');
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
