import {Injectable} from '@angular/core';
import {User} from '../../users/models/user.model';
import {extend} from 'underscore';
import {AuthenticatedUserLikedTracks} from '../collections/authenticated_user_liked_tracks.collection';
import {AuthenticatedUserPlaylists} from '../collections/authenticated_user_playlists.collection';

export class AuthenticatedUser extends User {
  endpoint = '/me';

  nested() {
    return extend(super.nested(), {
      playlists: AuthenticatedUserPlaylists,
      likes: AuthenticatedUserLikedTracks
    });
  }

  defaults() {
    return extend(super.defaults(), {
      authenticated: false
    });
  }

}
