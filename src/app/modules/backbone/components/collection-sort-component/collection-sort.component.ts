import {Component, Input, OnInit} from '@angular/core';
import {BaseCollection} from '../../collections/base.collection';
import {BaseModel} from '../../models/base.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-collection-sort',
  styleUrls: ['./collection-sort.style.scss'],
  templateUrl: './collection-sort.template.html'
})

export class CollectionSortComponent implements OnInit {
  @Input() collection: BaseCollection<BaseModel>;

  @Input() comparator: string;

  @Input() label: string;

  sortDesc = true;

  constructor(private userAnalyticsService: UserAnalyticsService) {
  }

  isSorted(): boolean {
    return this.collection &&
      (
        (this.collection.comparator === this.comparator) ||
        (!this.comparator && !this.collection.comparator)
      );
  }

  sort(): void {
    if (this.comparator) {
      if (this.collection.length < 2) {
        return;
      }

      this.comparator = this.collection.getMappedComparatorKey(this.comparator);

      if (this.collection.comparator !== this.comparator) {
        this.collection.sortOrder = null;
        this.collection.comparator = this.comparator;
      }
      if (!this.collection.sortOrder || this.collection.sortOrder === 'ASC') {
        this.collection.sortDescending();
        this.userAnalyticsService.trackEvent('sort', `${this.collection.comparator}_desc`, 'app-collection-sort-cmp');
      } else {
        this.collection.sortAscending();
        this.userAnalyticsService.trackEvent('sort', `${this.collection.comparator}_asc`, 'app-collection-sort-cmp');
      }
    } else if (this.collection.comparator) {
      this.collection.comparator = null;
      this.collection.fetch();
      this.userAnalyticsService.trackEvent('sort', 'reset', 'app-collection-sort-cmp');
    }
  }

  ngOnInit() {
    this.collection.on('sync', () => {
      if (this.isSorted() && this.comparator) {
        this.collection.sortDescending();
      }
    });
  }
}
