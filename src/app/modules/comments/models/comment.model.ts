import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {SoundcloudProxyModel} from '../../api/soundcloud/soundcloud-proxy.model';
import {BaseModel} from '../../backbone/models/base.model';
import {ArtistSoundcloudModel} from '../../api/artist/artist-soundcloud.model';

export class Comment extends SoundcloudProxyModel {
  endpoint = '/comments';

  @attributesKey('user')
  @nested()
  user: ArtistSoundcloudModel;

  @attributesKey('timestamp')
  timestamp: number;

  @attributesKey('body')
  body: string;
}
