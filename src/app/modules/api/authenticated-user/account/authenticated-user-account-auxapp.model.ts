import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {AccountAuxappModel} from '../../account/account-auxapp.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AuthenticatedUserPlaylistAuxappModel} from '../playlist/authenticated-user-playlist-auxapp.model';
import {AuthenticatedUserPlaylistsAuxappCollection} from '../playlist/authenticated-user-playlists-auxapp.collection';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {FavouriteTracksAuxappModel} from '../../favourite-tracks/favourite-tracks-auxapp.model';
import {SessionsCollection} from '../sessions/sessions.collection';
import {SessionModel} from '../sessions/session.model';

export class AuthenticatedUserAccountAuxappModel
  extends AccountAuxappModel implements IAuthenticatedUserAccount {

  public loginUrl = null;

  endpoint = '/user/me';

  @attributesKey('title')
  @defaultValue('Guest')
  title: string;

  @attributesKey('tmpAccount')
  @defaultValue(false)
  tmpAccount: boolean;

  @attributesKey('playlists')
  @nested()
  playlists: AuthenticatedUserPlaylistsAuxappCollection<AuthenticatedUserPlaylistAuxappModel>;

  @attributesKey('favourite')
  @nested()
  favouriteTracks: FavouriteTracksAuxappModel;

  @attributesKey('connected')
  @defaultValue(false)
  connected: boolean;

  @attributesKey('sessions')
  @nested()
  sessions: SessionsCollection<SessionModel>;

  initialize(): void {
    if (this.id) {
      this.playlists.setEndpoint(this.id);
    }
    this.on('change:id', () => {
      this.playlists.setEndpoint(this.id);
      this.sessions.setEndpoint(this.id);
    });
  }

  createNewPlaylist(title: string, isPublic: boolean = false) {
    const playlist = new AuthenticatedUserPlaylistAuxappModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    playlist.accountId = this.id;
    this.playlists.add(playlist);
    return playlist.save();
  }

  parse(attributes) {
    if (!attributes.title) {
      delete attributes.title;
      attributes.tmpAccount = true;
    }
    if (!attributes.connected) {
      delete attributes.id;
    }
    return attributes;
  }

  isConnected() {
    return this.connected && !this.isNew();
  }
}
