import {Track} from '../models/track.model';
import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';

@Injectable()
export class Tracks<TModel extends Track> extends SoundcloudCollection<TModel> {
  endpoint = '/tracks';
  model: any = Track;
  queryParams = {
    q: 'bedouin',
    limit: 200,
    'duration[from]': 1
  };

  refresh() {
    if (this.length > 0) {
      return this.fetch(<any>{
        search: {
          ids: this.pluck('id'),
          q: null,
          limit: 100
        }
      });
    }
  }
}
