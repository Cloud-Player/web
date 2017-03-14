import {NgModule} from '@angular/core';
import {HumanReadableSecondsPipe} from './pipes/h-readable-seconds.pipe';
import {TrackListComponent} from './components/track-list/track-list.component';
import {ToggleLikedTrackComponent} from './components/toggle-liked-track-component/toggle-liked-track.component';
import {PlayButtonComponent} from './components/play-button/play_button.component';
import {BrowserModule} from '@angular/platform-browser';
import {QueueButtonComponent} from './components/queue-button/queue_button.component';
import {SortTracksComponent} from './components/sort-tracks/sort-tracks.component';
import {BackboneModule} from '../backbone/backbone.module';
import {RangeSliderComponent} from './components/range-slider/range-slider.component';
import {FormsModule} from '@angular/forms';

import {DraggableDirective} from './directives/draggable.directive';
import {DropZoneDirective} from './directives/dropzone.directive';
import {TwoRangeSliderComponent} from './components/two-range-slider/two-range-slider.component';
import {ViewHeaderComponent} from './components/view-header/view-header.component';
import {ScrollViewComponent} from './components/scroll-view/scroll-view.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BackboneModule
  ],
  declarations: [
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    SortTracksComponent,
    RangeSliderComponent,
    TwoRangeSliderComponent,
    ViewHeaderComponent,
    ScrollViewComponent,
    DraggableDirective,
    DropZoneDirective,
    HumanReadableSecondsPipe
  ],
  exports: [
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    SortTracksComponent,
    RangeSliderComponent,
    TwoRangeSliderComponent,
    ViewHeaderComponent,
    ScrollViewComponent,
    DraggableDirective,
    DropZoneDirective,
    HumanReadableSecondsPipe
  ]
})
export class SharedModule {
}
