import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TracksRoutingModule} from './tracks.routes';
import {SharedModule} from '../shared/shared.module';
import {TrackPlayButtonComponent} from './components/play-track-button/track-play-button';
import {TrackPlayOnEventDirective} from './directives/track-play-on-event';
import {TrackListComponent} from './components/track-list/track-list';
import {TrackDetailViewComponent} from './components/detail/detail-view';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksRoutingModule,
    SharedModule
  ],
  exports: [
    TrackListComponent
  ],
  declarations: [
    TrackDetailViewComponent,
    TrackListComponent,
    TrackPlayButtonComponent,
    TrackPlayOnEventDirective
  ]
})

export class TracksModule { }
