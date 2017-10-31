import {NestedModel} from './nested.model';
import {Selectable} from './selectable';
import {isUndefined} from 'underscore';

export class SelectableModel extends NestedModel {

  selectable: Selectable;

  selectableOptions(): any {
    return {
      selected: false,
      isDisabled: null
    };
  }

  selectableModelConstructor(options: any = {}) {
    if (isUndefined(options.selectable) || options.selectable) {
      this.selectable = new Selectable(this, this.selectableOptions.call(this, options));
    }
  }

  constructor(attributes?: any, options: any = {}) {
    super(attributes, options);
    this.selectableModelConstructor(options);
  }

}
