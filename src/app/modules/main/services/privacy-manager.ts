import {Injectable} from '@angular/core';
import * as localforage from 'localforage';
import {ModalService} from '../../shared/services/modal';
import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {IPrivacySettings} from '../components/main/main.component';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {Subject} from 'rxjs';

export enum PrivacyManagerState {
  Changed,
  UnknownSettings
}

export interface IPrivacyManagerEvent {
  state: PrivacyManagerState;
  settings: IPrivacySettings;
}


@Injectable()
export class PrivacyManager {
  private _authenticatedUser: AuthenticatedUserModel;
  private _isFetched = false;
  private _privacySettings: IPrivacySettings = {
    allowTracking: true,
    allowIdCookie: true
  };
  private _subject: Subject<IPrivacyManagerEvent>;
  public isConfigured = false;

  constructor(private modalService: ModalService, private userAnalyticsService: UserAnalyticsService) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
    this._subject = new Subject<IPrivacyManagerEvent>();
  }

  private applySettings() {
    if (this._privacySettings.allowTracking) {
      this.userAnalyticsService.setActive(true);
    }
    this._subject.next({
      state: PrivacyManagerState.Changed,
      settings: this._privacySettings
    });
  }

  public getPrivacySettings(): Promise<IPrivacySettings> {
    return new Promise((resolve) => {
      if (!this._isFetched) {
        localforage.getItem('sc_privacy_config').then((settings: IPrivacySettings) => {
          if (settings) {
            this._privacySettings = settings;
            this.applySettings();
            this.isConfigured = true;
          } else {
            if (navigator.doNotTrack === '1') {
              this._privacySettings.allowTracking = false;
            }
            this._subject.next({
              state: PrivacyManagerState.UnknownSettings,
              settings: this._privacySettings
            });
          }
          this._isFetched = true;
          resolve(this._privacySettings);
        });
      } else {
        resolve(this._privacySettings);
      }
    });
  }

  public save() {
    this.applySettings();
    localforage.setItem('sc_privacy_config', this._privacySettings);
  }

  public getObservable(): Subject<any> {
    return this._subject;
  }
}
