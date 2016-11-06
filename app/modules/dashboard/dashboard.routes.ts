import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardIndexComponent }   from './components/index.component';

const routes: Routes = [
    { path: 'dashboard',  component: DashboardIndexComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule {}