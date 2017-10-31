"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const h_readable_seconds_pipe_1 = require('./pipes/h-readable-seconds.pipe');
const track_list_component_1 = require('./components/track-list/track-list.component');
const toggle_liked_track_component_1 = require('./components/toggle-liked-track-component/toggle-liked-track.component');
const play_button_component_1 = require('./components/play-button/play_button.component');
const platform_browser_1 = require('@angular/platform-browser');
const queue_button_component_1 = require('./components/queue-button/queue_button.component');
const sort_tracks_component_1 = require('./components/sort-tracks/sort-tracks.component');
const backbone_module_1 = require('../backbone/backbone.module');
const range_slider_component_1 = require('./components/range-slider/range-slider.component');
const forms_1 = require('@angular/forms');
const draggable_directive_1 = require('./directives/draggable.directive');
const dropzone_directive_1 = require('./directives/dropzone.directive');
const two_range_slider_component_1 = require('./components/two-range-slider/two-range-slider.component');
const view_header_component_1 = require('./components/view-header/view-header.component');
const scroll_view_component_1 = require('./components/scroll-view/scroll-view.component');
const cloud_player_logo_service_1 = require('./services/cloud-player-logo.service');
const cloud_player_logo_component_1 = require('./components/cloud-player-logo/cloud-player-logo.component');
const toggle_switch_component_1 = require('./components/toggle-switch/toggle-switch.component');
const loading_spinner_component_1 = require('./components/loading-spinner/loading-spinner.component');
const collection_text_input_search_component_1 = require('./components/collection-text-input-search/collection-text-input-search.component');
const focus_input_directive_1 = require('./directives/focus-input.directive');
const view_change_loader_component_1 = require('./components/view-change-loader/view-change-loader.component');
const track_cover_component_1 = require('./components/track-cover/track-cover.component');
const time_ago_directive_1 = require('./directives/time-ago.directive');
const play_track_on_event_directive_1 = require('./directives/play-track-on-event.directive');
const options_btn_component_1 = require('./components/options-btn/options-btn.component');
const k_mil_shortener_pipe_1 = require('./pipes/k-mil-shortener.pipe');
const fill_height_directive_1 = require('./directives/fill-height.directive');
const multi_line_component_1 = require('./components/multi-line-text/multi-line.component');
const limit_collection_results_pipe_1 = require('./pipes/limit-collection-results.pipe');
const facebook_share_button_component_1 = require('./components/facebook-share-button/facebook-share-button.component');
const twitter_share_button_component_1 = require('./components/twitter-share-button/twitter-share-button.component');
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            backbone_module_1.BackboneModule
        ],
        declarations: [
            cloud_player_logo_component_1.CloudPlayerLogoComponent,
            collection_text_input_search_component_1.CollectionTextInputSearchComponent,
            facebook_share_button_component_1.FacebookShareButtonComponent,
            twitter_share_button_component_1.TwitterShareButtonComponent,
            track_list_component_1.TrackListComponent,
            toggle_liked_track_component_1.ToggleLikedTrackComponent,
            play_button_component_1.PlayButtonComponent,
            queue_button_component_1.QueueButtonComponent,
            sort_tracks_component_1.SortTracksComponent,
            range_slider_component_1.RangeSliderComponent,
            two_range_slider_component_1.TwoRangeSliderComponent,
            view_header_component_1.ViewHeaderComponent,
            view_change_loader_component_1.ViewChangeLoaderComponent,
            scroll_view_component_1.ScrollViewComponent,
            toggle_switch_component_1.ToggleSwitchComponent,
            loading_spinner_component_1.LoadingSpinnerComponent,
            multi_line_component_1.MultiLineComponent,
            options_btn_component_1.OptionsBtnComponent,
            options_btn_component_1.OptionsBtnOptionComponent,
            track_cover_component_1.TrackCoverComponent,
            draggable_directive_1.DraggableDirective,
            dropzone_directive_1.DropZoneDirective,
            focus_input_directive_1.FocusInputDirective,
            time_ago_directive_1.TimeAgoDirective,
            play_track_on_event_directive_1.PlayTrackOnEventDirective,
            fill_height_directive_1.FillHeightDirective,
            h_readable_seconds_pipe_1.HumanReadableSecondsPipe,
            k_mil_shortener_pipe_1.KMilShortenerPipe,
            limit_collection_results_pipe_1.LimitCollectionresultsPipe
        ],
        exports: [
            cloud_player_logo_component_1.CloudPlayerLogoComponent,
            collection_text_input_search_component_1.CollectionTextInputSearchComponent,
            facebook_share_button_component_1.FacebookShareButtonComponent,
            twitter_share_button_component_1.TwitterShareButtonComponent,
            track_list_component_1.TrackListComponent,
            toggle_liked_track_component_1.ToggleLikedTrackComponent,
            play_button_component_1.PlayButtonComponent,
            queue_button_component_1.QueueButtonComponent,
            sort_tracks_component_1.SortTracksComponent,
            range_slider_component_1.RangeSliderComponent,
            two_range_slider_component_1.TwoRangeSliderComponent,
            view_header_component_1.ViewHeaderComponent,
            view_change_loader_component_1.ViewChangeLoaderComponent,
            scroll_view_component_1.ScrollViewComponent,
            toggle_switch_component_1.ToggleSwitchComponent,
            loading_spinner_component_1.LoadingSpinnerComponent,
            multi_line_component_1.MultiLineComponent,
            options_btn_component_1.OptionsBtnComponent,
            options_btn_component_1.OptionsBtnOptionComponent,
            track_cover_component_1.TrackCoverComponent,
            draggable_directive_1.DraggableDirective,
            dropzone_directive_1.DropZoneDirective,
            focus_input_directive_1.FocusInputDirective,
            time_ago_directive_1.TimeAgoDirective,
            play_track_on_event_directive_1.PlayTrackOnEventDirective,
            fill_height_directive_1.FillHeightDirective,
            h_readable_seconds_pipe_1.HumanReadableSecondsPipe,
            k_mil_shortener_pipe_1.KMilShortenerPipe,
            limit_collection_results_pipe_1.LimitCollectionresultsPipe
        ],
        providers: [cloud_player_logo_service_1.CloudPlayerLogoService]
    }), 
    __metadata('design:paramtypes', [])
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map