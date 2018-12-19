import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {dynamicInstance} from '../../../backbone/decorators/dynamic-instance.decorator';
import {AuthenticatedUserAccountAuxappModel} from './authenticated-user-account-auxapp.model';
import {AuthenticatedUserAccountYoutubeModel} from './authenticated-user-account-youtube.model';
import {AuthenticatedUserAccountSoundcloudModel} from './authenticated-user-account-soundcloud.model';
import {AccountsCollection} from '../../account/accounts.collection';
import {IAccount} from '../../account/account.interface';
import {BaseModel} from '../../../backbone/models/base.model';
import {CollectionSetOptions} from 'backbone';
import {AuthenticatedUserAccountDeezerModel} from './authenticated-user-account-deezer.model';
import {isObject} from 'underscore';

export class AuthenticatedUserAccountsCollection<TModel extends IAuthenticatedUserAccount>
  extends AccountsCollection<TModel> {

  endpoint = '/account';

  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      auxapp: AuthenticatedUserAccountAuxappModel,
      youtube: AuthenticatedUserAccountYoutubeModel,
      soundcloud: AuthenticatedUserAccountSoundcloudModel,
      deezer: AuthenticatedUserAccountDeezerModel,
      default: AuthenticatedUserAccountAuxappModel
    }
  })
  model = AuthenticatedUserAccountSoundcloudModel;

  set(models?: TModel | TModel[], options: CollectionSetOptions = {}): TModel[] {
    if (models instanceof BaseModel && models.id && this.getAccountForProvider(models.provider)) {
      options.merge = true;
      return this.getAccountForProvider(models.provider).set(models.toJSON(), options);
    } else if (isObject(models) && this.getAccountForProvider((<any>models).provider_id)) {
      options.merge = true;
      const existing = this.getAccountForProvider((<any>models).provider_id);
      return existing.set(existing.parse(models), options);
    } else {
      return super.set.call(this, models, options);
    }
  }

  initialize() {
    [
      AuthenticatedUserAccountAuxappModel,
      AuthenticatedUserAccountSoundcloudModel,
      AuthenticatedUserAccountYoutubeModel
    ].forEach((account) => {
      const tmpAccountModel: IAccount = new account({tmp: 1});
      this.add(tmpAccountModel);
    });
  }

  public getAuxappAccount(): AuthenticatedUserAccountAuxappModel {
    const account = <unknown>this.getAccountForProvider('auxapp');
    return <AuthenticatedUserAccountAuxappModel>account;
  }

}
