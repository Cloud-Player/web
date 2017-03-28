import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../users/models/user.model';
import {Session} from '../../../session/models/session.model';
import {Result, ClientDetector, OsNames} from '../../../shared/services/client-detector.service';

@Component({
  selector: 'cloud-player',
  styles: [require('./desktop-app-view.style.scss')],
  template: require('./desktop-app-view.template.html')
})

export class DesktopAppViewComponent implements OnInit {

  ngOnInit(): void {
  }

  isWindowsPc(): boolean{
    let os: Result = ClientDetector.getOs();
    return (
      os.name === OsNames.Windows && os.version >= 7
    );
  }

  isMacPc(): boolean{
    let os: Result = ClientDetector.getOs();
    return (
      os.name === OsNames.MacOs && os.version > 0
    );
  }

}
