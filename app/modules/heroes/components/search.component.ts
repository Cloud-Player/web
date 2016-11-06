import {Component, OnInit} from '@angular/core';
import {Router}            from '@angular/router';

import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';

import {HeroesSearchService} from '../services/search.service';
import {Hero} from '../models/hero.model';

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'search.template.html',
    styleUrls: ['../styles/search.css'],
    providers: [HeroesSearchService]
})
export class HeroesSearchComponent implements OnInit {
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private heroesSearchService: HeroesSearchService,
                private router: Router) {
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.heroesSearchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<Hero[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void {
        let link = ['/heroes', hero.id];
        this.router.navigate(link);
    }
}