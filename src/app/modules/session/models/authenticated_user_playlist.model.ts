import {Playlist} from '../../playlists/models/playlist.model';
import {AuthenticatedUserPlaylistTracks} from '../collections/authenticated_user_playlist_tracks.collection';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {AuthenticatedUserPlaylistTrack} from './authenticated_user_playlist_track.model';
import {nested} from '../../backbone/decorators/nested.decorator';

export class AuthenticatedUserPlaylist extends Playlist {
  endpoint = '/me/playlists';

  @attributesKey('tracks')
  @nested()
  tracks: AuthenticatedUserPlaylistTracks<AuthenticatedUserPlaylistTrack>

  private setTracksEndpoint() {
    if (this.id) {
      this.tracks.setEndpoint(this.id);
    }
  }

  initialize() {
    this.tracks.on('save', () => {
      this.save();
    });

    this.setTracksEndpoint();
    this.on('change:id', this.setTracksEndpoint, this);
  }
}
