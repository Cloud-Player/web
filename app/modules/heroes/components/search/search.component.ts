import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Heroes} from '../../collections/heroes.collection';
import {Hero} from '../../models/hero.model';

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'search.template.html',
    styleUrls: ['search.style.css'],
    providers: [Heroes]
})

export class HeroesSearchComponent implements OnInit {
    private searchTerms = new Subject<string>();

    constructor(private heroes: Heroes,
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
                    this.heroes.queryParams.q = term;
                    this.heroes.fetch({reset: true});
                }
                return Observable.of<Heroes>(this.heroes);
            }).toPromise();
    }

    gotoDetail(hero: Hero): void {
        let link = ['/heroes', hero.id];
        this.router.navigate(link);
    }
}
