import {CloudplayerModel} from '../cloud-player/cloud-player.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {AuthenticatedUserAccountsCollection} from './account/authenticated-user-accounts.collection';
import {IAuthenticatedUserAccount} from './account/authenticated-user-account.interface';

export class AuthenticatedUserModel extends CloudplayerModel {
  private static instance: AuthenticatedUserModel;

  endpoint = '/user';

  @attributesKey('accounts')
  @nested()
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;

  static getInstance(): AuthenticatedUserModel {
    if (!AuthenticatedUserModel.instance) {
      AuthenticatedUserModel.instance = new AuthenticatedUserModel();
    }
    return AuthenticatedUserModel.instance;
  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'me');
    const superCall = super.fetch.apply(this, ...args);
    this.set('id', id);
    return superCall;
  }
}


