import {Component, Input, OnInit} from '@angular/core';

import {of, Subject} from 'rxjs';
import {BaseCollection} from '../../collections/base.collection';
import {BaseModel} from '../../models/base.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-collection-range-input-search',
  styleUrls: ['./collection-range-input-search.style.scss'],
  templateUrl: './collection-range-input-search.template.html'
})

export class CollectionRangeInputSearchComponent implements OnInit {
  private searchTerms = new Subject<string>();

  public query: string;

  @Input() collection: BaseCollection<BaseModel>;

  @Input() queryParam: string;

  // Push a search term into the observable stream.
  search(): void {
    this.searchTerms.next(this.query);
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300), // wait for 300ms pause in events
        distinctUntilChanged(),
        switchMap(term => {
          if (term) {
            this.collection.queryParams[this.queryParam] = term;
            this.collection.fetch({reset: true});
            return of<BaseCollection<BaseModel>>(this.collection);
          }
        })
      )
      .toPromise();

    this.query = <string>this.collection.queryParams[this.queryParam];
  }

}
