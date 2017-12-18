import {AuthenticatedUserLikedTrack} from '../models/authenticated_user_liked_track.model';
import {SoundcloudCollection} from '../../shared/collections/soundcloud';
import {TrackSoundcloud} from '../../tracks/models/track-soundcloud';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {TracksSoundcloud} from '../../tracks/collections/tracks-soundcloud';

export class AuthenticatedUserLikedTracks<TModel extends TrackSoundcloud> extends TracksSoundcloud<TModel> {
  endpoint = '/me/favorites';
  model = AuthenticatedUserLikedTrack;
}
