import {Component, OnDestroy} from '@angular/core';
import {IAuthenticatedUserAccount} from '../../../api/authenticated-user/account/authenticated-user-account.interface';
import {ExternalUserAuthenticator} from '../../services/external-authenticator.class';
import {AuthenticatedUserModel} from '../../../api/authenticated-user/authenticated-user.model';
import {ProviderMap} from '../../../shared/src/provider-map.class';
import {PrivacyConfigComponent, PrivacyConfigModalOpener} from '../../../main/components/privacy-config/privacy-config';
import {filter} from 'rxjs/internal/operators';
import {Modal, ModalStates} from '../../../shared/src/modal-factory.class';
import {DeleteAccountComponent} from '../delete-account/delete-account';
import {ModalComponent} from '../../../shared/components/modal/modal/modal';
import {ModalService} from '../../../shared/services/modal';
import {PrivacyManager} from '../../../main/services/privacy-manager';

@Component({
  selector: 'app-authenticated-user-view',
  styleUrls: ['./authenticated-user-view.style.scss'],
  templateUrl: './authenticated-user-view.template.html'
})
export class AuthenticatedUserViewComponent implements OnDestroy {
  public accounts: Array<IAuthenticatedUserAccount>;
  public authenticatedUser: AuthenticatedUserModel;
  public cloudPlayerAccount: IAuthenticatedUserAccount;
  public hasConnectedAccount: boolean;
  public providerMap = ProviderMap.map;
  private _deleteAccountModal: Modal<DeleteAccountComponent>;

  constructor(private modalService: ModalService,
              private privacyManager: PrivacyManager,
              private externalUserAuthenticator: ExternalUserAuthenticator,
              private privacyConfigModalOpener: PrivacyConfigModalOpener) {
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
    this._deleteAccountModal = this.modalService.createModal(DeleteAccountComponent);
  }

  public connect(provider: string) {
    const account = this.authenticatedUser.accounts.getAccountForProvider(provider);
    if (account) {
      this.externalUserAuthenticator.connect(account);
    }
  }

  public openPrivacySettings() {
    this.privacyConfigModalOpener.open();
  }

  public deleteAccount() {
    this._deleteAccountModal.open();
  }

  public ngOnDestroy(): void {
    this._deleteAccountModal.destroy();
  }
}
