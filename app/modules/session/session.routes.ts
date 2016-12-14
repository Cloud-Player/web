import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SoundcloudCallbackComponent}   from './components/soundcloud-callback/soundcloud_callback.component';

const routes: Routes = [
  {path: 'connect', component: SoundcloudCallbackComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
