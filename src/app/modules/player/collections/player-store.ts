import {BaseCollection} from '../../backbone/collections/base.collection';
import {PlayerStoreItem} from '../models/player-store-item';

export class PlayerStore<TModel extends PlayerStoreItem> extends BaseCollection<TModel> {
  model: any = PlayerStoreItem;
}
