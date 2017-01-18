import {NgModule} from '@angular/core';
import {HumanReadableSecondsPipe} from './pipes/h-readable-seconds.pipe';
import {TrackListComponent} from './components/track-list/track-list.component';
import {ToggleLikedTrackComponent} from './components/toggle-liked-track-component/toggle-liked-track.component';
import {PlayButtonComponent} from './components/play-button/play_button.component';
import {BrowserModule} from '@angular/platform-browser';
import {QueueButtonComponent} from './components/queue-button/queue_button.component';
import {SortTracksComponent} from './components/sort-tracks/sort-tracks.component';
import {BackboneModule} from '../backbone/backbone.module';

@NgModule({
  imports: [
    BrowserModule,
    BackboneModule
  ],
  declarations: [
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    SortTracksComponent,
    HumanReadableSecondsPipe
  ],
  exports: [
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    SortTracksComponent,
    HumanReadableSecondsPipe
  ]
})
export class SharedModule { }
