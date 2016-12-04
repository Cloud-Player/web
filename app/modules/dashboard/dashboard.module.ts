import {NgModule}      from '@angular/core';

import {DashboardIndexComponent}     from './components/index/index.component';

import {TracksModule} from '../tracks/tracks.module';

import {DashboardRoutingModule}     from './dashboard.routes';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TracksModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardIndexComponent
    ]
})

export class DashboardModule {}
