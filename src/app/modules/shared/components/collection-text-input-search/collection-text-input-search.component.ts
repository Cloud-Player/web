import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';

import {of, Subject, Subscription} from 'rxjs';
import {BaseCollection} from '../../../backbone/collections/base.collection';
import {BaseModel} from '../../../backbone/models/base.model';
import {ClientDetector} from '../../services/client-detector.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-collection-text-input-search',
  styleUrls: ['./collection-text-input-search.style.scss'],
  templateUrl: './collection-text-input-search.template.html'
})
export class CollectionTextInputSearchComponent implements OnInit, OnDestroy, OnChanges {
  private searchTerms = new Subject<string>();
  private searchTermsSubscription: Subscription;

  public query: string;
  public isLoading = false;
  public isIdle = false;

  @ViewChild('searchInput') searchBar: ElementRef;

  @Input() collection: BaseCollection<BaseModel>;

  @Input() queryParam: string;

  @Output() valueChange = new EventEmitter();

  private onRequest(): void {
    this.isLoading = true;
    this.isIdle = false;
  }

  private onRequestComplete(): void {
    this.isLoading = false;
  }

  private initCollection(collection) {
    collection.on('request', this.onRequest.bind(this));
    collection.on('sync error', this.onRequestComplete.bind(this));

    this.searchTermsSubscription =
      this.searchTerms
        .pipe(
          debounceTime(300),        // wait for 300ms pause in events
          distinctUntilChanged(),   // ignore if next search term is same as previous
          switchMap(term => {
              if (term) {
                this.collection.queryParams[this.queryParam] = term;
              } else {
                this.collection.queryParams[this.queryParam] = null;
              }
              this.collection.fetch();
              this.valueChange.emit(term);
              return of<BaseCollection<BaseModel>>(this.collection);
            }
          )
        )
        .subscribe();

    if (collection.queryParams[this.queryParam] !== this.query) {
      this.collection.reset();
      this.search();
    }
  }

  private deInitCollection(collection) {
    collection.off('request', this.onRequest.bind(this));
    collection.off('sync error', this.onRequestComplete.bind(this));

    this.searchTermsSubscription.unsubscribe();
  }

  public isMobileDevice() {
    return ClientDetector.isMobileDevice();
  }

  public setSearchTerm(query: string) {
    this.query = query;
  }

  // Push a search term into the observable stream.
  public search(query?: string): void {
    if (query) {
      this.query = query;
    }

    if (this.query) {
      this.isIdle = true;
      this.searchTerms.next(this.query);
    }
  }

  public focus(): void {
    this.searchBar.nativeElement.focus();
  }

  searchOnInput(): void {
    if (!this.isMobileDevice()) {
      this.search();
    }
  }

  ngOnInit(): void {
    this.query = <string>this.collection.queryParams[this.queryParam];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.collection) {
      if (changes.collection.previousValue) {
        this.deInitCollection(changes.collection.previousValue);
      }
      this.initCollection(changes.collection.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.deInitCollection(this.collection);
  }

}
