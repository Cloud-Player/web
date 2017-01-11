import {NgModule} from '@angular/core';
import {HumanReadableSecondsPipe} from './pipes/h-readable-seconds.pipe';
import {TrackListComponent} from './components/track-list/track-list.component';
import {ToggleLikedTrackComponent} from './components/toggle-liked-track-component/toggle-liked-track.component';
import {PlayButtonComponent} from './components/play-button/play_button.component';
import {BrowserModule} from '@angular/platform-browser';
import {QueueButtonComponent} from './components/queue-button/queue_button.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    HumanReadableSecondsPipe
  ],
  exports: [
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    HumanReadableSecondsPipe
  ]
})
export class SharedModule { }
