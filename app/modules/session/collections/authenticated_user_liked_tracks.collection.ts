import {Injectable} from '@angular/core';
import {authenticated} from '../decorators/authenticated.decorator';
import {SoundcloudCollection} from '../../main/collections/soundcloud.collection';
import {Track} from '../../tracks/models/track.model';
import {AuthenticatedUserLikedTrack} from '../models/authenticated_user_liked_track.model';

@Injectable()
@authenticated
export class AuthenticatedUserLikedTracks<TModel extends Track> extends SoundcloudCollection<TModel> {
  endpoint = '/me/favorites';
  model = AuthenticatedUserLikedTrack;
}
