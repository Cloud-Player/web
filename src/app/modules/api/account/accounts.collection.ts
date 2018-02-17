import {IAccount} from './account.interface';
import {AccountSoundcloudModel} from './account-soundcloud.model';
import {AccountYoutubeModel} from './account-youtube.model';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {CloudplayerCollection} from '../cloud-player/cloud-player.collection';
import {AccountCloudplayerModel} from './account-cloudplayer.model';

export class AccountsCollection<TModel extends IAccount> extends CloudplayerCollection<TModel> {
  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      cloudplayer: AccountCloudplayerModel,
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
