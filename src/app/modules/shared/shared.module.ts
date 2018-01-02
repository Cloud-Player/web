import {NgModule} from '@angular/core';
import {HumanReadableSecondsPipe} from './pipes/h-readable-seconds.pipe';
import {ToggleLikedTrackComponent} from './components/toggle-liked-track-component/toggle-liked-track.component';
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
import {OptionsBtnComponent, OptionsBtnOptionComponent} from './components/options-btn/options-btn.component';
import {KMilShortenerPipe} from './pipes/k-mil-shortener.pipe';
import {FillHeightDirective} from './directives/fill-height.directive';
import {MultiLineComponent} from './components/multi-line-text/multi-line.component';
import {LimitCollectionresultsPipe} from './pipes/limit-collection-results.pipe';
import {FacebookShareButtonComponent} from './components/facebook-share-button/facebook-share-button.component';
import {TwitterShareButtonComponent} from './components/twitter-share-button/twitter-share-button.component';
import {EaseService} from './services/ease.service';
import {ToastsComponent} from './components/toasts/toasts';
import {ToastService} from './services/toast';
import {ToastComponent} from './components/toast/toast';
import {TabBarComponent} from './components/tab-bar/tab-bar';
import {TabPaneComponent} from './components/tab-pane/tab-pane';
import {FullScreenService} from './services/fullscreen.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BackboneModule
  ],
  declarations: [
    CloudPlayerLogoComponent,
    CollectionTextInputSearchComponent,
    FacebookShareButtonComponent,
    TwitterShareButtonComponent,
    ToggleLikedTrackComponent,
    QueueButtonComponent,
    SortTracksComponent,
    RangeSliderComponent,
    TwoRangeSliderComponent,
    ViewHeaderComponent,
    ViewChangeLoaderComponent,
    ScrollViewComponent,
    ToggleSwitchComponent,
    LoadingSpinnerComponent,
    MultiLineComponent,
    OptionsBtnComponent,
    OptionsBtnOptionComponent,
    TrackCoverComponent,
    ToastComponent,
    ToastsComponent,
    TabBarComponent,
    TabPaneComponent,
    DraggableDirective,
    DropZoneDirective,
    FocusInputDirective,
    TimeAgoDirective,
    FillHeightDirective,
    HumanReadableSecondsPipe,
    KMilShortenerPipe,
    LimitCollectionresultsPipe
  ],
  exports: [
    CloudPlayerLogoComponent,
    CollectionTextInputSearchComponent,
    FacebookShareButtonComponent,
    TwitterShareButtonComponent,
    ToggleLikedTrackComponent,
    QueueButtonComponent,
    SortTracksComponent,
    RangeSliderComponent,
    TwoRangeSliderComponent,
    ViewHeaderComponent,
    ViewChangeLoaderComponent,
    ScrollViewComponent,
    ToggleSwitchComponent,
    LoadingSpinnerComponent,
    MultiLineComponent,
    OptionsBtnComponent,
    OptionsBtnOptionComponent,
    TrackCoverComponent,
    ToastsComponent,
    TabBarComponent,
    TabPaneComponent,
    DraggableDirective,
    DropZoneDirective,
    FocusInputDirective,
    TimeAgoDirective,
    FillHeightDirective,
    HumanReadableSecondsPipe,
    KMilShortenerPipe,
    LimitCollectionresultsPipe
  ],
  providers: [
    HumanReadableSecondsPipe,
    CloudPlayerLogoService,
    FullScreenService,
    ToastService
  ]
})
export class SharedModule {
}
