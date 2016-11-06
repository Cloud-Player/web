import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';

import {HeroModel} from '../models/hero.model';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'detail.template.html',
})
export class HeroesBbDetailComponent implements OnInit {
    @Input()
    hero: HeroModel;

    constructor(private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.hero = new HeroModel({id: params['id']});
            this.hero.fetch();
        });
    }

    goBack(): void {
        this.location.back();
    }
}
