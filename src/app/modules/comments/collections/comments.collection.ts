import {Injectable} from '@angular/core';
import {SoundcloudCollection} from '../../shared/collections/soundcloud.collection';
import {Comment} from '../models/comment.model';

@Injectable()
export class Comments<TModel extends Comment> extends SoundcloudCollection<TModel> {
  endpoint = '/comments';
  model: any = Comment;
  comparator = 'timestamp';
  setTrackId(trackId: string): void{
    this.endpoint = `/tracks/${trackId}/comments`;
  }
}
