import {Injectable} from '@angular/core';
import {Playlist} from '../../playlists/models/playlist.model';
import {extend} from 'underscore';
import {AuthenticatedUserPlaylistTracks} from '../collections/authenticated_user_playlist_tracks.collection';

@Injectable()
export class AuthenticatedUserPlaylist extends Playlist {
  endpoint = '/me/playlists';

  nested() {
    return extend(super.nested(), {
      tracks: AuthenticatedUserPlaylistTracks
    });
  }

  initialize() {
    this.get('tracks').on('save', () => {
      this.save();
    });
  };
}
