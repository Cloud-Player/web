import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ToastService} from '../../../shared/services/toast';
import {ToastModel} from '../../../shared/models/toast';
import {ToastTypes} from '../../../shared/src/toast-types.enum';
import {NativeAppHandlerService} from '../../../native-app/services/native-app-handler';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AuthenticatedUserAccountAuxappModel} from '../../../api/authenticated-user/account/authenticated-user-account-auxapp.model';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {Modal} from '../../../shared/src/modal-factory.class';
import {PrivacyConfigComponent, PrivacyConfigModalOpener} from '../privacy-config/privacy-config';
import {PrivacyManager} from '../../services/privacy-manager';
import {SocketMessageService, SocketStatusTypes} from '../../../shared/services/socket-message';
import {filter} from 'rxjs/operators';
import {SessionsCollection} from '../../../api/sessions/sessions.collection';
import {SessionModel} from '../../../api/sessions/session.model';
import {Authenticator} from '../../../authenticated-user/services/authenticator';

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
  private _sessions: SessionsCollection<SessionModel>;

  constructor(private privacyManager: PrivacyManager,
              private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService,
              private toastService: ToastService,
              private privacyConfigModalOpener: PrivacyConfigModalOpener,
              private socketMessageService: SocketMessageService,
              private authenticator: Authenticator) {
    this._authenticatedUser = AuthenticatedUserModel.getInstance();
    this._sessions = new SessionsCollection<SessionModel>();
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

    const auxappAccount: AuthenticatedUserAccountAuxappModel =
      <AuthenticatedUserAccountAuxappModel>this._authenticatedUser.accounts.getAccountForProvider('auxapp');

    // if (auxappAccount) {
    //   // Create session only once per app start
    //   auxappAccount.on('change:id', () => {
    //     const session = new SessionModel();
    //     session.browser = `${ClientDetector.getClient().name}`;
    //     session.os = `${ClientDetector.getOs().name}:${ClientDetector.getOs().version}`;
    //     session.screen = `${screen.availWidth}x${screen.availHeight}`;
    //     this._sessions.add(session);
    //     this._authenticatedUser.session.set(session.toJSON());
    //     session.save().then(() => {
    //       this.socketMessageService.open('wss://api.aux.app/websocket');
    //     });
    //   });
    //   // Fetch favourite tracks on every id change
    //   this._authenticatedUser.on('change:id', auxappAccount.favouriteTracks.fetch.bind(auxappAccount.favouriteTracks));
    //
    //   //this._sessions.fetch();
    //   this._sessions.on('add', () => {
    //     debugger;
    //   });
    // }

    // this.privacyManager.getPrivacySettings().then(() => {
    //   if (!this.privacyManager.isConfigured) {
    //     this.privacyConfigModalOpener.open();
    //   }
    // });

    // this.socketMessageService.getObservable()
    //   .pipe(
    //     filter((value) => {
    //       return value.type === SocketStatusTypes.CLOSED;
    //     })
    //   )
    //   .subscribe(() => {
    //     console.warn('[PLAYER] CLOSED');
    //     this.socketMessageService.open('wss://api.aux.app/websocket');
    //   });
    // this.socketMessageService.getObservable()
    //   .pipe(
    //     filter((value) => {
    //       return value.type === SocketStatusTypes.OPEN;
    //     })
    //   )
    //   .subscribe(() => {
    //     console.log('[PLAYER] OPEN');
    //   });
    this.authenticator.login();
  }
}
