import {User} from '../../users/models/user.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';
import {Comments} from '../../comments/collections/comments.collection';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {Comment} from '../../comments/models/comment.model';

export class Track extends SoundcloudModel {
  endpoint = '/tracks';

  @attributesKey('user')
  @nested()
  user: User;

  @attributesKey('artwork_url')
  @nested()
  image: SoundcloudImageModel;

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

  getResourceUrl(): string {
    if (this.streamUrl) {
      return `${this.streamUrl}?client_id=${this.clientId}`;
    } else {
      return null;
    }
  }

  parse(attrs: any) {
    attrs = super.parse(attrs);
    attrs.likes = attrs.likes_count || attrs.favoritings_count;
    return attrs;
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
