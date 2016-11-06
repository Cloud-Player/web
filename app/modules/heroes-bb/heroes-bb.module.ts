import {NgModule}      from '@angular/core';

import {HeroesBbIndexComponent}     from './components/index.component';
import {HeroesBbDetailComponent}     from './components/detail.component';


import {HeroesBbRoutingModule}     from './heroes-bb.routes';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HeroesBbRoutingModule
    ],
    declarations: [
        HeroesBbIndexComponent,
        HeroesBbDetailComponent
    ]
})
export class HeroesBbModule {
}
