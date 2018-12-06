import {IArtist} from './artist.interface';
import {dynamicInstance} from '../../backbone/decorators/dynamic-instance.decorator';
import {AuxappCollection} from '../auxapp/auxapp.collection';
import {ArtistAuxappModel} from './artist-auxapp.model';

export class ArtistsCollection<TModel extends IArtist> extends AuxappCollection<TModel> {
  model = ArtistAuxappModel;

  getArtistForProvider(provider: string) {
    return this.find((account: IArtist) => {
      return account.provider === provider;
    });
  }
}
