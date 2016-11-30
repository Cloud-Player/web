import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import {Hero} from '../../models/hero.model';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'detail.template.html',
    providers: [Hero]
})

export class HeroesDetailComponent implements OnInit {
    constructor(private hero: Hero,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.hero.set('id', id);
            this.hero.fetch();
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.hero.save(null, {wait: true})
            .then(() => this.goBack());
    }
}
