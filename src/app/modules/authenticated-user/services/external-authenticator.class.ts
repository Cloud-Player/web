import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {IAuthenticatedUserAccount} from '../../api/authenticated-user/account/authenticated-user-account.interface';
import {Injectable} from '@angular/core';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {Subject} from 'rxjs';

export enum ExternalUserConnectState {
  Start,
  Success,
  Abort,
  Error
}

@Injectable()
export class ExternalUserAuthenticator {
  private _authenticatedUser: AuthenticatedUserModel;
  private _subject: Subject<ExternalUserConnectState>;

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
    this._subject = new Subject<ExternalUserConnectState>();
  }

  public connect(account: IAuthenticatedUserAccount): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const popup = window.open(account.loginUrl);
      this.userAnalyticsService.trackEvent('connect', `start_${account.provider}`, 'ExternalUserAuthenticator');
      this._subject.next(ExternalUserConnectState.Start);
      const interval = window.setInterval(() => {
        if (!popup) {
          clearInterval(interval);
        } else if (popup.closed) {
          clearInterval(interval);
          this._authenticatedUser.fetch().then(() => {
            if (account.isConnected()) {
              this._subject.next(ExternalUserConnectState.Success);
              this.userAnalyticsService.trackEvent('connect', `success_${account.provider}`, 'ExternalUserAuthenticator');
              resolve();
            } else {
              this._subject.next(ExternalUserConnectState.Abort);
              this.userAnalyticsService.trackEvent('connect', `abort_${account.provider}`, 'ExternalUserAuthenticator');
              reject();
            }
          }, () => {
            this._subject.next(ExternalUserConnectState.Error);
            this.userAnalyticsService.trackEvent('connect', `error_${account.provider}`, 'ExternalUserAuthenticator');
            reject();
          });
        }
      }, 100);
    });
  }

  public getObservable(): Subject<ExternalUserConnectState> {
    return this._subject;
  }
}
