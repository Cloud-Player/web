import {Comment} from '../models/comment.model';
import {AuxappCollection} from '../../api/auxapp/auxapp.collection';

export class Comments<TModel extends Comment> extends AuxappCollection<TModel> {
  model: any = Comment;
  comparator = 'timestamp';

  setTrackId(trackId: string): void {
    this.endpoint = `track/soundcloud/${trackId}/comment`;
  }
}

