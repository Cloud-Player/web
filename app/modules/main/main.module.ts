import './rxjs-extensions';
import {NgModule, OnInit}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BackboneModule} from '../backbone/backbone.module';
import {TracksModule} from '../tracks/tracks.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {MainComponent}     from './components/main/main.component';
import {MainRoutingModule}     from './main.routes';
import {AudioPlayerModule} from '../audioplayer/audio-player.module';
import {SessionModule} from '../session/session.module';
import {UsersModule} from '../users/users.module';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NavComponent} from './components/nav/nav.component';
import {PlaylistModule} from '../playlists/playlist.module';
import {AuthService} from '../shared/services/auth.service';
import {SharedModule} from '../shared/shared.module';
import {DesktopAppViewComponent} from './components/desktop-app-view/desktop-app-view.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BackboneModule,
    TracksModule,
    DashboardModule,
    MainRoutingModule,
    AudioPlayerModule,
    SessionModule,
    UsersModule,
    PlaylistModule,
    SharedModule
  ],
  declarations: [
    MainComponent,
    NavComponent,
    DesktopAppViewComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AuthService],
  bootstrap: [ MainComponent ]
})
export class MainModule {
}
