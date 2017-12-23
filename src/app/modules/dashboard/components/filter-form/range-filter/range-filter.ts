import {AbstractFilterComponent} from '../abstract-filter/abstract-filter';
import {Component, Input, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FilterFormComponent} from '../filter-form';

@Component({
  selector: 'app-range-filter',
  styleUrls: ['./range-filter.scss'],
  templateUrl: './range-filter.html'
})
export class RangeFilterComponent extends AbstractFilterComponent {
  @ViewChild('ngControl')
  protected ngControl: NgControl;

  @Input()
  public min: number;

  @Input()
  public max: number;

  @Input()
  public step: number;

  @Input()
  transformDisplayValue: Function;

  constructor(protected filterForm: FilterFormComponent) {
    super();
  }
}
