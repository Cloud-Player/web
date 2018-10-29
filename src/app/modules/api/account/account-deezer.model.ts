import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {TrackYoutubeModel} from '../tracks/track-youtube.model';
import {TracksYoutubeCollection} from '../tracks/tracks-youtube.collection';
import {PlaylistDeezerModel} from '../playlists/playlist-deezer.model';
import {PlaylistsDeezerCollection} from '../playlists/playlists-deezer.collection';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {PlaylistsSoundcloudCollection} from '../playlists/playlists-soundcloud.collection';
import {PlaylistSoundcloudModel} from '../playlists/playlist-soundcloud.model';
import {TracksSoundcloudCollection} from '../tracks/tracks-soundcloud.collection';
import {TrackSoundcloudModel} from '../tracks/track-soundcloud.model';
import {TrackDeezerModel} from '../tracks/track-deezer.model';
import {TracksDeezerCollection} from '../tracks/tracks-deezer.collection';

export class AccountDeezerModel extends AuxappModel implements IAccount {
  endpoint = '/account';

  @attributesKey('provider_id')
  @defaultValue('deezer')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsDeezerCollection<PlaylistDeezerModel>;

  @attributesKey('tracks')
  @nested()
  tracks: TracksDeezerCollection<TrackDeezerModel>;

  getFullName(): string {
    return this.title;
  }
}
