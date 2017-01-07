import {Injectable} from '@angular/core';
import {authenticated} from '../decorators/authenticated.decorator';
import {AuthenticatedUserLikedTrack} from '../models/authenticated_user_liked_track.model';
import {SoundcloudCollection} from '../../main/collections/soundcloud.collection';
import {Track} from '../../tracks/models/track.model';

@Injectable()
@authenticated
export class AuthenticatedUserLikedTracks extends SoundcloudCollection {
  endpoint = '/me/favorites';
  model = Track;
}
