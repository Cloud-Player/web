import {AuxappModel} from '../auxapp/auxapp.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {AuthenticatedUserAccountsCollection} from './account/authenticated-user-accounts.collection';
import {IAuthenticatedUserAccount} from './account/authenticated-user-account.interface';
import * as localforage from 'localforage';

export class AuthenticatedUserModel extends AuxappModel {
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

  private migrateCloudPlayerAccount(): JQueryPromise<any> {
    const cloudPlayerHostname = 'https://api.cloud-player.io';
    return this.request(`${cloudPlayerHostname}/user/me`, 'GET').then((user) => {
      return this.request(`${cloudPlayerHostname}/migration`, 'POST', {
        data: {
          user_id: user.id
        }
      }).then((rsp) => {
        return this.request(`${this.hostName()}/migration`, 'POST', {
          data: rsp
        });
      });
    });
  }

  migrate() {
    return new Promise((resolve) => {
      localforage.getItem('cp_user_migrated').then((isMigrated) => {
        if (!isMigrated) {
          this.migrateCloudPlayerAccount().then(() => {
            localforage.setItem('cp_user_migrated', true);
            resolve();
          }, resolve.bind(this));
        } else {
          resolve();
        }
      });
    });

  }

  fetch(...args) {
    const id = this.id;
    this.set('id', 'me');
    const superCall = super.fetch.apply(this, ...args);
    this.set('id', id);
    return superCall;
  }
}


