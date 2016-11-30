import {NgModule}      from '@angular/core';

import {DashboardIndexComponent}     from './components/index/index.component';

import {HeroesModule} from '../heroes/heroes.module';

import {DashboardRoutingModule}     from './dashboard.routes';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HeroesModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardIndexComponent
    ]
})

export class DashboardModule {}
