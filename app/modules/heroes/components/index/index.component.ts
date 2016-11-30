import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../../models/hero.model';
import {Heroes} from '../../collections/heroes.collection';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.css'],
    providers: [Heroes]
})
export class HeroesIndexComponent implements OnInit {
    selectedHero: Hero;

    constructor(private heroes: Heroes, private router: Router) {}

    ngOnInit(): void {
        this.heroes.fetch();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/heroes', this.selectedHero.id]);
    }

    add(name: string): void {
        this.heroes.create({name: name});
    }
}
