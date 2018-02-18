import {ToastModel} from '../../shared/models/toast';
import {Injectable} from '@angular/core';
import {ToastTypes} from '../../shared/src/toast-types.enum';
import {ToastService} from '../../shared/services/toast';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {HttpClient} from '@angular/common/http';
import {ClientDetector} from '../../shared/services/client-detector.service';
import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {LayoutService} from '../../shared/services/layout';

@Injectable()
export class NativeAppHandlerService {
  private _clientDetails: {
    version: string,
    platform: string
  };
  private _latestClientVersion: string;

  public static getDownloadLinkForVersion(version: string): string {
    if (ClientDetector.isWindowsPC()) {
      return `https://github.com/Cloud-Player/desktop-app/releases/download/v${version}/cloud-player.setup.exe`;
    } else if (ClientDetector.isMacPC()) {
      return `https://github.com/Cloud-Player/desktop-app/releases/download/v${version}/cloud-player.dmg`;
    }
  }

  constructor(private http: HttpClient,
              private toastService: ToastService,
              private layoutService: LayoutService,
              private userAnalyticsService: UserAnalyticsService) {

  }

  private fetchLatestClientVersion(): Promise<string> {
    return this.http
      .get('https://raw.githubusercontent.com/Cloud-Player/desktop-app/master/package.json')
      .toPromise()
      .then((packageJSON: any) => {
        this._latestClientVersion = packageJSON.version;
        return packageJSON.version;
      });
  }

  private showNewNativeVersionAvailableToast(version) {
    const toast = new ToastModel();
    toast.title = 'New Version available!';
    toast.message = 'A new Version of the native client is available and it got even better!';
    toast.icon = 'fa fa-rocket';
    toast.type = ToastTypes.Primary;
    toast.buttonLabel = 'Download';
    toast.buttonLinkTarget = '_parent';
    toast.buttonLink = NativeAppHandlerService.getDownloadLinkForVersion(version);

    this.toastService.addToast(toast);
  }

  public getLatestVersion(): Promise<string> {
    return new Promise((resolve) => {
      if (!this._latestClientVersion) {
        this.fetchLatestClientVersion().then(() => {
          resolve(this._latestClientVersion);
        });
      } else {
        resolve(this._latestClientVersion);
      }
    });
  }

  public init(clientDetails: { version: string, platform: string }) {
    this._clientDetails = clientDetails;
    this.userAnalyticsService.trackEvent(
      `nativeClient@${clientDetails.platform}`, 'start', `version:${clientDetails.version}`);
    this.fetchLatestClientVersion().then((latestClientVersion: string) => {
      if (latestClientVersion !== this._clientDetails.version) {
        this.showNewNativeVersionAvailableToast(latestClientVersion);
      }
    });
    window.addEventListener('connectionSuccessFul', (ev: CustomEvent) => {
      AuthenticatedUserModel.getInstance().fetch();
    });
    const body = window.document.querySelector('body');
    if (body) {
      body.style.opacity = '1';
    }
    this.layoutService.emitLayoutChange();
  }
}
