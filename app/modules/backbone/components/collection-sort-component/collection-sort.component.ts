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

  isDescendingSorted: boolean = false;

  isSorted(): boolean {
    return this.collection && this.collection.comparator === this.comparator;
  }

  sortDesending(): void {
    this.collection.set(this.collection.models.reverse());
  }

  sort(): void {
    if (this.comparator) {
      if (!this.isSorted()) {
        this.isDescendingSorted = false;
      }

      this.collection.comparator = this.comparator;
      this.collection.sort();

      if (!this.isDescendingSorted) {
        this.sortDesending();
      }

      this.isDescendingSorted = !this.isDescendingSorted;

    }
  }

  ngOnInit() {
    this.collection.on('reset', () => {
      if (this.isSorted() && this.isDescendingSorted) {
        this.sortDesending();
      }
      console.log('RESET');
    });
  }

}
