import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ToastService} from '../../../shared/services/toast';
import {ToastModel} from '../../../shared/models/toast';
import {ToastTypes} from '../../../shared/src/toast-types.enum';
import {NativeAppHandlerService} from '../../../native-app/services/native-app-handler';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AuthenticatedUserAccountCloudplayerModel} from '../../../api/authenticated-user/account/authenticated-user-account-cloudplayer.model';
import {ClientDetector} from '../../../shared/services/client-detector.service';

@Component({
  selector: 'app-cloud-player',
  templateUrl: './main.template.html',
  styleUrls: ['./main.style.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  private _authenticatedUser: AuthenticatedUserModel;

  constructor(private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService,
              private toastService: ToastService) {
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

    // FIXME DEPRECATED For backwards compatibility where the native client does not trigger the event
    setTimeout(() => {
      if ((<any>window).appVersion) {
        const oldVersion = {
          version: (<any>window).appVersion,
          platform: null
        };
        const bodyClassList = document.querySelector('body').classList.toString();
        const platformMatch = bodyClassList.match(/desktop\s([^\s]*)/);
        if (platformMatch && platformMatch.length > 0) {
          oldVersion.platform = platformMatch[1];
        }
        const nativeClientStartEvent = new CustomEvent('startNativeClient', {detail: oldVersion});
        window.dispatchEvent(nativeClientStartEvent);
      }
    }, 2000);

    const cloudPlayerAccount: AuthenticatedUserAccountCloudplayerModel = <AuthenticatedUserAccountCloudplayerModel>this._authenticatedUser.accounts.getAccountForProvider('cloudplayer');
    if (cloudPlayerAccount) {
      cloudPlayerAccount.once('change:id', () => {
        cloudPlayerAccount.favouriteTracks.fetch();
      });
    }
    cloudPlayerAccount.createSession({
      browser: `${ClientDetector.getClient().name}`,
      os: `${ClientDetector.getOs().name}:${ClientDetector.getOs().version}`,
      screenSize: '100'
    });
  }
}
