import {NgModule} from '@angular/core';
import {DashboardIndexComponent} from './components/index/index.component';
import {TracksModule} from '../tracks/tracks.module';
import {DashboardRoutingModule} from './dashboard.routes';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SessionModule} from '../session/session.module';
import {BackboneModule} from '../backbone/backbone.module';
import {SharedModule} from '../shared/shared.module';
import {FilterFormComponent} from './components/filter-form/filter-form';
import {SocialSharePanelComponent} from './components/social-share-panel/social-share-panel.component';
import {InputFilterComponent} from './components/filter-form/input-filter/input-filter';
import {RangeFilterComponent} from './components/filter-form/range-filter/range-filter';
import {MinMaxRangeFilterComponent} from './components/filter-form/min-max-range-filter/min-max-range-filter';
import {YoutubeDurationFilterComponent} from './components/filter-form/youtube-duration-filter/youtube-duration-filter';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksModule,
    DashboardRoutingModule,
    SessionModule,
    BackboneModule,
    SharedModule
  ],
  declarations: [
    DashboardIndexComponent,
    FilterFormComponent,
    InputFilterComponent,
    RangeFilterComponent,
    MinMaxRangeFilterComponent,
    YoutubeDurationFilterComponent,
    SocialSharePanelComponent
  ]
})

export class DashboardModule {
}
