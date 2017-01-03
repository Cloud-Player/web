import {Injectable} from '@angular/core';
import {authenticated} from '../decorators/authenticated.decorator';
import {Playlists} from '../../playlists/collections/playlists.collection';
import {AuthenticatedUserPlaylist} from '../models/authenticated_user_playlist.model';

@Injectable()
@authenticated
export class AuthenticatedUserPlaylists extends Playlists {
  endpoint = '/me/playlists';
  model = AuthenticatedUserPlaylist
}
