import {NgModule}      from '@angular/core';

import {HeroesIndexComponent}     from './components/index.component';
import {HeroesDetailComponent}     from './components/detail.component';

import {HeroesDataService} from './services/data.service';
import {HeroesSearchService} from './services/search.service';

import {HeroesRoutingModule}     from './heroes.routes';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HeroesSearchComponent} from "./components/search.component";

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
    ],
    providers: [
        HeroesDataService
    ]
})
export class HeroesModule {
}
