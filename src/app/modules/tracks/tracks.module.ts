import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {TracksRoutingModule} from './tracks.routes';
import {SharedModule} from '../shared/shared.module';
import {TrackPlayButtonComponent} from './components/play-track-button/track-play-button';
import {TrackPlayOnEventDirective} from './directives/track-play-on-event';
import {TrackDetailViewComponent} from './components/detail/detail-view';
import {TrackListItemComponent} from './components/track-list-item/track-list-item';
import {ToggleLikedTrackComponent} from './components/toggle-liked-track/toggle-liked-track';
import {BackboneModule} from '../backbone/backbone.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksRoutingModule,
    BackboneModule,
    SharedModule
  ],
  exports: [
    TrackListItemComponent,
    ToggleLikedTrackComponent,
    TrackPlayOnEventDirective
  ],
  declarations: [
    TrackDetailViewComponent,
    TrackListItemComponent,
    TrackPlayButtonComponent,
    TrackPlayOnEventDirective,
    ToggleLikedTrackComponent
  ]
})

export class TracksModule {
}
