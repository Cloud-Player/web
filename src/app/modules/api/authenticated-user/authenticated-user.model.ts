import {AuxappModel} from '../auxapp/auxapp.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {AuthenticatedUserAccountsCollection} from './account/authenticated-user-accounts.collection';
import {IAuthenticatedUserAccount} from './account/authenticated-user-account.interface';
import {AuthenticatedUserAccountAuxappModel} from './account/authenticated-user-account-auxapp.model';
import {SessionModel} from './sessions/session.model';

export class AuthenticatedUserModel extends AuxappModel {
  private static instance: AuthenticatedUserModel;

  endpoint = '/user';

  @attributesKey('accounts')
  @nested()
  public accounts: AuthenticatedUserAccountsCollection<IAuthenticatedUserAccount>;

  @attributesKey('session')
  @nested()
  public session: SessionModel;

  static getInstance(): AuthenticatedUserModel {
    if (!AuthenticatedUserModel.instance) {
      AuthenticatedUserModel.instance = new AuthenticatedUserModel();
    }
    return AuthenticatedUserModel.instance;
  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'me', {silent: true});
    const superCall = super.fetch.apply(this, ...args);
    this.set('id', id, {silent: true});
    return superCall;
  }

  public getAuxappAccount(): AuthenticatedUserAccountAuxappModel {
    return this.accounts.getAuxappAccount();
  }
}


