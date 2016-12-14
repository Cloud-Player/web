import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TracksIndexComponent } from './components/index/index.component';
import { TracksDetailComponent } from './components/detail/detail.component';

const routes: Routes = [
    { path: 'tracks',     component: TracksIndexComponent },
    { path: 'likes',     component: TracksIndexComponent },
    { path: 'playlists',     component: TracksIndexComponent },
    { path: 'tracks/:id', component: TracksDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class TracksRoutingModule {}
