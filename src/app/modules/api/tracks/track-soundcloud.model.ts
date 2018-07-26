import {Comments} from '../../comments/collections/comments.collection';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {Comment} from '../../comments/models/comment.model';
import {Globals} from '../../../../globals';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {SoundcloudProxyModel} from '../soundcloud/soundcloud-proxy.model';
import {ITrack} from './track.interface';
import {ImageSoundcloudModel} from '../image/image-soundcloud.model';
import {ArtistSoundcloudModel} from '../artist/artist-soundcloud.model';
import {TrackAuxappModel} from './track-auxapp.model';

export class TrackSoundcloudModel extends TrackAuxappModel implements ITrack{
  endpoint = '/track/soundcloud';

  @attributesKey('provider_id')
  @defaultValue('soundcloud')
  provider: string;

  @attributesKey('comments')
  @nested()
  comments: Comments<Comment>;

  getResourceUrl(): string {
    return `https://api.soundcloud.com/tracks/${this.id}/stream?client_id=${Globals.soundcloudClientId}`;
  }

  clone() {
    return new TrackSoundcloudModel(this.toMiniJSON());
  }
}
