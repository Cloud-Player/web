import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';

import {BackboneModule} from '../backbone/backbone.module';
import {HeroesModule} from '../heroes/heroes.module';
import {HeroesBbModule} from '../heroes-bb/heroes-bb.module';
import {DashboardModule} from '../dashboard/dashboard.module';

import {MainComponent}     from './components/main.component';

import {MainRoutingModule}     from './main.routes';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        BackboneModule,
        HeroesModule,
        HeroesBbModule,
        DashboardModule,
        MainRoutingModule
    ],
    declarations: [
        MainComponent
    ],
    bootstrap: [MainComponent]
})
export class MainModule {
}




