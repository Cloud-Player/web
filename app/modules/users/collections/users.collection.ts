import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../main/collections/soundcloud.collection';
import {Model} from 'backbone';
import {User} from '../models/user.model';

@Injectable()
export class Users extends SoundcloudCollection<Model> {
    endpoint = '/users';
    model = User;
}
