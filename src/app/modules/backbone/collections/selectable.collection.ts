import {Collection} from 'backbone';
import {isUndefined} from 'underscore';
import {Selectable} from './selectable';
import {SelectableModel} from '../models/selectable.model';

export class SelectableCollection<TModel extends SelectableModel> extends Collection<TModel> {
  model: any;

  selectable: Selectable;

  selectableOptions() {
    return {
      isSingleSelection: false,
      addPreSelectedToCollection: false,
      unSelectOnRemove: false,
      preSelected: new SelectableCollection(null, {selectable: false})
    };
  }

  selectableCollectionConstructor(options: any = {}) {
    if (isUndefined(options.selectable) || options.selectable) {
      this.selectable = new Selectable(this, this.selectableOptions.call(this, options));
    }
  }

  constructor(models?: TModel[] | Object[], options?: any) {
    super();
    this.selectableCollectionConstructor(options);
  }
}


