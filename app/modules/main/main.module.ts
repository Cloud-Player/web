import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';

import {HeroesModule} from '../heroes/heroes.module';
import {DashboardModule} from '../dashboard/dashboard.module';

import {MainComponent}     from './components/main.component';

import {MainRoutingModule}     from './main.routes';
import {BackboneModule} from "../backbone/backbone.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        BackboneModule,
        HeroesModule,
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




