import {IArtist} from './artist.interface';
import {ArtistSoundcloudModel} from './artist-soundcloud.model';
import {ArtistYoutubeModel} from './artist-youtube.model';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {AuxappCollection} from '../auxapp/auxapp.collection';
import {ArtistAuxappModel} from './artist-auxapp.model';

export class AccountsCollection<TModel extends IArtist> extends AuxappCollection<TModel> {
  @dynamicInstance({
    identifierKey: 'provider_id',
    identifierKeyValueMap: {
      auxapp: ArtistAuxappModel,
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
