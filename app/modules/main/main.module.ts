import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import './rxjs-extensions';

import {BackboneModule} from '../backbone/backbone.module';
import {HeroesModule} from '../heroes/heroes.module';
import {DashboardModule} from '../dashboard/dashboard.module';

import {MainComponent}     from './components/main/main.component';

import {MainRoutingModule}     from './main.routes';
import {AudioPlayerModule} from "../audioplayer/audio-player.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BackboneModule,
        HeroesModule,
        DashboardModule,
        MainRoutingModule,
        AudioPlayerModule
    ],
    declarations: [
        MainComponent
    ],
    bootstrap: [MainComponent]
})
export class MainModule {
}

