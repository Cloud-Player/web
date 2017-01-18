import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Tracks} from '../../collections/tracks.collection';

@Component({
    selector: 'track-search',
    template: require('./search.template.html')
    providers: [Tracks]
})

export class TracksSearchComponent implements OnInit {
    private searchTerms = new Subject<string>();

    constructor(private tracks: Tracks) {
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => {
                if (term) {
                    this.tracks.queryParams.q = term;
                    this.tracks.fetch({reset: true});
                return Observable.of<Tracks>(this.tracks);
            }}).toPromise();
    }

}
