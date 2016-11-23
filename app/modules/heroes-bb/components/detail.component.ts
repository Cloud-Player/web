import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';

import {HeroModel} from '../models/hero.model';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'detail.template.html',
    providers: [HeroModel]
})
export class HeroesBbDetailComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private location: Location,
                private hero: HeroModel) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.hero.set('id', params['id']);
            this.hero.fetch().subscribe();
        });
    }

    goBack(): void {
        this.location.back();
    }
}
