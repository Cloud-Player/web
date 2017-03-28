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
import {CloudPlayerLogoService} from './services/cloud-player-logo.service';
import {CloudPlayerLogoComponent} from './components/cloud-player-logo/cloud-player-logo.component';
import {ToggleSwitchComponent} from './components/toggle-switch/toggle-switch.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {CollectionTextInputSearchComponent} from './components/collection-text-input-search/collection-text-input-search.component';
import {FocusInputDirective} from './directives/focus-input.directive';
import {ViewChangeLoaderComponent} from './components/view-change-loader/view-change-loader.component';
import {TrackCoverComponent} from './components/track-cover/track-cover.component';
import {TimeAgoDirective} from './directives/time-ago.directive';
import {PlayTrackOnEventDirective} from './directives/play-track-on-event.directive';
import {OptionsBtnComponent, OptionsBtnOptionComponent} from './components/options-btn/options-btn.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BackboneModule
  ],
  declarations: [
    CloudPlayerLogoComponent,
    CollectionTextInputSearchComponent,
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    SortTracksComponent,
    RangeSliderComponent,
    TwoRangeSliderComponent,
    ViewHeaderComponent,
    ViewChangeLoaderComponent,
    ScrollViewComponent,
    ToggleSwitchComponent,
    LoadingSpinnerComponent,
    OptionsBtnComponent,
    OptionsBtnOptionComponent,
    TrackCoverComponent,
    DraggableDirective,
    DropZoneDirective,
    FocusInputDirective,
    TimeAgoDirective,
    PlayTrackOnEventDirective,
    HumanReadableSecondsPipe
  ],
  exports: [
    CloudPlayerLogoComponent,
    CollectionTextInputSearchComponent,
    TrackListComponent,
    ToggleLikedTrackComponent,
    PlayButtonComponent,
    QueueButtonComponent,
    SortTracksComponent,
    RangeSliderComponent,
    TwoRangeSliderComponent,
    ViewHeaderComponent,
    ViewChangeLoaderComponent,
    ScrollViewComponent,
    ToggleSwitchComponent,
    LoadingSpinnerComponent,
    OptionsBtnComponent,
    OptionsBtnOptionComponent,
    TrackCoverComponent,
    DraggableDirective,
    DropZoneDirective,
    FocusInputDirective,
    TimeAgoDirective,
    PlayTrackOnEventDirective,
    HumanReadableSecondsPipe
  ],
  providers: [CloudPlayerLogoService]
})
export class SharedModule {
}
