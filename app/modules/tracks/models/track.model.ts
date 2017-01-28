import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {SoundcloudModel} from '../../shared/models/soundcloud.model';
import {SoundcloudImageModel} from '../../shared/models/soundcloud-image.model';

@Injectable()
export class Track extends SoundcloudModel {
  endpoint = '/tracks';

  nested() {
    return {
      user: User,
      artwork_url: SoundcloudImageModel
    };
  }

  getResourceUrl(): string {
    return `${this.get('stream_url')}?client_id=${this.clientId}`;
  }
}
