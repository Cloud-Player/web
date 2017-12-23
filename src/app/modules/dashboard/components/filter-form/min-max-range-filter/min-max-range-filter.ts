import {AbstractFilterComponent} from '../abstract-filter/abstract-filter';
import {AfterContentInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {NgControl} from '@angular/forms';
import {FilterFormComponent} from '../filter-form';
import {ITwoRangeSliderValue} from '../../../../shared/components/two-range-slider/two-range-slider.component';

@Component({
  selector: 'app-min-max-range-filter',
  styleUrls: ['./min-max-range-filter.scss'],
  templateUrl: './min-max-range-filter.html'
})
export class MinMaxRangeFilterComponent implements AfterContentInit {
  value: ITwoRangeSliderValue;

  @ViewChild('ngControl')
  protected ngControl: NgControl;

  @Input()
  public label: string;

  @Input()
  public min: number;

  @Input()
  public max: number;

  @Input()
  public step: number;

  @Input()
  transformDisplayValue: Function;

  @Input()
  public minFilterProperty: string;

  @Input()
  public maxFilterProperty: string;

  constructor(protected filterForm: FilterFormComponent) {
    this.value = {
      min: null,
      max: null
    };
  }

  ngAfterContentInit(): void {
    this.value.min = <number>this.filterForm.collection.queryParams[this.minFilterProperty];
    this.value.max = <number>this.filterForm.collection.queryParams[this.maxFilterProperty];
    this.ngControl.valueChanges.subscribe((value: ITwoRangeSliderValue) => {
      this.filterForm.setFilter(this.minFilterProperty, value.min);
      this.filterForm.setFilter(this.maxFilterProperty, value.max);
      this.filterForm.fetchCollection();
    });
  }
}
