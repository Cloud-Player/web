import {Component} from '@angular/core';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {ExternalUserAuthenticator} from '../../services/external-authenticator.class';

@Component({
  selector: 'app-authenticated-user-view',
  styleUrls: ['./authenticated-user-view.style.scss'],
  templateUrl: './authenticated-user-view.template.html'
})
export class AuthenticatedUserViewComponent {
  constructor(private externalUserAuthenticator: ExternalUserAuthenticator) {

  }

  public connect(account: IAuthenticatedUserAccount) {
    this.externalUserAuthenticator.connect(account);
  }
}
