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

export class TrackYoutubeModel extends YoutubeProxyModel implements ITrack {
  private _topics: TracksYoutubeTopicsCollection<TracksYoutubeTopicModel>;

  type: 'Track';

  endpoint = '/videos';

  @queryParam()
  part = 'snippet';

  @attributesKey('hasDetails')
  @defaultValue(false)
  hasDetails: boolean;

  @attributesKey('provider_id')
  @defaultValue('youtube')
  provider: string;

  @attributesKey('videoId')
  videoId: string;

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

  @attributesKey('categoryIds')
  @nested()
  categoryIds: BaseCollection<BaseModel>;

  @attributesKey('supportsMobilePlayBack')
  @defaultValue(false)
  supportsMobilePlayBack: boolean;

  // Parses the youtube duration string e.g. PT4M25S, PT10H4M25S, PT4M
  public static getParsedDuration(ytDuration: string) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (ytDuration) {
      const match = ytDuration.match(/(\d*H)?(\d*M)?(\d*S)?$/);

      if (match && match.length === 4) {
        if (match[1]) {
          hours = parseInt(match[1], 10);
        }
        if (match[2]) {
          minutes = parseInt(match[2], 10);
        }
        if (match[3]) {
          seconds = parseInt(match[3], 10);
        }
      }
    }
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }

  // Parses the width and height from the youtube embed html string
  // e.g. <iframe width="480" height="270" src="//www.youtube.com/embed/Kpm1l0HfkV0"></iframe>
  public static getAspectRationFromEmbedString(embedString: string) {
    let aspectRatio = 1;

    if (embedString) {
      const match = embedString.match(/width="(\d*)".*height="(\d*)"/);

      if (match && match.length === 3) {
        aspectRatio = parseInt(match[1], 10) / (parseInt(match[2], 10));
      }
    }

    return aspectRatio;
  }

  private setGenre() {
    if (this.categoryIds.length > 0) {
      this.categoryIds.each((id, index) => {
        const topic = this._topics.get(id);
        if (!topic.isParent || index === this.categoryIds.length) {
          this.genre = topic.title;
        }
      });
    }
  }

  hostName(): string {
    return YoutubeProxyModel.prototype.hostName.apply(this);
  }

  sync(...args) {
    return YoutubeProxyModel.prototype.sync.apply(this, args);
  }

  parse(attributes) {
    if (attributes.items && attributes.items.length === 1) {
      attributes = attributes.items[0];
    }

    const parsedTrack: any = {
      id: isObject(attributes.id) ? attributes.id.videoId : attributes.id
    };

    if (attributes.snippet) {
      parsedTrack.title = attributes.snippet.title;
      parsedTrack.createdAt = +new Date(attributes.snippet.publishedAt);
      if (attributes.snippet.thumbnails) {
        parsedTrack.image = {
          default: attributes.snippet.thumbnails.default,
          medium: attributes.snippet.thumbnails.medium,
          high: attributes.snippet.thumbnails.high
        };
      }
      parsedTrack.user = {
        id: attributes.snippet.channelId,
        title: attributes.snippet.channelTitle
      };
    }

    if (attributes.player) {
      parsedTrack.aspectRatio = TrackYoutubeModel.getAspectRationFromEmbedString(attributes.player.embedHtml);
    }

    if (attributes.contentDetails) {
      parsedTrack.duration = TrackYoutubeModel.getParsedDuration(attributes.contentDetails.duration);
      parsedTrack.hasDetails = true;
    }

    if (attributes.statistics) {
      parsedTrack.likes = parseInt(attributes.statistics.likeCount, 10);
      parsedTrack.clicks = parseInt(attributes.statistics.viewCount, 10);
    }

    if (attributes.topicDetails) {
      parsedTrack.categoryIds = attributes.topicDetails.relevantTopicIds;
    }

    return parsedTrack;
  }

  initialize() {
    this._topics = TracksYoutubeTopicsCollection.getInstance();
    this._topics.once('add', this.setGenre.bind(this));
    this.categoryIds.on('add remove reset', () => {
      this.setGenre();
    });
  }

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
