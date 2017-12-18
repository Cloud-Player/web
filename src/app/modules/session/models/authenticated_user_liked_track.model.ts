import {TrackSoundcloud} from '../../tracks/models/track-soundcloud';

export class AuthenticatedUserLikedTrack extends TrackSoundcloud {
  endpoint = '/me/favorites';
}
