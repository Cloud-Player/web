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

export class TrackMixcloudModel extends BaseModel implements ITrack {
  type: 'Track';

  endpoint = '/videos';

  @attributesKey('hasDetails')
  @defaultValue(true)
  hasDetails: boolean;

  @attributesKey('provider_id')
  @defaultValue('mixcloud')
  provider: string;

  @attributesKey('key')
  trackId: string;

  @attributesKey('user')
  @nested()
  artist: ArtistYoutubeModel;

  @attributesKey('image')
  @nested()
  image: ImageYoutubeModel;

  @attributesKey('title')
  title: string;

  @attributesKey('duration')
  duration: number;

  @attributesKey('genre')
  genre: string;

  @attributesKey('createdAt')
  createdAt: number;

  @attributesKey('likes')
  likes: number;

  @attributesKey('clicks')
  clicks: number;

  @attributesKey('aspectRatio')
  @defaultValue(1)
  aspectRatio: number;

  @attributesKey('supportsMobilePlayBack')
  @defaultValue(true)
  supportsMobilePlayBack: boolean;

  public toMiniJSON() {
    const obj: any = {};
    obj.provider = this.provider;
    obj.id = this.id;
    obj.title = this.title;
    obj.duration = this.duration;
    obj.image = this.image.toJSON();
    obj.user = this.artist.toJSON();
    obj.aspectRatio = this.aspectRatio;

    return obj;
  }
}
