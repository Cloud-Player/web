import {User} from '../../users/models/user.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';
import {Comments} from '../../comments/collections/comments.collection';

export class Track extends SoundcloudModel {
  endpoint = '/tracks';

  nested() {
    return {
      user: User,
      artwork_url: SoundcloudImageModel,
      comments: Comments
    };
  }

  getResourceUrl(): string {
    return `${this.get('stream_url')}?client_id=${this.clientId}`;
  }

  parse(attrs: any) {
    attrs = super.parse(attrs);
    attrs.likes = attrs.likes_count || attrs.favoritings_count;
    return attrs;
  }

  initialize(): void {
    if (this.get('id')) {
      this.get('comments').setTrackId(this.get('id'));
    }
    this.on('change:id', () => {
      this.get('comments').setTrackId(this.get('id'));
    });
  }
}
