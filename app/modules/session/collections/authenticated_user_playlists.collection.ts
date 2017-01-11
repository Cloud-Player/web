import {Injectable} from '@angular/core';
import {authenticated} from '../decorators/authenticated.decorator';
import {Playlists} from '../../playlists/collections/playlists.collection';
import {AuthenticatedUserPlaylist} from '../models/authenticated_user_playlist.model';

@Injectable()
@authenticated
export class AuthenticatedUserPlaylists<TModel extends AuthenticatedUserPlaylist> extends Playlists<TModel> {
  endpoint = '/me/playlists';
  model: any = AuthenticatedUserPlaylist;
}
