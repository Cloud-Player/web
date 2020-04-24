import {Comments} from '../../comments/collections/comments.collection';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {Comment} from '../../comments/models/comment.model';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {ITrack} from './track.interface';
import {TrackAuxappModel} from './track-auxapp.model';
import {environment} from '../../../../environments/environment';

export class TrackSoundcloudModel extends TrackAuxappModel implements ITrack {
  endpoint = '/track/soundcloud';

  @attributesKey('provider_id')
  @defaultValue('soundcloud')
  provider_id: string;

  @attributesKey('comments')
  @nested()
  comments: Comments<Comment>;

  getResourceUrl(): string {
    return `https://api.soundcloud.com/tracks/${this.id}/stream?client_id=${environment.clientIdSc}`;
  }

  clone() {
    return new TrackSoundcloudModel(this.toMiniJSON());
  }

  initialize() {
    if (this.get('id')) {
      this.comments.setTrackId(this.id);
    }
    this.on('change:id', () => {
      this.comments.setTrackId(this.id);
    });
  }
}
