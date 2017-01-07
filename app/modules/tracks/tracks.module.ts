import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TracksDetailComponent} from './components/detail/detail.component';
import {TracksRoutingModule} from './tracks.routes';
import {AudioPlayerModule} from '../audioplayer/audio-player.module';
import {TrackListComponent} from './components/track-list/track-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksRoutingModule,
    AudioPlayerModule
  ],
  exports: [
    TrackListComponent
  ],
  declarations: [
    TracksDetailComponent,
    TrackListComponent
  ]
})

export class TracksModule { }
