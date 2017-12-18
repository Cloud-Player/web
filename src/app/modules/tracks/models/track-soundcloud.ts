import {User} from '../../users/models/user.model';
import {ImageSoundcloudModel} from '../../shared/models/image-soundcloud';
import {Comments} from '../../comments/collections/comments.collection';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {Comment} from '../../comments/models/comment.model';
import {Track} from './track';
import {Globals} from '../../../../globals';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {SoundcloudModel} from '../../shared/models/soundcloud';

export class TrackSoundcloud extends Track {
  endpoint = '/tracks';

  @attributesKey('provider')
  @defaultValue('SOUNDCLOUD')
  provider: string;

  @attributesKey('user')
  @nested()
  artist: User;

  @attributesKey('artwork_url')
  @nested()
  image: ImageSoundcloudModel;

  @attributesKey('comments')
  @nested()
  comments: Comments<Comment>;

  @attributesKey('title')
  title: string;

  @attributesKey('duration')
  duration: number;

  @attributesKey('genre')
  genre: string;

  @attributesKey('created_at')
  createdAt: number;

  @attributesKey('likes')
  likes: number;

  @attributesKey('playback_count')
  clicks: number;

  @attributesKey('stream_url')
  streamUrl: string;

  @attributesKey('aspectRatio')
  @defaultValue(1)
  aspectRatio: number;

  hostName(): string {
    return SoundcloudModel.prototype.hostName.apply(this);
  }

  sync(...args) {
    return SoundcloudModel.prototype.sync.apply(this, args);
  }

  getResourceUrl(): string {
    if (this.streamUrl) {
      return `${this.streamUrl}?client_id=${Globals.soundcloudClientId}`;
    } else {
      return null;
    }
  }

  parse(attrs: any) {
    attrs = super.parse(attrs);
    attrs.likes = attrs.likes_count || attrs.favoritings_count;
    return attrs;
  }

  getAdditionalMiniJSONAttrs() {
    return {
      stream_url: this.streamUrl
    };
  }

  initialize(): void {
    if (this.id) {
      this.comments.setTrackId(this.id);
    }
    this.on('change:id', () => {
      this.comments.setTrackId(this.id);
    });
  }
}
