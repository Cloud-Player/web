import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TrackAuxappModel} from './track-auxapp.model';

export class TrackYoutubeModel extends TrackAuxappModel {
  endpoint = '/track/youtube';

  @attributesKey('provider_id')
  @defaultValue('youtube')
  provider_id: string;

  clone() {
    return new TrackYoutubeModel(this.toMiniJSON());
  }
}
