import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DesktopAppViewComponent} from './components/desktop-app-view/desktop-app-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'desktop-app', component: DesktopAppViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {
}
