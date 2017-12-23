import {User} from '../../users/models/user.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {Track} from './track';
import {ImageYoutubeModel} from '../../shared/models/image-youtube';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {YoutubeModel} from '../../shared/models/youtube';
import {TracksYoutubeCategories} from '../collections/tracks-youtube-categories';
import {TracksYoutubeCategory} from './tracks-youtube-category';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {BaseModel} from '../../backbone/models/base.model';
import {TracksYoutubeTopics} from '../collections/tracks-youtube-topics';
import {TracksYoutubeTopic} from './tracks-youtube-topic';

export class TrackYoutube extends Track {
  private _topics: TracksYoutubeTopics<TracksYoutubeTopic>;
  endpoint = '/videos';

  isLikeable = false;

  @attributesKey('provider')
  @defaultValue('YOUTUBE')
  provider: string;

  @attributesKey('user')
  @nested()
  artist: User;

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
    return YoutubeModel.prototype.hostName.apply(this);
  }

  sync(...args) {
    return YoutubeModel.prototype.sync.apply(this, args);
  }

  parse(attributes) {
    const parsedTrack: any = {
      id: attributes.id.videoId || attributes.id
    };

    if (attributes.snippet) {
      parsedTrack.title = attributes.snippet.title;
      parsedTrack.createdAt = +new Date(attributes.snippet.publishedAt);
      parsedTrack.image = {
        default: attributes.snippet.thumbnails.default,
        medium: attributes.snippet.thumbnails.medium,
        high: attributes.snippet.thumbnails.high
      };
      parsedTrack.user = {
        id: attributes.snippet.channelId,
        username: attributes.snippet.channelTitle
      };
    }

    if (attributes.player) {
      parsedTrack.aspectRatio = TrackYoutube.getAspectRationFromEmbedString(attributes.player.embedHtml);
    }

    if (attributes.contentDetails) {
      parsedTrack.duration = TrackYoutube.getParsedDuration(attributes.contentDetails.duration);
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
    this._topics = TracksYoutubeTopics.getInstance();
    this._topics.once('add', this.setGenre.bind(this));
    this.categoryIds.on('add remove reset', () => {
      this.setGenre();
    });
  }

  getAdditionalMiniJSONAttrs() {
    return {
      aspectRatio: this.aspectRatio
    };
  }
}
