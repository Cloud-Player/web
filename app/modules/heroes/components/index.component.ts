import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../models/hero.model';
import {HeroesDataService} from '../services/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'index.template.html',
    styleUrls: ['../styles/index.css']
})
export class HeroesIndexComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(private heroesDataService: HeroesDataService, private router: Router) {
    }

    getHeroes(): void {
        this.heroesDataService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/heroes', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroesDataService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroesDataService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}