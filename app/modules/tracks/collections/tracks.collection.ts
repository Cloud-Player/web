import {Track} from '../models/track.model';
import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../main/collections/soundcloud.collection';
import {Model} from 'backbone';

@Injectable()
export class Tracks<TModel extends Track> extends SoundcloudCollection<TModel> {
    endpoint = '/tracks';
    model: any = Track;
    queryParams = {
        q: 'bedouin',
        limit: 10
    };
}
