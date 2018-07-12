import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {IArtist} from './artist.interface';

export class ArtistAuxappModel extends AuxappModel implements IArtist {

  endpoint = '/account';

  @attributesKey('provider_id')
  @defaultValue('auxapp')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  getFullName(): string {
    return this.title;
  }

  getAccountId(): string {
    return this.id;
  }
}
