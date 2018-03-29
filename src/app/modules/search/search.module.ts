import {NgModule} from '@angular/core';
import {SearchViewComponent} from './components/search-view/search-view';
import {TracksModule} from '../tracks/tracks.module';
import {SearchRoutingModule} from './search.routes';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AuthenticatedUserModule} from '../authenticated-user/authenticated-user.module';
import {BackboneModule} from '../backbone/backbone.module';
import {SharedModule} from '../shared/shared.module';
import {FilterFormComponent} from './components/filter-form/filter-form';
import {SocialSharePanelComponent} from './components/social-share-panel/social-share-panel.component';
import {InputFilterComponent} from './components/filter-form/input-filter/input-filter';
import {RangeFilterComponent} from './components/filter-form/range-filter/range-filter';
import {MinMaxRangeFilterComponent} from './components/filter-form/min-max-range-filter/min-max-range-filter';
import {YoutubeDurationFilterComponent} from './components/filter-form/youtube-duration-filter/youtube-duration-filter';
import {SearchResultTracksComponent} from './components/search-result-tracks/search-result-tracks';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksModule,
    SearchRoutingModule,
    AuthenticatedUserModule,
    BackboneModule,
    SharedModule
  ],
  declarations: [
    SearchViewComponent,
    FilterFormComponent,
    InputFilterComponent,
    RangeFilterComponent,
    MinMaxRangeFilterComponent,
    YoutubeDurationFilterComponent,
    SocialSharePanelComponent,
    SearchResultTracksComponent
  ]
})

export class SearchModule {
}
