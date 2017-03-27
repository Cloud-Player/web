import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SoundcloudCallbackComponent}   from './components/soundcloud-callback/soundcloud_callback.component';
import {LikedTracksViewComponent} from './components/liked-tracks-view/liked-tracks-view.component';
import {UserPlayListViewComponent} from './components/user-playlist-view/user-playlist-view.component';
import {
  AuthenticatedUserPlaylistsViewComponent
}
  from './components/authenticated-user-playlists-view/authenticated-user-playlists-view.component';
import {AuthenticatedUserViewComponent} from './components/authenticated-user-view/authenticated-user-view.component';

const routes: Routes = [
  {path: 'connect', component: SoundcloudCallbackComponent},
  {path: 'me', component: AuthenticatedUserViewComponent},
  {path: 'me/likes', component: LikedTracksViewComponent},
  {path: 'me/playlists', component: AuthenticatedUserPlaylistsViewComponent},
  {path: 'me/playlists/:id', component: UserPlayListViewComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
