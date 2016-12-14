import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {TracksIndexComponent} from './components/index/index.component';
import {TracksDetailComponent} from './components/detail/detail.component';
import {TracksSearchComponent} from './components/search/search.component';

import {TracksRoutingModule} from './tracks.routes';
import {AudioPlayerModule} from '../audioplayer/audio-player.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksRoutingModule,
    AudioPlayerModule
  ],
  exports: [
    TracksSearchComponent
  ],
  declarations: [
    TracksIndexComponent,
    TracksDetailComponent,
    TracksSearchComponent
  ]
})

export class TracksModule { }
