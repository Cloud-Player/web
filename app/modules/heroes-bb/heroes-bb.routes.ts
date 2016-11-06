import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesBbIndexComponent }   from './components/index.component';
import { HeroesBbDetailComponent }   from './components/detail.component';

const routes: Routes = [
    { path: 'heroes-bb',     component: HeroesBbIndexComponent },
    { path: 'heroes-bb/:id', component: HeroesBbDetailComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class HeroesBbRoutingModule {}