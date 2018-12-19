import {TrackAuxappModel} from './track-auxapp.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';

export class TrackDeezerModel extends TrackAuxappModel {
  endpoint = '/track/deezer';

  @attributesKey('provider_id')
  @defaultValue('deezer')
  provider_id: string;

  clone() {
    return new TrackDeezerModel(this.toMiniJSON());
  }
}
