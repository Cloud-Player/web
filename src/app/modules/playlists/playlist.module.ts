import {NgModule} from '@angular/core';
import {TracksModule} from '../tracks/tracks.module';
import {PlaylistsRoutingModule} from './playlist.routes';
import {BrowserModule} from '@angular/platform-browser';
import {PlayListViewComponent} from './components/playlist-view/playlist-view.component';
import {SharedModule} from '../shared/shared.module';
import {PlayListIconComponent} from './components/playlist-icon/playlist-icon.component';
import {FormsModule} from '@angular/forms';
import {AuthenticatedUserPlaylistGuard} from './guards/authenticated-user-playlist-guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TracksModule,
    PlaylistsRoutingModule,
    SharedModule
  ],
  exports: [
    PlayListIconComponent
  ],
  declarations: [
    PlayListViewComponent,
    PlayListIconComponent
  ],
  providers: [
    AuthenticatedUserPlaylistGuard
  ]
})

export class PlaylistModule {
}
