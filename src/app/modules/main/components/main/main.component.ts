import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ToastService} from '../../../shared/services/toast';
import {ToastModel} from '../../../shared/models/toast';
import {ToastTypes} from '../../../shared/src/toast-types.enum';
import {NativeAppHandlerService} from '../../../native-app/services/native-app-handler';

@Component({
  selector: 'app-cloud-player',
  templateUrl: './main.template.html',
  styleUrls: ['./main.style.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  private isAuthenticated = false;

  constructor(private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    // Handle native client started event that is triggered by the native Cloud Player app
    window.addEventListener('startNativeClient', (event: CustomEvent) => {
      const clientDetails: { version: number, platform: string } = event.detail;
      document.querySelector('body').classList.add('native', 'desktop', clientDetails.platform);
      this.nativeAppHandlerService.init({
        version: event.detail.version,
        platform: event.detail.platform
      });

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
