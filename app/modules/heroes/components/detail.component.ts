import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';

import {Hero} from '../models/hero.model';

import {HeroesDataService} from '../services/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'detail.template.html',
    providers: [HeroesDataService]
})
export class HeroesDetailComponent implements OnInit {
    @Input()
    hero: Hero;

    constructor(private heroesDataService: HeroesDataService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroesDataService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void{
        this.heroesDataService.update(this.hero)
            .then(() => this.goBack());
    }
}