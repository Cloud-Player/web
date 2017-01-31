import './rxjs-extensions';
import {NgModule}      from '@angular/core';
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
    PlaylistModule
  ],
  declarations: [
    MainComponent,
    NavComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AuthService],
  bootstrap: [ MainComponent ]
})
export class MainModule { }
