import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {AuxappModel} from '../../api/auxapp/auxapp.model';
import {ArtistAuxappModel} from '../../api/artist/artist-auxapp.model';

export class Comment extends AuxappModel {
  endpoint = '/comments';

  @attributesKey('account')
  @nested()
  account: ArtistAuxappModel;

  @attributesKey('timestamp')
  timestamp: number;

  @attributesKey('body')
  body: string;
}
