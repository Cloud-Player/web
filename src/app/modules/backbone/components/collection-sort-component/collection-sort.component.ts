import {Component, Input, OnInit} from '@angular/core';
import {BaseCollection} from '../../collections/base.collection';
import {BaseModel} from '../../models/base.model';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import {findKey, keys, omit} from 'underscore';

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

      const model = this.collection.first();
      if (model && model.attributesMap) {
        const mappingKey = findKey(<any>model.attributesMap, (value, key) => {
          return value === this.comparator;
        });
        if (mappingKey) {
          this.comparator = mappingKey;
        }
      }

      if (this.collection.comparator !== this.comparator) {
        this.collection.sortOrder = null;
        this.collection.comparator = this.comparator;
      }
      if (!this.collection.sortOrder || this.collection.sortOrder === 'ASC') {
        this.collection.sortDescending();
        this.userAnalyticsService.trackEvent(`sort_${this.collection.comparator}_desc`, 'click', 'app-collection-sort-cmp');
      } else {
        this.collection.sortAscending();
        this.userAnalyticsService.trackEvent(`sort_${this.collection.comparator}_asc`, 'click', 'app-collection-sort-cmp');
      }
    } else if (this.collection.comparator) {
      this.collection.comparator = null;
      this.collection.fetch();
      this.userAnalyticsService.trackEvent('sort_reset', 'click', 'app-collection-sort-cmp');
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
