import {IAuthenticatedUserAccount} from './authenticated-user-account.interface';
import {AccountSoundcloudModel} from '../../account/account-soundcloud.model';
import {nested} from '../../../backbone/decorators/nested.decorator';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';
import {AuthenticatedUserPlaylistSoundcloudModel} from '../playlist/authenticated-user-playlist-soundcloud.model';
import {AuthenticatedUserPlaylistsSoundcloudCollection} from '../playlist/authenticated-user-playlists-soundcloud.collection';
import {AuthenticatedUserPlaylistCloudplayerModel} from '../playlist/authenticated-user-playlist-cloudplayer.model';
import {FavouriteTracksSoundcloudModel} from '../../favourite-tracks/favourite-tracks-soundcloud.model';

export class AuthenticatedUserAccountSoundcloudModel
  extends AccountSoundcloudModel implements IAuthenticatedUserAccount {
  public loginUrl = `${this.hostName()}/soundcloud`;

  endpoint: '/users';

  @attributesKey('playlists')
  @nested()
  playlists: AuthenticatedUserPlaylistsSoundcloudCollection<AuthenticatedUserPlaylistSoundcloudModel>;

  @attributesKey('favouriteTracks')
  @nested()
  favouriteTracks: FavouriteTracksSoundcloudModel;

  createNewPlaylist(title: string, isPublic: boolean = false) {
    const playlist = new AuthenticatedUserPlaylistCloudplayerModel();
    playlist.title = title;
    playlist.isPublic = isPublic;
    this.playlists.add(playlist);
    return playlist.save();
  }
}
