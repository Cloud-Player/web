import {IArtist} from './artist.interface';
import {ArtistSoundcloudModel} from './artist-soundcloud.model';
import {ArtistYoutubeModel} from './artist-youtube.model';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {CloudplayerCollection} from '../cloud-player/cloud-player.collection';
import {ArtistCloudplayerModel} from './artist-cloudplayer.model';

export class AccountsCollection<TModel extends IArtist> extends CloudplayerCollection<TModel> {
  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      cloudplayer: ArtistCloudplayerModel,
      soundcloud: ArtistSoundcloudModel,
      youtube: ArtistYoutubeModel
    }
  })
  model = null;

  getArtistForProvider(provider: string) {
    return this.find((account: IArtist) => {
      return account.provider === provider;
    });
  }
}
