import {Track} from '../models/track.model';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';

export class Tracks<TModel extends Track> extends SoundcloudCollection<TModel> {
  endpoint = '/tracks';
  model: any = Track;
  queryParams = {
    q: <any>null,
    limit: 200,
    'duration[from]': 1
  };

  refresh() {
    return this.fetch(<any>{
      params: {
        ids: this.pluck('id'),
        q: null,
        limit: 100
      }
    });
  }
}
