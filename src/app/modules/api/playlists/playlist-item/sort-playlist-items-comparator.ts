import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';

export class SortPlaylistItemsComparator {
  public static sortItems(collection: BaseCollection<BaseModel>, by: any) {
    return (model) => {
      if (typeof by === 'string' && by.match(/track\.\w*/)) {
        const comparators = by.split('.');
        const comparator = collection.getMappedComparatorKey(comparators[1]);
        return model.track[comparator];
      } else {
        return model.get(by);
      }
    };
  }
}
