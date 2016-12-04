import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Tracks} from '../../collections/tracks.collection';
import {Track} from '../../models/track.model';

@Component({
    moduleId: module.id,
    selector: 'track-search',
    templateUrl: 'search.template.html',
    styleUrls: ['search.style.css'],
    providers: [Tracks]
})

export class TracksSearchComponent implements OnInit {
    private searchTerms = new Subject<string>();

    constructor(private tracks: Tracks,
                private router: Router) {
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
            }).toPromise();
    }

    gotoDetail(track: Track): void {
        let link = ['/tracks', track.id];
        this.router.navigate(link);
    }
}
