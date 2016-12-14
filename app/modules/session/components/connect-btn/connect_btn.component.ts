import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'connect-btn',
  templateUrl: 'connect_btn.template.html',
  styleUrls: ['connect_btn.style.css']
})
export class ConnectBtnComponent {
  connect() {
    window.open('https://soundcloud.com/connect?' +
      'client_id=abb6c1cad3f409112a5995bf922e1d1e&' +
      'redirect_uri=http://sc.menu-flow.com/connect&' +
      'response_type=code' +
      'state=' + window.location.origin + '/#/connect'
    );
  }

  private receiveConnectMessage(event: any): void {
    let origin = event.origin || event.originalEvent.origin;
    if (origin !== window.location.origin) {
      console.log('JOO');
    }
  }

  constructor() {
    window.addEventListener('message', this.receiveConnectMessage, false);
  }
}
