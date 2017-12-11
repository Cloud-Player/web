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
import {UserAnalyticsModule} from '../user-analytics/user-analytics.module';
import {HttpClientModule} from '@angular/common/http';
import {NativeAppModule} from '../native-app/native-app.module';
import * as localforage from 'localforage';
import {ClientDetector, ClientNames} from '../shared/services/client-detector.service';

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
    UserAnalyticsModule,
    NativeAppModule
  ],
  declarations: [
    MainComponent,
    NavComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService],
  bootstrap: [MainComponent]
})
export class MainModule {

  constructor() {
    /* TODO remove when it is working again
     * With the latest version of localforage Firefox can not use indexDB
     * "A mutation operation was attempted on a database that did not allow mutations."
     * Therefor we have to use localstorage until it is fixed
     */
    if (ClientDetector.getClient().name === ClientNames.Firefox) {
      localforage.config({
        driver: localforage.LOCALSTORAGE
      });
    }
  }

}
