import {Injectable} from '@angular/core';
import {Playlist} from '../../playlists/models/playlist.model';
import {authenticated} from '../decorators/authenticated.decorator';

@Injectable()
@authenticated
export class AuthenticatedUserPlaylist extends Playlist {
  endpoint = '/me/playlists';

  initialize() {
    this.get('tracks').on('add remove', () => {
      this.save();
    });
  };
}
