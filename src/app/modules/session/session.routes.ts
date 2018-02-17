import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavouriteTracksViewComponent} from './components/favourite-tracks-view/favorite-tracks-view';
import {AuthenticatedUserPlaylistsViewComponent} from './components/authenticated-user-playlists-view/authenticated-user-playlists-view.component';
import {AuthenticatedUserViewComponent} from './components/authenticated-user-view/authenticated-user-view.component';
import {AuthenticatedUserGuard} from '../shared/guards/authenticated-user-guard';

const routes: Routes = [
  {path: 'me', component: AuthenticatedUserViewComponent, canActivate: [AuthenticatedUserGuard]},
  {path: 'me/likes', component: FavouriteTracksViewComponent, canActivate: [AuthenticatedUserGuard]},
  {path: 'me/playlists', component: AuthenticatedUserPlaylistsViewComponent, canActivate: [AuthenticatedUserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
