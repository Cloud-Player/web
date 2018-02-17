import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {ImageSoundcloudModel} from '../image/image-soundcloud.model';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TracksSoundcloudCollection} from '../tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../tracks/track-soundcloud.model';
import {PlaylistSoundcloudModel} from '../playlists/playlist-soundcloud.model';
import {PlaylistsSoundcloudCollection} from '../playlists/playlists-soundcloud.collection';
import {SoundcloudProxyModel} from '../soundcloud/soundcloud-proxy.model';

export class AccountSoundcloudModel extends SoundcloudProxyModel implements IAccount {

  endpoint = '/users';

  @attributesKey('provider')
  @defaultValue('soundcloud')
  provider: string;

  @attributesKey('avatar_url')
  @nested()
  image: ImageSoundcloudModel;

  @attributesKey('username')
  @defaultValue('')
  username: string;

  @attributesKey('full_name')
  @defaultValue('')
  fullName: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsSoundcloudCollection<PlaylistSoundcloudModel>;

  @attributesKey('tracks')
  @nested()
  tracks: TracksSoundcloudCollection<TrackSoundcloudModel>;

  getFullName(): string {
    return this.fullName || this.username;
  }
}
