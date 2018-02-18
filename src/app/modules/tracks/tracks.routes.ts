import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrackDetailViewComponent} from './components/detail/detail-view';

const routes: Routes = [
  {path: 'tracks/:id', component: TrackDetailViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class TracksRoutingModule {
}
