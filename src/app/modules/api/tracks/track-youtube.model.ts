import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {BaseModel} from '../../backbone/models/base.model';
import {TracksYoutubeTopicModel} from './tracks-youtube-topic.model';
import {YoutubeProxyModel} from '../youtube/youtube-proxy.model';
import {TracksYoutubeTopicsCollection} from './tracks-youtube-topics.collection';
import {ITrack} from './track.interface';
import {ImageYoutubeModel} from '../image/image-youtube.model';
import {ArtistYoutubeModel} from '../artist/artist-youtube.model';
import {queryParam} from '../../backbone/decorators/query-param.decorator';
import {isObject} from 'underscore';
import {TrackAuxappModel} from './track-auxapp.model';
import {TrackSoundcloudModel} from './track-soundcloud.model';

export class TrackYoutubeModel extends TrackAuxappModel {
  endpoint = '/track/youtube';

  @attributesKey('provider_id')
  @defaultValue('youtube')
  provider: string;

  clone() {
    return new TrackYoutubeModel(this.toMiniJSON());
  }
}
