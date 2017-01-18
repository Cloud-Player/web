import {Injectable} from '@angular/core';
import {Playlist} from '../../playlists/models/playlist.model';
import {Track} from '../../tracks/models/track.model';
import {AuthenticatedUserPlaylistTracks} from '../collections/authenticated_user_playlist_tracks.collection';

@Injectable()
export class AuthenticatedUserPlaylistTrack extends Track {
  endpoint = '/me/playlists';
  collection: AuthenticatedUserPlaylistTracks<AuthenticatedUserPlaylistTrack>;

  destroy() {
    if(this.collection){
      let collection = this.collection;
      collection.remove(this);
      collection.triggerSave(this);
    }
  };

  save(){
    if(this.collection){
      this.collection.add(this.toJSON(), {merge: true});
      this.collection.triggerSave(this);
    }
  }
}
