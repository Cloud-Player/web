import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {debounce} from 'underscore';

export enum FilterFormStatusTypes {
  Searching,
  Reset
}

@Component({
  selector: 'app-filter-form',
  styleUrls: ['./filter-form.scss'],
  templateUrl: './filter-form.html'
})
export class FilterFormComponent implements OnInit, OnDestroy {
  private hasBeenChanged = false;
  private setFilterProperties: string[] = [];
  public debouncedFetchCollection: Function;

  @Input()
  public collection: BaseCollection<BaseModel>;

  @Output()
  public status: EventEmitter<FilterFormStatusTypes>;

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this.status = new EventEmitter<FilterFormStatusTypes>();
    this.debouncedFetchCollection = debounce(this.fetchCollection.bind(this), 10);
  }

  public resetFilter() {
    this.setFilterProperties.forEach((property) => {
      this.hasBeenChanged = true;
      this.collection.queryParams[property] = null;
    });
    this.setFilterProperties = [];
    this.debouncedFetchCollection();
    this.status.emit(FilterFormStatusTypes.Reset);
    this.userAnalyticsService.trackEvent(`filter_searchresult`, `reset`, 'app-filter-form');
  }

  public setFilter(property: string, value: any): void {
    if (value !== this.collection.queryParams[property]) {
      this.collection.queryParams[property] = value;
      this.setFilterProperties.push(property);
      this.hasBeenChanged = true;
      this.userAnalyticsService.trackEvent(`filter_searchresult`, `${property}`, 'app-filter-form');
    }
  }

  public fetchCollection(): void {
    if (this.hasBeenChanged) {
      this.collection.fetch({reset: true});
      this.hasBeenChanged = false;
      this.status.emit(FilterFormStatusTypes.Searching);
    }
  }

  ngOnInit() {
    this.collection.on('reset:filter', this.resetFilter, this);
  }

  ngOnDestroy() {
    this.collection.off('reset:filter', this.resetFilter, this);
  }
}
