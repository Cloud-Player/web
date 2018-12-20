import {Component} from '@angular/core';
import {ClientDetector, ClientNames} from '../../services/client-detector.service';

@Component({
  selector: 'app-aux-app-logo',
  styleUrls: ['./aux-app-logo.scss'],
  templateUrl: './aux-app-logo.html'
})
export class AuxAppLogoComponent {

  public canAnimate() {
    return (
      ClientDetector.isMacPC() &&
      ClientDetector.getClient().name === ClientNames.Chrome
    );
  }
}
