import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {ConnectRoutingModule} from './connect.routes';
import {ConnectViewComponent} from './components/connect/connect-view';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    ConnectRoutingModule
  ],
  declarations: [
    ConnectViewComponent
  ],
  exports: []
})

export class ConnectModule {
}
