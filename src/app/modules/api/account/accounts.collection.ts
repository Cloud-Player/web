import {IAccount} from './account.interface';
import {AccountSoundcloudModel} from './account-soundcloud.model';
import {AccountYoutubeModel} from './account-youtube.model';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {AuxappCollection} from '../auxapp/auxapp.collection';
import {AccountAuxappModel} from './account-auxapp.model';

export class AccountsCollection<TModel extends IAccount> extends AuxappCollection<TModel> {
  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      auxapp: AccountAuxappModel,
      youtube: AccountYoutubeModel,
      soundcloud: AccountSoundcloudModel
    }
  })
  model = null;

  getAccountForProvider(provider: string) {
    return this.find((account: IAccount) => {
      return account.provider === provider;
    });
  }
}
