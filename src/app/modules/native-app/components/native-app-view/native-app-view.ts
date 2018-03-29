import {Component, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {ClientDetector} from '../../../shared/services/client-detector.service';
import {NativeAppHandlerService} from '../../services/native-app-handler';

@Component({
  selector: 'app-native-app-view',
  styleUrls: ['./native-app-view.scss'],
  templateUrl: './native-app-view.html'
})
export class NativeAppViewComponent implements OnInit {
  public downloadLink: string;

  constructor(private userAnalyticsService: UserAnalyticsService,
              private nativeAppHandlerService: NativeAppHandlerService) {
  }

  public isWindowsPc(): boolean {
    return ClientDetector.isWindowsPC();
  }

  public isMacPc(): boolean {
    return ClientDetector.isMacPC();
  }

  public getDownloadLabel() {
    return `Download for ${ClientDetector.getOs().name}`;
  }

  public download() {
    this.userAnalyticsService.trackEvent(
      `desktop_native`,
      `download_${ClientDetector.getOs().name}`,
      'app-desktop-app-view'
    );
  }

  ngOnInit(): void {
    this.nativeAppHandlerService.getLatestVersion().then((version) => {
      this.downloadLink = NativeAppHandlerService.getDownloadLinkForVersion(version);
    });
  }
}
