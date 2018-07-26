import {TrackAuxappModel} from './track-auxapp.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TrackYoutubeModel} from './track-youtube.model';

export class TrackMixcloudModel extends TrackAuxappModel {
  endpoint = '/track/mixcloud';

  @attributesKey('provider_id')
  @defaultValue('mixcloud')
  provider: string;

  clone() {
    return new TrackMixcloudModel(this.toMiniJSON());
  }
}
