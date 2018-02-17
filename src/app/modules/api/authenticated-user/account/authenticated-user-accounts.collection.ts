import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {dynamicInstance} from '../../../backbone/decorators/dynamic-instance.decorator';
import {AuthenticatedUserAccountCloudplayerModel} from './authenticated-user-account-cloudplayer.model';
import {AuthenticatedUserAccountYoutubeModel} from './authenticated-user-account-youtube.model';
import {AuthenticatedUserAccountSoundcloudModel} from './authenticated-user-account-soundcloud.model';
import {AccountsCollection} from '../../account/accounts.collection';
import {IAccount} from '../../account/account.interface';
import {BaseModel} from '../../../backbone/models/base.model';
import {CollectionSetOptions} from 'backbone';

export class AuthenticatedUserAccountsCollection<TModel extends IAuthenticatedUserAccount>
  extends AccountsCollection<TModel> {

  endpoint = '/account';

  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      cloudplayer: AuthenticatedUserAccountCloudplayerModel,
      youtube: AuthenticatedUserAccountYoutubeModel,
      soundcloud: AuthenticatedUserAccountSoundcloudModel
    }
  })
  model = AuthenticatedUserAccountSoundcloudModel;

  set(models?: TModel | TModel[], options: CollectionSetOptions = {}): TModel[] {
    if (models instanceof BaseModel && models.id && this.getAccountForProvider(models.provider)) {
      this.getAccountForProvider(models.provider).set(models.toJSON(), {merge: true});
    }
    return super.set.call(this, models, options);
  }

  initialize() {
    [
      AuthenticatedUserAccountCloudplayerModel,
      AuthenticatedUserAccountSoundcloudModel,
      AuthenticatedUserAccountYoutubeModel
    ].forEach((account) => {
      const tmpAccountModel: IAccount = new account({tmp: 1});
      this.add(tmpAccountModel);
    });
  }

}
