import {Track} from '../../tracks/models/track.model';

export class AuthenticatedUserLikedTrack extends Track {
  endpoint = '/me/favorites';
}
