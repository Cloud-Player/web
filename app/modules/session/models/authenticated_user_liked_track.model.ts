import {Injectable} from '@angular/core';
import {authenticated} from '../decorators/authenticated.decorator';
import {Track} from '../../tracks/models/track.model';

@Injectable()
@authenticated
export class AuthenticatedUserLikedTrack extends Track {
  endpoint = '/me/favorites';
}
