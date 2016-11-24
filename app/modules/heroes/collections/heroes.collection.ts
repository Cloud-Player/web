import {Hero} from '../models/hero.model';
import {Injectable} from '@angular/core';
import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {Model} from 'backbone';

@Injectable()
export class Heroes extends BaseCollection<Model> {
    url = 'http://api.soundcloud.com/tracks';
    model = Hero;
    queryParams = {
        q: 'bedouin'
    }
}
