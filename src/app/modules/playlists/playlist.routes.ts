import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayListViewComponent} from './components/playlist-view/playlist-view.component';

const routes: Routes = [
  {path: 'playlists/:id', component: PlayListViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule {
}
