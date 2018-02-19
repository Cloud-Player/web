import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SessionRoutingModule} from './session.routes';
import {FavouriteTracksViewComponent} from './components/favourite-tracks-view/favorite-tracks-view';
import {SharedModule} from '../shared/shared.module';
import {AuthenticatedUserPlaylistsViewComponent} from './components/authenticated-user-playlists-view/authenticated-user-playlists-view.component';
import {PlaylistModule} from '../playlists/playlist.module';
import {AuthenticatedUserViewComponent} from './components/authenticated-user-view/authenticated-user-view.component';
import {TracksModule} from '../tracks/tracks.module';
import {ExternalUserAuthenticator} from './services/external-authenticator.class';
import {AuthenticatedUserPlaylistFormViewComponent} from './components/authenticated-user-playlist-form-view/authenticated-user-playlist-form-view';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SessionRoutingModule,
    PlaylistModule,
    TracksModule,
    SharedModule
  ],
  declarations: [
    FavouriteTracksViewComponent,
    AuthenticatedUserPlaylistsViewComponent,
    AuthenticatedUserPlaylistFormViewComponent,
    AuthenticatedUserViewComponent
  ],
  providers: [
    ExternalUserAuthenticator
  ]
})

export class SessionModule {
}
