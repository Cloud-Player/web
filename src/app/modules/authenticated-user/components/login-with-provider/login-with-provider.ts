import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IModal, IModalComponent, IModalOptions} from '../../../shared/src/modal.interface';
import * as localforage from 'localforage';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {NgForm} from '@angular/forms';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {ExternalUserAuthenticator} from '../../services/external-authenticator.class';

@Component({
  selector: 'app-login-with-provider',
  templateUrl: './login-with-provider.html',
  styleUrls: ['./login-with-provider.scss']
})
export class LoginWithProviderComponent implements IModalComponent {
  private _modal: IModal;
  modalOptions: IModalOptions = {
    title: 'Login',
    dismissible: true,
    primaryAction: {
      text: 'Login',
      action: () => {
        return new Promise(() => {
          // AuthenticatedUserModel.getInstance().destroy().then(() => {
          //   this.closePage();
          // });
          this._modal.hide();
        });
      }
    },
    secondaryAction: {
      text: 'Cancel'
    }
  };

  @Input()
  account: IAuthenticatedUserAccount;

  @Output()
  loginStateChange: EventEmitter<boolean>;

  constructor(private externalUserAuthenticator: ExternalUserAuthenticator) {
    this.loginStateChange = new EventEmitter();
  }

  public login() {
    this.externalUserAuthenticator.connect(this.account).then(
      () => {
        this.loginStateChange.emit(true);
      }, () => {
        this.loginStateChange.emit(false);
      });
  }

  setModal(modal: IModal) {
    this._modal = modal;
  }
}
