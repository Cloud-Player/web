import {Component} from '@angular/core';
import {ConnectDeviceModel} from '../../models/connect-device';

@Component({
  selector: 'app-connect-view',
  styleUrls: ['./connect-view.scss'],
  templateUrl: './connect-view.html'
})

export class ConnectViewComponent {
  public connectDeviceModel: ConnectDeviceModel;
  public tokenWasValid: boolean;
  public tokenWasSend: boolean;

  public sendToken() {
    this.connectDeviceModel.save().then(() => {
      this.tokenWasValid = true;
      this.tokenWasSend = true;
    }, () => {
      this.tokenWasValid = false;
      this.tokenWasSend = true;
    });
  }

  constructor() {
    this.connectDeviceModel = new ConnectDeviceModel();
    this.connectDeviceModel.on('change:id', (model) => {
      if (model.id.length === 6) {
        this.sendToken();
      } else {
        this.tokenWasSend = false;
      }
    });
  }
}
