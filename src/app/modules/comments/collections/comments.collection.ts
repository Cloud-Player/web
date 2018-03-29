import {Comment} from '../models/comment.model';
import {SoundcloudProxyCollection} from '../../api/soundcloud/soundcloud-proxy.collection';

export class Comments<TModel extends Comment> extends SoundcloudProxyCollection<TModel> {
  endpoint = '/comments';
  model: any = Comment;
  comparator = 'timestamp';

  setTrackId(trackId: string): void {
    this.endpoint = `/tracks/${trackId}/comments`;
  }
}

