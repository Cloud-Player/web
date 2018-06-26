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

  isConnectedWith3rdParty() {
    const youtubeAccount = this.accounts.getAccountForProvider('youtube');
    const soundcloudAccount = this.accounts.getAccountForProvider('soundcloud');

    return youtubeAccount.isConnected() || soundcloudAccount.isConnected();
  }

  accountHasData() {
    const cloudplayerAccount = this.accounts.getAccountForProvider('cloudplayer');

    return (cloudplayerAccount.playlists.length > 0 || cloudplayerAccount.favouriteTracks.items.length > 0);
  }

  isNotConnectedAndHasData() {
    return (
      this.accountHasData() &&
      !this.isConnectedWith3rdParty()
    );
  }

  canCreateCloudPlayerData() {
    return this.isConnectedWith3rdParty() || this.accountHasData();
  }
}


