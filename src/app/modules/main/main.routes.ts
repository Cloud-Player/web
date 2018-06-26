import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivacyComponent} from './components/privacy/privacy';
import {ImprintComponent} from './components/imprint/imprint';

const routes: Routes = [
  {path: 'imprint', component: ImprintComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {
}
