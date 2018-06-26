import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ToastService} from '../../../shared/services/toast';
import {ToastModel} from '../../../shared/models/toast';
import {ToastTypes} from '../../../shared/src/toast-types.enum';
import {NativeAppHandlerService} from '../../../native-app/services/native-app-handler';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AuthenticatedUserAccountCloudplayerModel} from '../../../api/authenticated-user/account/authenticated-user-account-cloudplayer.model';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import * as localforage from 'localforage';
import {ModalService} from '../../../shared/services/modal';
import {Modal, ModalStates} from '../../../shared/src/modal-factory.class';
import {PrivacyConfigComponent, PrivacyConfigModalOpener} from '../privacy-config/privacy-config';
import {filter} from 'rxjs/internal/operators';
import {PrivacyManager} from '../../services/privacy-manager';

export interface IPrivacySettings {
  allowTracking: boolean;
  allowIdCookie: boolean;
}

@Component({
  selector: 'app-cloud-player',
  templateUrl: './main.template.html',
  styleUrls: ['./main.style.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  private _authenticatedUser: AuthenticatedUserModel;
  private _privacyConfigModal: Modal<PrivacyConfigComponent>;

  constructor(private privacyManager: PrivacyManager,
              private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService,
              private toastService: ToastService,
              private privacyConfigModalOpener: PrivacyConfigModalOpener) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
  }

  private onNewVersionAvailable() {
    const toast = new ToastModel();
    toast.title = 'Cloud-Player has been updated';
    toast.message = 'Restart Cloud-Player to get the latest version';
    toast.type = ToastTypes.Primary;
    toast.icon = 'fa fa-rocket';
    toast.buttonAction = () => {
      this.userAnalyticsService.trackEvent('restart_app', 'new_version', 'app-cloud-player');
      location.reload(true);
    };
    toast.buttonLabel = 'Restart Cloud-Player';

    this.toastService.addToast(toast);
  }

  ngOnInit(): void {
    // Handle native client started event that is triggered by the native Cloud-Player app
    window.addEventListener('startNativeClient', (event: CustomEvent) => {
      const clientDetails: { version: number, platform: string } = event.detail;
      document.querySelector('body').classList.add('native', 'desktop', clientDetails.platform);
      this.nativeAppHandlerService.init({
        version: event.detail.version,
        platform: event.detail.platform
      });

    });

    // Handle service worker update
    window.addEventListener('newAppVersionAvailable', this.onNewVersionAvailable.bind(this));

    const cloudPlayerAccount: AuthenticatedUserAccountCloudplayerModel =
      <AuthenticatedUserAccountCloudplayerModel>this._authenticatedUser.accounts.getAccountForProvider('cloudplayer');

    if (cloudPlayerAccount) {
      cloudPlayerAccount.once('change:id', () => {
        cloudPlayerAccount.favouriteTracks.fetch();
        cloudPlayerAccount.createSession({
          browser: `${ClientDetector.getClient().name}`,
          os: `${ClientDetector.getOs().name}:${ClientDetector.getOs().version}`,
          screenSize: '100'
        });
      });
    }

    this.privacyManager.getPrivacySettings().then(() => {
      if (!this.privacyManager.isConfigured) {
        this.privacyConfigModalOpener.open();
      }
    });
  }
}
