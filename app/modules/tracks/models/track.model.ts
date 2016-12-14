import {SoundcloudModel} from '../../main/models/soundcloud.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Track extends SoundcloudModel {
  endpoint = '/tracks';

  nested() {
    return {
      user: SoundcloudModel
    };
  }

  defaults() {
    return {
      name: ''
    };
  }

  validate(attrs: any) {
    attrs.name = attrs.name.trim();
    if (!attrs.name) {
      return 'Name is required';
    }
  }

  getResourceUrl(): string {
    return `${this.get('stream_url')}?client_id=${this.clientId}`;
  }
}
