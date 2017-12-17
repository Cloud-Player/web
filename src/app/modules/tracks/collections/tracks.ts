import {Track} from '../models/track';
import {BaseCollection} from '../../backbone/collections/base.collection';

export class Tracks<TModel extends Track> extends BaseCollection<TModel> {

  model: any = Track;

  queryParams: {
    [key: string]: string|number
  } = {
    q: <any>null,
    limit: 200,
    'duration[from]': 1
  };

}
