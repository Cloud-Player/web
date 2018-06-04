import {AfterContentInit, Input} from '@angular/core';
import {FilterFormComponent, FilterFormStatusTypes} from '../filter-form';
import {NgControl} from '@angular/forms';
import {filter} from 'rxjs/internal/operators';

export abstract class AbstractFilterComponent implements AfterContentInit {
  protected abstract ngControl: NgControl;
  protected abstract filterForm: FilterFormComponent;

  value: string | number | boolean;

  @Input()
  public filterProperty: string;

  @Input()
  public label: string;

  ngAfterContentInit(): void {
    this.value = this.filterForm.collection.queryParams[this.filterProperty];
    this.ngControl.valueChanges.subscribe((value: any) => {
      this.filterForm.setFilter(this.filterProperty, value);
      this.filterForm.fetchCollection();
    });

    this.filterForm.status
      .pipe(
        filter(ev => ev === FilterFormStatusTypes.Reset)
      )
      .subscribe(() => {
        this.value = this.filterForm.collection.queryParams[this.filterProperty];
        this.ngControl.valueAccessor.writeValue(this.value);
      });
  }
}
