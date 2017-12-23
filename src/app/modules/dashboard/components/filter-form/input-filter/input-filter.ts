import {AbstractFilterComponent} from '../abstract-filter/abstract-filter';
import {Component, Input, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FilterFormComponent} from '../filter-form';

@Component({
  selector: 'app-input-filter',
  styleUrls: ['./input-filter.scss'],
  templateUrl: './input-filter.html'
})
export class InputFilterComponent extends AbstractFilterComponent {
  @ViewChild('ngControl')
  protected ngControl: NgControl;

  @Input()
  public type: string;

  constructor(protected filterForm: FilterFormComponent) {
    super();
  }
}
