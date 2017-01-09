import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ConnectBtnComponent} from './components/connect-btn/connect_btn.component';
import {SessionRoutingModule} from './session.routes';
import {SoundcloudCallbackComponent} from './components/soundcloud-callback/soundcloud_callback.component';
import {ShowWhenAuthenticatedComponent} from './components/show-when-authenticated/show_when_authenticated';
import {AuthenticatedUserPlaylists} from './components/authenticated-user-playlists/authenticated_user_playlists';
import {LikedTracksViewComponent} from './components/liked-tracks-view/liked-tracks-view.component';
import {TracksModule} from '../tracks/tracks.module';

@NgModule ({
  imports: [
    BrowserModule,
    FormsModule,
    SessionRoutingModule,
    TracksModule
  ],
  declarations: [
    ConnectBtnComponent,
    SoundcloudCallbackComponent,
    ShowWhenAuthenticatedComponent,
    AuthenticatedUserPlaylists,
    LikedTracksViewComponent
  ],
  exports: [
    ConnectBtnComponent,
    ShowWhenAuthenticatedComponent,
    AuthenticatedUserPlaylists
  ]
})

export class SessionModule {

}
