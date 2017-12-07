import {BaseCollection} from '../../backbone/collections/base.collection';
import {PlayerModel} from '../models/player';

export class Players<TModel extends PlayerModel> extends BaseCollection<TModel> {
  model: any = PlayerModel;
}
