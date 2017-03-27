import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ConnectBtnComponent} from './components/connect-btn/connect_btn.component';
import {SessionRoutingModule} from './session.routes';
import {SoundcloudCallbackComponent} from './components/soundcloud-callback/soundcloud_callback.component';
import {ShowWhenAuthenticatedComponent} from './components/show-when-authenticated/show_when_authenticated';
import {AuthenticatedUserPlaylists} from './components/authenticated-user-playlists/authenticated_user_playlists';
import {LikedTracksViewComponent} from './components/liked-tracks-view/liked-tracks-view.component';
import {SharedModule} from '../shared/shared.module';
import {UserPlayListViewComponent} from './components/user-playlist-view/user-playlist-view.component';
import {
  AuthenticatedUserPlaylistsViewComponent
}
  from './components/authenticated-user-playlists-view/authenticated-user-playlists-view.component';
import {PlaylistModule} from '../playlists/playlist.module';
import {AuthenticatedUserViewComponent} from './components/authenticated-user-view/authenticated-user-view.component';
import {Session} from './models/session.model';
import localforage = require('localforage');

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SessionRoutingModule,
    PlaylistModule,
    SharedModule
  ],
  declarations: [
    ConnectBtnComponent,
    SoundcloudCallbackComponent,
    ShowWhenAuthenticatedComponent,
    AuthenticatedUserPlaylists,
    LikedTracksViewComponent,
    UserPlayListViewComponent,
    AuthenticatedUserPlaylistsViewComponent,
    AuthenticatedUserViewComponent
  ],
  exports: [
    ConnectBtnComponent,
    ShowWhenAuthenticatedComponent,
    AuthenticatedUserPlaylists,
    AuthenticatedUserPlaylistsViewComponent
  ]
})

export class SessionModule {

}
