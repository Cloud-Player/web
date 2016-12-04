import {Track} from '../models/track.model';
import {Injectable} from '@angular/core';
import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {Model} from 'backbone';

@Injectable()
export class Tracks extends BaseCollection<Model> {
    url = '//api.soundcloud.com/tracks';
    model = Track;
    queryParams = {
        q: 'bedouin'
    };
}
