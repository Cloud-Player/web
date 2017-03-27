import {Track} from '../models/track.model';
import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';

@Injectable()
export class Tracks<TModel extends Track> extends SoundcloudCollection<TModel> {
  endpoint = '/tracks';
  model: any = Track;
  queryParams = {
    q: <any>null,
    limit: 100,
    'duration[from]': 1
  };

  refresh() {
    return this.fetch(<any>{
      search: {
        ids: this.pluck('id'),
        q: null,
        limit: 100
      }
    });
  }
}
