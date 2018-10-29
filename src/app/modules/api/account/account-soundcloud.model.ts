import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TracksSoundcloudCollection} from '../tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../tracks/track-soundcloud.model';
import {PlaylistSoundcloudModel} from '../playlists/playlist-soundcloud.model';
import {PlaylistsSoundcloudCollection} from '../playlists/playlists-soundcloud.collection';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {PlaylistsAuxappCollection} from '../playlists/playlists-auxapp.collection';
import {PlaylistAuxappModel} from '../playlists/playlist-auxapp.model';
import {TracksAuxappCollection} from '../tracks/tracks-auxapp.collection';
import {TrackAuxappModel} from '../tracks/track-auxapp.model';

export class AccountSoundcloudModel extends AuxappModel implements IAccount {

  endpoint = '/account';

  @attributesKey('provider_id')
  @defaultValue('soundcloud')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsSoundcloudCollection<PlaylistSoundcloudModel>;

  @attributesKey('tracks')
  @nested()
  tracks: TracksSoundcloudCollection<TrackSoundcloudModel>;

  getFullName(): string {
    return this.title;
  }
}
