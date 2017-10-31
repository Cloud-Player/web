import {Injectable} from '@angular/core';
import {Track} from '../../tracks/models/track.model';
import {AuthenticatedUserLikedTrack} from '../models/authenticated_user_liked_track.model';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';

export class AuthenticatedUserLikedTracks<TModel extends Track> extends SoundcloudCollection<TModel> {
  endpoint = '/me/favorites';
  model = AuthenticatedUserLikedTrack;
}
