import {Injectable} from '@angular/core';
import {Track} from '../../tracks/models/track.model';
import {AuthenticatedUserPlaylistTracks} from '../collections/authenticated_user_playlist_tracks.collection';

export class AuthenticatedUserPlaylistTrack extends Track {
  endpoint = '/me/playlists';
  collection: AuthenticatedUserPlaylistTracks<AuthenticatedUserPlaylistTrack>;

  destroy() {
    if (this.collection) {
      const collection = this.collection;
      collection.remove(this);
      collection.triggerSave(this);
    }
  }

  save() {
    if (this.collection) {
      this.collection.add(this.toJSON(), {merge: true});
      this.collection.triggerSave(this);
    }
  }
}
