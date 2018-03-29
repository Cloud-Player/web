import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchViewComponent} from './components/search-view/search-view';

const routes: Routes = [
  {path: 'search', component: SearchViewComponent},
  {path: 'dashboard', redirectTo: 'search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
