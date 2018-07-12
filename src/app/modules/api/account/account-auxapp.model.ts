import {IAccount} from './account.interface';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {nested} from '../../backbone/decorators/nested.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../auxapp/auxapp.model';
import {ImageAuxappModel} from '../image/image-auxapp.model';
import {PlaylistsAuxappCollection} from '../playlists/playlists-auxapp.collection';
import {PlaylistAuxappModel} from '../playlists/playlist-auxapp.model';
import {TracksAuxappCollection} from '../tracks/tracks-auxapp.collection';
import {TrackAuxappModel} from '../tracks/track-auxapp.model';

export class AccountAuxappModel extends AuxappModel implements IAccount {

  endpoint = '/account';

  @attributesKey('provider_id')
  @defaultValue('auxapp')
  provider: string;

  @attributesKey('image')
  @nested()
  image: ImageAuxappModel;

  @attributesKey('title')
  @defaultValue('')
  title: string;

  @attributesKey('playlists')
  @nested()
  playlists: PlaylistsAuxappCollection<PlaylistAuxappModel>;

  @attributesKey('tracks')
  @nested()
  tracks: TracksAuxappCollection<TrackAuxappModel>;

  getFullName(): string {
    return this.title;
  }
}
