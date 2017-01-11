import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SoundcloudCallbackComponent}   from './components/soundcloud-callback/soundcloud_callback.component';
import {LikedTracksViewComponent} from './components/liked-tracks-view/liked-tracks-view.component';

const routes: Routes = [
  {path: 'connect', component: SoundcloudCallbackComponent},
  {path: 'likes', component: LikedTracksViewComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
