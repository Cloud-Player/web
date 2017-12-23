import {AfterContentInit, Component, Input, OnInit, ViewChild} from '@angular/core';

import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filter-form',
  styleUrls: ['./filter-form.scss'],
  templateUrl: './filter-form.html'
  // animations: [
  //   trigger('visibilityChanged', [
  //     state('true', style({height: '*', marginBottom: '15px', padding: '15px',})),
  //     state('false', style({height: 0, marginBottom: 0, padding: 0, display: 'none'})),
  //     state('void', style({height: 0, marginBottom: 0, padding: 0, display: 'none'})),
  //     transition('* => *', animate('200ms ease-in-out'))
  //   ])
  // ]
})
export class FilterFormComponent implements OnInit {
  private hasBeenChanged = false;
  public showFilterForm = false;

  @Input()
  public collection: BaseCollection<BaseModel>;

  constructor(private userAnalyticsService: UserAnalyticsService) {
  }

  public toggleFilterForm(): void {
    if (this.showFilterForm) {
      this.userAnalyticsService.trackEvent('close_filter_form', 'click', 'app-search-filter-cmp');
      this.showFilterForm = false;
    } else {
      this.userAnalyticsService.trackEvent('open_filter_form', 'click', 'app-search-filter-cmp');
      this.showFilterForm = true;
    }
  }

  public setFilter(property: string, value: any): void {
    if (value !== this.collection.queryParams[property]) {
      this.userAnalyticsService.trackEvent(`filter_${property}`, 'click', 'app-search-filter-cmp');
      this.collection.queryParams[property] = value;
      this.hasBeenChanged = true;
    }
  }

  public fetchCollection(): void {
    if (this.hasBeenChanged) {
      this.collection.fetch({reset: true});
      this.hasBeenChanged = false;
    }
  }

  ngOnInit() {
  }
}
