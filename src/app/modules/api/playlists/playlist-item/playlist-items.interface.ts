import {IPlaylistItem, IPlaylistItemModelConstructor} from './playlist-item.interface';
import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';

export interface IPlaylistItems<TModel extends IPlaylistItem> extends BaseCollection<BaseModel> {
  model: IPlaylistItemModelConstructor;
  hasCreatedAttribute: boolean;
}
