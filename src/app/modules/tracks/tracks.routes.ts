import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TracksDetailComponent } from './components/detail/detail.component';

const routes: Routes = [
    { path: 'tracks/:id', component: TracksDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class TracksRoutingModule {}
