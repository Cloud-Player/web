import {User} from '../../users/models/user.model';
import {AuthenticatedUserLikedTracks} from '../collections/authenticated_user_liked_tracks.collection';
import {AuthenticatedUserPlaylists} from '../collections/authenticated_user_playlists.collection';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {AuthenticatedUserPlaylist} from './authenticated_user_playlist.model';
import {AuthenticatedUserLikedTrack} from './authenticated_user_liked_track.model';
import {nested} from '../../backbone/decorators/nested.decorator';

export class AuthenticatedUser extends User {
  endpoint = '/me';

  @attributesKey('authenticated')
  @defaultValue(false)
  authenticated: boolean;

  @attributesKey('playlists')
  @nested()
  playlists: AuthenticatedUserPlaylists<AuthenticatedUserPlaylist>;

  @attributesKey('likes')
  @nested()
  likes: AuthenticatedUserLikedTracks<AuthenticatedUserLikedTrack>;
}
