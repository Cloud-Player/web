import {Injectable} from '@angular/core';
import {Playlist} from '../../playlists/models/playlist.model';
import {Track} from '../../tracks/models/track.model';

@Injectable()
export class AuthenticatedUserPlaylistTrack extends Track {
  endpoint = '/me/playlists';

  destroy() {
    if(this.collection){
      this.collection.remove(this);
    }
  };
}
