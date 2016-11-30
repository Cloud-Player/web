import {NgModule}      from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {HeroesIndexComponent}     from './components/index/index.component';
import {HeroesDetailComponent}     from './components/detail/detail.component';
import {HeroesSearchComponent} from "./components/search/search.component";

import {HeroesRoutingModule}     from './heroes.routes';
import {Heroes} from './collections/heroes.collection';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HeroesRoutingModule
    ],
    exports: [
        HeroesSearchComponent
    ],
    declarations: [
        HeroesIndexComponent,
        HeroesDetailComponent,
        HeroesSearchComponent
    ]
})
export class HeroesModule {
}
