import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../../../heroes/models/hero.model';
import {Heroes} from '../../../heroes/collections/heroes.collection';
import {Model} from 'backbone';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.css'],
    providers: [Heroes]
})
export class DashboardIndexComponent implements OnInit {
    constructor(private heroes: Heroes, private router: Router) {
    }

    ngOnInit(): void {
        this.heroes.fetch();
    }

    gotoDetail(hero: Hero): void {
        let link = ['/heroes', hero.id];
        this.router.navigate(link);
    }

    getFilteredHeroes(): Model[]{
       return this.heroes.filter((hero, index)=>{return index<4});
    }

}