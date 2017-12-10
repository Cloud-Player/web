import {ToastModel} from '../models/toast';
import {BaseCollection} from '../../backbone/collections/base.collection';

export class Toasts<TModel extends ToastModel> extends BaseCollection<TModel> {
  model: any = ToastModel;
}


