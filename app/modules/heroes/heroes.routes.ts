import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesIndexComponent }   from './components/index.component';
import { HeroesDetailComponent }   from './components/detail.component';

const routes: Routes = [
    { path: 'heroes',     component: HeroesIndexComponent },
    { path: 'heroes/:id', component: HeroesDetailComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class HeroesRoutingModule {}