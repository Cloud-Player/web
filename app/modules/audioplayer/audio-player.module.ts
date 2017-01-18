import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PlayQueueComponent} from './components/playqueue/playqueue.component';
import {SharedModule} from '../shared/shared.module';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {AudioPlayerControlsComponent} from './components/audio-player-controls/audio-player-controls.component';

@NgModule ({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AudioPlayerControlsComponent,
    AudioPlayerComponent,
    PlayQueueComponent
  ],
  exports: [
    AudioPlayerComponent
  ]
})

export class AudioPlayerModule { }
