import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectViewComponent} from './components/connect/connect-view';

const routes: Routes = [
  {path: 'connect', component: ConnectViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConnectRoutingModule {
}
