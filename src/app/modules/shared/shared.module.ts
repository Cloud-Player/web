import {NgModule} from '@angular/core';
import {HumanReadableSecondsPipe} from './pipes/h-readable-seconds.pipe';
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
import {LogoService} from './services/logo.service';
import {LogoComponent} from './components/logo/cloud-player-logo.component';
import {ToggleSwitchComponent} from './components/toggle-switch/toggle-switch.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {CollectionTextInputSearchComponent} from './components/collection-text-input-search/collection-text-input-search.component';
import {FocusInputDirective} from './directives/focus-input.directive';
import {ViewChangeLoaderComponent} from './components/view-change-loader/view-change-loader.component';
import {TrackCoverComponent} from './components/track-cover/track-cover.component';
import {TimeAgoDirective} from './directives/time-ago.directive';
import {KMilShortenerPipe} from './pipes/k-mil-shortener.pipe';
import {MultiLineComponent} from './components/multi-line-text/multi-line.component';
import {LimitCollectionresultsPipe} from './pipes/limit-collection-results.pipe';
import {FacebookShareButtonComponent} from './components/facebook-share-button/facebook-share-button.component';
import {TwitterShareButtonComponent} from './components/twitter-share-button/twitter-share-button.component';
import {ToastsComponent} from './components/toasts/toasts';
import {ToastService} from './services/toast';
import {ToastComponent} from './components/toast/toast';
import {TabBarComponent} from './components/tab-bar/tab-bar';
import {TabPaneComponent} from './components/tab-pane/tab-pane';
import {FullScreenService} from './services/fullscreen.service';
import {CollapsibleComponent} from './components/collapsible/collapsible';
import {AuthenticatedUserGuard} from './guards/authenticated-user-guard';
import {DragAndDropService} from './services/drag-and-drop';
import {ModalHolderComponent} from './components/modal/modal-holder/modal-holder';
import {ModalComponent} from './components/modal/modal/modal';
import {ModalService} from './services/modal';
import {ContextMenuComponent} from './components/context-menu/context-menu';
import {OptionsBtnComponent} from './components/options-btn/options-btn';
import {OptionBtnComponent} from './components/option-btn/option-btn';
import {OptionsOptionBtnComponent} from './components/options-btn/options-option-btn/options-option-btn';
import {EmptyStateComponent} from './components/empty-state/empty-state';
import {LayoutService} from './services/layout';
import {FillHeightDirective} from './directives/fill-height';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddToQueueOptionComponent} from './components/option-btn/add-to-queue-option/add-to-queue-option';
import {AddToPlaylistOptionComponent} from './components/option-btn/add-to-playlist-option/add-to-playlist-option';
import {ShufflePlayOptionComponent} from './components/option-btn/shuffle-play-option/shuffle-play-option';
import {ListFooterComponent} from './components/list-footer/list-footer';
import {AlertBoxComponent} from './components/alert/alert-box';
import {SocketMessageService} from './services/socket-message';
import {MessageService} from './services/message';
import {SocketBackboneSender} from './services/socket-backbone-sender';
import {ConfirmDeleteComponent} from './components/confirm-delete/confirm-delete';
import {ConfirmDeleteDirective} from './directives/confirm-delete';
import {AuxAppLogoComponent} from './components/aux-app-logo/aux-app-logo';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    BackboneModule
  ],
  declarations: [
    AlertBoxComponent,
    AuxAppLogoComponent,
    LogoComponent,
    CollectionTextInputSearchComponent,
    CollapsibleComponent,
    ContextMenuComponent,
    FacebookShareButtonComponent,
    TwitterShareButtonComponent,
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
    ListFooterComponent,
    ConfirmDeleteComponent,

    OptionBtnComponent,
    OptionsBtnComponent,
    OptionsOptionBtnComponent,
    AddToQueueOptionComponent,
    AddToPlaylistOptionComponent,
    ShufflePlayOptionComponent,

    TrackCoverComponent,
    ToastComponent,
    ToastsComponent,
    TabBarComponent,
    TabPaneComponent,
    ModalHolderComponent,
    ModalComponent,
    EmptyStateComponent,

    DraggableDirective,
    DropZoneDirective,
    FocusInputDirective,
    TimeAgoDirective,
    FillHeightDirective,
    ConfirmDeleteDirective,

    HumanReadableSecondsPipe,
    KMilShortenerPipe,
    LimitCollectionresultsPipe
  ],
  exports: [
    AlertBoxComponent,
    AuxAppLogoComponent,
    LogoComponent,
    CollectionTextInputSearchComponent,
    CollapsibleComponent,
    ContextMenuComponent,
    FacebookShareButtonComponent,
    TwitterShareButtonComponent,
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
    ListFooterComponent,

    OptionBtnComponent,
    OptionsBtnComponent,
    OptionsOptionBtnComponent,
    AddToQueueOptionComponent,
    AddToPlaylistOptionComponent,
    ShufflePlayOptionComponent,

    TrackCoverComponent,
    ToastsComponent,
    TabBarComponent,
    TabPaneComponent,
    ModalHolderComponent,
    ModalComponent,
    EmptyStateComponent,

    DraggableDirective,
    DropZoneDirective,
    FocusInputDirective,
    TimeAgoDirective,
    FillHeightDirective,
    ConfirmDeleteDirective,

    HumanReadableSecondsPipe,
    KMilShortenerPipe,
    LimitCollectionresultsPipe
  ],
  providers: [
    HumanReadableSecondsPipe,
    LogoService,
    FullScreenService,
    ToastService,
    DragAndDropService,
    ModalService,
    LayoutService,
    MessageService,
    SocketMessageService,
    SocketBackboneSender,
    AuthenticatedUserGuard
  ],
  entryComponents: [
    ModalComponent,
    ConfirmDeleteComponent
  ]
})
export class SharedModule {
}
