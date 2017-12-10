import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Session} from '../../../session/models/session.model';
import {AuthenticatedUser} from '../../../session/models/authenticated_user.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ToastService} from '../../../shared/services/toast';
import {ToastModel} from '../../../shared/models/toast';
import {ToastTypes} from '../../../shared/src/toast-types.enum';
import {NativeAppHandlerService} from '../../../native-app/services/native-app-handler';

const packageJSON = require('../../../../../../package.json');

@Component({
  selector: 'app-cloud-player',
  templateUrl: './main.template.html',
  styleUrls: ['./main.style.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  private isAuthenticated = false;
  private session: Session;

  public version = packageJSON.version;

  constructor(private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService,
              private toastService: ToastService) {
    this.session = Session.getInstance();
  }

  private setAuthenticated(user: AuthenticatedUser) {
    if (user.authenticated) {
      user.fetch().then(() => {
        this.isAuthenticated = true;
        user.likes.fetch();
      });
    } else {
      this.isAuthenticated = false;
    }
  }

  ngOnInit(): void {
    this.session.user.on('change:authenticated', (user: AuthenticatedUser) => {
      this.setAuthenticated(user);
    });

    if (this.session.isValid()) {
      this.setAuthenticated(this.session.user);
    }

    // Handle native client started event that is triggered by the native Cloud Player app
    window.addEventListener('startNativeClient', (event: CustomEvent) => {
      const clientDetails: { version: number, platform: string } = event.detail;
      document.querySelector('body').classList.add('native', 'desktop', clientDetails.platform);
      this.nativeAppHandlerService.init({
        version: event.detail.version,
        platform: event.detail.platform
      });
      window.dispatchEvent(new Event('clientReady'));
    });

    // Handle service worker update
    window.addEventListener('newAppVersionAvailable', (event: CustomEvent) => {
      const toast = new ToastModel();
      toast.title = 'Cloud Player has been updated';
      toast.type = ToastTypes.Primary;
      toast.icon = 'fa fa-rocket';
      toast.buttonAction = () => {
        location.reload(true);
      };
      toast.buttonLabel = 'Restart Cloud Player';

      this.toastService.addToast(toast);
    });

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
  }
}
