import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayListViewComponent} from './components/playlist-view/playlist-view.component';
import {AuthenticatedUserPlaylistGuard} from './guards/authenticated-user-playlist-guard';

const routes: Routes = [
  {
    path: 'playlists',
    component: PlayListViewComponent,
    canActivate: [AuthenticatedUserPlaylistGuard]
  },
  {
    path: 'playlists/:provider/:id',
    component: PlayListViewComponent,
    canActivate: [AuthenticatedUserPlaylistGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule {
}
