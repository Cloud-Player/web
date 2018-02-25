import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchViewComponent} from './components/serach-view/search-view';

const routes: Routes = [
  {path: 'search', component: SearchViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
