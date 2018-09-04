import {ToastModel} from '../../shared/models/toast';
import {Injectable} from '@angular/core';
import {ToastTypes} from '../../shared/src/toast-types.enum';
import {ToastService} from '../../shared/services/toast';
import {UserAnalyticsService} from '../../user-analytics/services/user-analytics.service';
import {HttpClient} from '@angular/common/http';
import {ClientDetector} from '../../shared/services/client-detector.service';
import {AuthenticatedUserModel} from '../../api/authenticated-user/authenticated-user.model';
import {LayoutService, WindowElementTypes} from '../../shared/services/layout';
import {PlayqueueAuxappModel} from '../../api/playqueue/playqueue-auxapp.model';

@Injectable()
export class NativeAppHandlerService {
  private _clientDetails: {
    version: string,
    platform: string
  };
  private _latestClientVersion: string;
  private _playQueue: PlayqueueAuxappModel;

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
    this._playQueue = PlayqueueAuxappModel.getInstance();
  }

  private fetchLatestClientVersion(): Promise<string> {
    return this.http
      .get('https://api.github.com/repos/Cloud-Player/desktop-app/releases')
      .toPromise()
      .then((versions: Array<any>) => {
        const latestVersion = versions[0];
        this._latestClientVersion = latestVersion.name;
        return latestVersion.name;
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

    window.addEventListener('downloadProgress', (ev: CustomEvent) => {
      const progress = ev.detail.receivedByes / ev.detail.totalBytes;
      if (progress < 1) {
        toast.title = null;
        toast.message = `Downloading new Version (${Math.round(progress * 100)}%)...`;
        toast.buttonLink = null;
        toast.dismissible = false;
      } else {
        toast.title = 'Download completed!';
        toast.message = 'Open the new version to install it on your computer';
        toast.buttonLabel = 'Open';
        toast.buttonAction = () => {
          window.open(`open-file://${ev.detail.path}`);
          this.toastService.removeToast(toast);
        };
        toast.dismissible = true;
      }
    });
  }

  private bindMediaKeyListener() {
    window.addEventListener('playPauseTrackKeyPressed', () => {
      if (this._playQueue.items.getPlayingItem()) {
        this.userAnalyticsService.trackEvent('desktop_native', 'pause_track', 'app-player-controls-cmp');
        this._playQueue.items.getPlayingItem().pause();
      } else if (this._playQueue.items.getPausedItem()) {
        this.userAnalyticsService.trackEvent('desktop_native', 'play_track', 'app-player-controls-cmp');
        this._playQueue.items.getPausedItem().play();
      }
    });
    window.addEventListener('nextTrackKeyPressed', () => {
      if (this._playQueue.items.hasNextItem()) {
        this._playQueue.items.getNextItem().play();
        this.userAnalyticsService.trackEvent('desktop_native', 'next_track', 'app-player-controls-cmp');
      }
    });
    window.addEventListener('previousTrackKeyPressed', () => {
      if (this._playQueue.items.getPreviousItem()) {
        this._playQueue.items.getPreviousItem().play();
        this.userAnalyticsService.trackEvent('desktop_native', 'previous_track', 'app-player-controls-cmp');
      }
    });
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
      `desktop_native`, `start_${clientDetails.platform}`, `version:${clientDetails.version}`);
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
    this.bindMediaKeyListener();
    this.layoutService.registerWindowElement(WindowElementTypes.NativeDesktopApp);
  }
}
