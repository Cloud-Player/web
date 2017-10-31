import {Component, Input} from '@angular/core';

import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';
import {HumanReadableSecondsPipe} from '../../../shared/pipes/h-readable-seconds.pipe';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-search-filter',
  styleUrls: ['./search-filter.style.scss'],
  templateUrl: './search-filter.template.html'
  // animations: [
  //   trigger('visibilityChanged', [
  //     state('true', style({height: '*', marginBottom: '15px', padding: '15px',})),
  //     state('false', style({height: 0, marginBottom: 0, padding: 0, display: 'none'})),
  //     state('void', style({height: 0, marginBottom: 0, padding: 0, display: 'none'})),
  //     transition('* => *', animate('200ms ease-in-out'))
  //   ])
  // ]
})

export class SearchFilterComponent {
  private humanReadableSecPipe: HumanReadableSecondsPipe;
  public showFilterForm = false;

  public transformProgressBarValues = function (input: any) {
    return this.humanReadableSecPipe.transform(input / 1000, null);
  }.bind(this);

  @Input()
  public collection: BaseCollection<BaseModel>;

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this.humanReadableSecPipe = new HumanReadableSecondsPipe();
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

  public transformDuration(input: string = ''): string {
    return this.humanReadableSecPipe.transform(input, null);
  }

  public reFetch(changedAttr?: string): void {
    this.collection.fetch({reset: true});
    this.userAnalyticsService.trackEvent(`filter_${changedAttr}`, 'click', 'app-search-filter-cmp');
  }
}
