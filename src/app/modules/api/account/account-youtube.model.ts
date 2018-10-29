import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TrackYoutubeModel} from '../tracks/track-youtube.model';
import {TracksYoutubeCollection} from '../tracks/tracks-youtube.collection';
import {PlaylistsYoutubeCollection} from '../playlists/playlists-youtube.collection';
import {PlaylistYoutubeModel} from '../playlists/playlist-youtube.model';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {PlaylistsSoundcloudCollection} from '../playlists/playlists-soundcloud.collection';
import {PlaylistSoundcloudModel} from '../playlists/playlist-soundcloud.model';
import {TracksSoundcloudCollection} from '../tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../tracks/track-soundcloud.model';

export class AccountYoutubeModel extends AuxappModel implements IAccount {

  endpoint = '/account';

  @attributesKey('provider_id')
  @defaultValue('youtube')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsYoutubeCollection<PlaylistYoutubeModel>;

  @attributesKey('tracks')
  @nested()
  tracks: TracksYoutubeCollection<TrackYoutubeModel>;

  getFullName(): string {
    return this.title;
  }
}
