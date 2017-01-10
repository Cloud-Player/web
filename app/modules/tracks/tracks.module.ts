import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TracksDetailComponent} from './components/detail/detail.component';
import {TracksRoutingModule} from './tracks.routes';
import {AudioPlayerModule} from '../audioplayer/audio-player.module';
import {SharedModule} from '../shared/shared.module';
import {SessionModule} from '../session/session.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksRoutingModule,
    SharedModule
  ],
  declarations: [
    TracksDetailComponent
  ]
})

export class TracksModule { }
