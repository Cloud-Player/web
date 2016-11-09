import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {HeroModel} from '../models/hero.model';
import {HeroesCollection} from '../collections/heroes.collection';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'index.template.html',
    styleUrls: ['../styles/index.css'],
    providers: [HeroesCollection]
})
export class HeroesBbIndexComponent implements OnInit {
    selectedHero: HeroModel;

    constructor(private router: Router,
                private heroes: HeroesCollection) {
    }

    ngOnInit(): void {
        this.heroes.fetch();
    }

    onSelect(hero: HeroModel): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/heroes-bb', this.selectedHero.id]);
    }

    add(name: string): void {
        this.heroes.create({name: name}, {wait: true});
    }
}
