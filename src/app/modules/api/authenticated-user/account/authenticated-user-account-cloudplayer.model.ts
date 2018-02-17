import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {AccountCloudplayerModel} from '../../account/account-cloudplayer.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../../backbone/decorators/default-value.decorator';
import {AuthenticatedUserPlaylistCloudplayerModel} from '../playlist/authenticated-user-playlist-cloudplayer.model';
import {AuthenticatedUserPlaylistsCloudplayerCollection} from '../playlist/authenticated-user-playlists-cloudplayer.collection';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {FavouriteTracksCloudplayerModel} from '../../favourite-tracks/favourite-tracks-cloudplayer.model';

export class AuthenticatedUserAccountCloudplayerModel
  extends AccountCloudplayerModel implements IAuthenticatedUserAccount {

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
  playlists: AuthenticatedUserPlaylistsCloudplayerCollection<AuthenticatedUserPlaylistCloudplayerModel>;

  @attributesKey('favourite')
  @nested()
  favouriteTracks: FavouriteTracksCloudplayerModel;

  initialize(): void {
    if (this.id) {
      this.playlists.setEndpoint(this.id);
    }
    this.on('change:id', () => {
      this.playlists.setEndpoint(this.id);
      //this.favouriteTracks.setEndpoint(this.id);
    });
  }

  createNewPlaylist(title: string, isPublic: boolean = false) {
    const playlist = new AuthenticatedUserPlaylistCloudplayerModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    playlist.accountId = this.id;
    this.playlists.add(playlist);
    return playlist.save();
  }

  parse(attributes) {
    if (attributes.title === null) {
      delete attributes.title;
      attributes.tmpAccount = true;
    }
    if (!attributes.connected) {
      delete attributes.id;
    }
    return attributes;
  }
}
