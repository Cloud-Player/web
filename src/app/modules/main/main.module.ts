import './rxjs-extensions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BackboneModule} from '../backbone/backbone.module';
import {TracksModule} from '../tracks/tracks.module';
import {MainComponent} from './components/main/main.component';
import {MainRoutingModule} from './main.routes';
import {PlayerModule} from '../player/player.module';
import {AuthenticatedUserModule} from '../authenticated-user/authenticated-user.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NavComponent} from './components/nav/nav.component';
import {PlaylistModule} from '../playlists/playlist.module';
import {SharedModule} from '../shared/shared.module';
import {UserAnalyticsModule} from '../user-analytics/user-analytics.module';
import {HttpClientModule} from '@angular/common/http';
import {NativeAppModule} from '../native-app/native-app.module';
import * as localforage from 'localforage';
import {ClientDetector, ClientNames} from '../shared/services/client-detector.service';
import {ConnectModule} from '../connect/connect.module';
import {NavItemComponent} from './components/nav/nav-item/nav-item';
import {NavInputItemComponent} from './components/nav/nav-input-item/nav-input-item';
import {NavDividerComponent} from './components/nav/nav-divider/nav-divider';
import {SearchModule} from '../search/search.module';
import {PrivacyComponent} from './components/privacy/privacy';
import {ImprintComponent} from './components/imprint/imprint';
import {PrivacyConfigComponent, PrivacyConfigModalOpener} from './components/privacy-config/privacy-config';
import {PrivacyManager} from './services/privacy-manager';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BackboneModule,
    PlayerModule,
    TracksModule,
    SearchModule,
    MainRoutingModule,
    AuthenticatedUserModule,
    PlaylistModule,
    SharedModule,
    UserAnalyticsModule,
    NativeAppModule,
    ConnectModule
  ],
  declarations: [
    MainComponent,
    NavComponent,
    NavItemComponent,
    NavInputItemComponent,
    NavDividerComponent,
    PrivacyComponent,
    ImprintComponent,
    PrivacyConfigComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, PrivacyManager, PrivacyConfigModalOpener],
  entryComponents: [PrivacyConfigComponent, PrivacyComponent],
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
