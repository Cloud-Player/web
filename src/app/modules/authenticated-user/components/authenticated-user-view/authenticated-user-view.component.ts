import {Component} from '@angular/core';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {ExternalUserAuthenticator} from '../../services/external-authenticator.class';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {AccountCloudplayerModel} from '../../../api/account/account-cloudplayer.model';
import {ProviderMap} from '../../../shared/src/provider-map.class';

@Component({
  selector: 'app-authenticated-user-view',
  styleUrls: ['./authenticated-user-view.style.scss'],
  templateUrl: './authenticated-user-view.template.html'
})
export class AuthenticatedUserViewComponent {
  public accounts: Array<IAuthenticatedUserAccount>;
  public authenticatedUser: AuthenticatedUserModel;
  public cloudPlayerAccount: IAuthenticatedUserAccount;
  public hasConnectedAccount: boolean;
  public providerMap = ProviderMap.map;

  constructor(private externalUserAuthenticator: ExternalUserAuthenticator) {
    this.authenticatedUser = AuthenticatedUserModel.getInstance();
    this.cloudPlayerAccount = this.authenticatedUser.accounts.getAccountForProvider('cloudplayer');
    this.accounts = this.authenticatedUser.accounts.filter((account) => {
      return account.provider !== 'cloudplayer';
    });
    this.accounts.every((account) => {
      if (account.isConnected()) {
        this.hasConnectedAccount = true;
        return false;
      } else {
        return true;
      }
    });
  }

  public connect(provider: string) {
    const account = this.authenticatedUser.accounts.getAccountForProvider(provider);
    if (account) {
      this.externalUserAuthenticator.connect(account);
    }
  }
}
