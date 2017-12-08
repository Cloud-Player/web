import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BackboneModule} from '../backbone/backbone.module';
import {TracksModule} from '../tracks/tracks.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {MainComponent} from './components/main/main.component';
import {MainRoutingModule} from './main.routes';
import {PlayerModule} from '../player/player.module';
import {SessionModule} from '../session/session.module';
import {UsersModule} from '../users/users.module';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NavComponent} from './components/nav/nav.component';
import {PlaylistModule} from '../playlists/playlist.module';
import {AuthService} from '../shared/services/auth.service';
import {SharedModule} from '../shared/shared.module';
import {DesktopAppViewComponent} from './components/desktop-app-view/desktop-app-view.component';
import {UserAnalyticsModule} from '../user-analytics/user-analytics.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BackboneModule,
    PlayerModule,
    TracksModule,
    DashboardModule,
    MainRoutingModule,
    SessionModule,
    UsersModule,
    PlaylistModule,
    SharedModule,
    UserAnalyticsModule
  ],
  declarations: [
    MainComponent,
    NavComponent,
    DesktopAppViewComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService],
  bootstrap: [MainComponent]
})
export class MainModule {
}
