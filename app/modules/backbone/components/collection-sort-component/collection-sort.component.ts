import {Component, Input} from '@angular/core';
import {BaseCollection} from '../../collections/base.collection';
import {BaseModel} from '../../models/base.model';

@Component({
  moduleId: module.id,
  selector: 'collection-sort',
  templateUrl: 'collection-sort.template.html',
  styleUrls: ['collection-sort.style.css']
})

export class CollectionSortComponent {
  @Input() collection: BaseCollection<BaseModel>;

  @Input() comparator: string;

  @Input() label: string;

  sortDesc: boolean = true;

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
      if (this.collection.comparator !== this.comparator) {
        this.collection.sortOrder = null;
        this.collection.comparator = this.comparator;
      }
      if (!this.collection.sortOrder || this.collection.sortOrder === 'ASC') {
        this.collection.sortDescending();
      } else {
        this.collection.sortAscending();
      }
    } else if (this.collection.comparator) {
      this.collection.comparator = null;
      this.collection.fetch();
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
