import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';

export class Users<TModel extends User> extends SoundcloudCollection<TModel> {
  endpoint = '/users';
  model: any = User;
}
