import {Injectable} from '@angular/core';
import {Playlist} from '../../playlists/models/playlist.model';
import {extend} from 'underscore';
import {AuthenticatedUserPlaylistTracks} from '../collections/authenticated_user_playlist_tracks.collection';

export class AuthenticatedUserPlaylist extends Playlist {
  endpoint = '/me/playlists';

  nested() {
    return extend(super.nested(), {
      tracks: AuthenticatedUserPlaylistTracks
    });
  }

  private setTracksEndpoint() {
    if (this.id) {
      this.get('tracks').setEndpoint(this.id);
    }
  }

  initialize() {
    this.get('tracks').on('save', () => {
      this.save();
    });

    this.setTracksEndpoint();
    this.on('change:id', this.setTracksEndpoint, this);
  }
}
