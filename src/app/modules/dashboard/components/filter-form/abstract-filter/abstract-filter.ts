import {AfterContentInit, Component, Injectable, Input} from '@angular/core';
import {FilterFormComponent} from '../filter-form';
import {NgControl} from '@angular/forms';

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
  }
}
