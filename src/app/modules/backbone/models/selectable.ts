import {Events, Model} from 'backbone';
import {extend} from 'underscore';
import {SelectableModel} from './selectable.model';

export class Selectable {
  private _model: Model;
  private _selected = false;
  private _options: any;
  public isInCollection = false;
  public hasDisabledFn: boolean;
  public trigger: (name: string, options: any, context?: any) => {};
  public on: (name: string, callback: Function, context?: any) => {};
  public off: (name: string, callback: Function, context?: any) => {};


  constructor(modelInstance: SelectableModel, options: any = {}) {
    this._model = modelInstance;
    this._options = options;
    this._selected = options.selected || false;
    this.hasDisabledFn = (typeof options.isDisabled === 'function') || false;

    if (!(this._model instanceof Model)) {
      throw new Error('First parameter has to be the instance of a model');
    }
  }

  public isDisabled(): boolean {
    if (this.hasDisabledFn) {
      return this._options.isDisabled.apply(this._model, arguments);
    }
    return false;
  }

  public isSelected(): boolean {
    return this._selected;
  }

  public select(options: any = {}) {
    options = options || {};
    if ((!this.isDisabled() || options.force) && !this.isSelected()) {
      this._selected = true;
      if (!options.silent) {
        this.trigger('change change:select', this._model, this);
      }
    }
  }

  public unSelect = function (options: any = {}) {
    options = options || {};
    if (this.isSelected()) {
      this._selected = false;
      if (!options.silent) {
        this.trigger('change change:unselect', this._model, this);
      }
    }
  };

  public toggleSelect() {
    if (this.isSelected()) {
      this.unSelect();
    } else {
      this.select();
    }
  }
}

extend(Selectable.prototype, Events);
