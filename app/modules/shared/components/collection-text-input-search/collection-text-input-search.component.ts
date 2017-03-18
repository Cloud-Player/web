import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BaseCollection} from '../../collections/base.collection';
import {BaseModel} from '../../models/base.model';

@Component({
  selector: 'collection-text-input-search',
  styles: [ require('./collection-text-input-search.style.scss') ],
  template: require('./collection-text-input-search.template.html')
})

export class CollectionTextInputSearchComponent implements OnInit {
  private searchTerms = new Subject<string>();

  private query: string;

  public isLoading: boolean = false;

  @ViewChild('searchInput') searchBar: ElementRef;

  @Input() collection: BaseCollection<BaseModel>;

  @Input() queryParam: string;

  // Push a search term into the observable stream.
  search(): void {
    console.log('START SEARCHING');
    this.searchTerms.next(this.query);
  }

  focus(): void{
    this.searchBar.nativeElement.focus();
  }

  ngOnInit(): void {
    this.collection.on('request', (collection: BaseCollection<BaseModel>,promise: any, xhr:any)=>{
      this.isLoading = true;
    });

    this.collection.on('sync', ()=>{
      this.isLoading = false;
    });

    this.searchTerms
      .debounceTime(500)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        if (term) {
          this.collection.queryParams[this.queryParam] = term;
        } else {
          this.collection.queryParams[this.queryParam] = null;
        }
        this.collection.fetch({reset: true});
        return Observable.of<BaseCollection<BaseModel>>(this.collection);
      }).toPromise();

    this.query = this.collection.queryParams[this.queryParam];
  }

}