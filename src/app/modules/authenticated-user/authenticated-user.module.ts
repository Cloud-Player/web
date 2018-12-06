import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AuthenticatedUserRoutingModule} from './authenticated-user.routes';
import {FavouriteTracksViewComponent} from './components/favourite-tracks-view/favorite-tracks-view';
import {SharedModule} from '../shared/shared.module';
import {AuthenticatedUserPlaylistsViewComponent} from './components/authenticated-user-playlists-view/authenticated-user-playlists-view.component';
import {PlaylistModule} from '../playlists/playlist.module';
import {AuthenticatedUserViewComponent} from './components/authenticated-user-view/authenticated-user-view.component';
import {TracksModule} from '../tracks/tracks.module';
import {ExternalUserAuthenticator} from './services/external-authenticator.class';
import {AuthenticatedUserPlaylistFormViewComponent} from './components/authenticated-user-playlist-form-view/authenticated-user-playlist-form-view';
import {AuthenticatedUserPlaylistSelectorModalComponent} from './components/authenticated-user-playlist-selector-modal/authenticated-user-playlist-selector-modal';
import {AuthenticatedUserPlaylistFormComponent} from './components/authenticated-user-form-component/authenticated-user-playlist-form';
import {DeleteAccountComponent} from './components/delete-account/delete-account';
import {Authenticator} from './services/authenticator';
import {LoginWithProviderComponent} from './components/login-with-provider/login-with-provider';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AuthenticatedUserRoutingModule,
    PlaylistModule,
    TracksModule,
    SharedModule
  ],
  declarations: [
    FavouriteTracksViewComponent,
    AuthenticatedUserPlaylistsViewComponent,
    AuthenticatedUserPlaylistFormViewComponent,
    AuthenticatedUserViewComponent,
    AuthenticatedUserPlaylistFormComponent,
    DeleteAccountComponent,
    LoginWithProviderComponent,

    AuthenticatedUserPlaylistSelectorModalComponent
  ],
  exports: [
    AuthenticatedUserPlaylistSelectorModalComponent,
    LoginWithProviderComponent
  ],
  providers: [
    ExternalUserAuthenticator,
    Authenticator
  ],
  entryComponents: [
    AuthenticatedUserPlaylistSelectorModalComponent,
    AuthenticatedUserPlaylistFormComponent,
    DeleteAccountComponent
  ]
})

export class AuthenticatedUserModule {
}
