import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {NativeAppRoutingModule} from './native-app.routes';
import {NativeAppViewComponent} from './components/native-app-view/native-app-view';
import {NativeAppHandlerService} from './services/native-app-handler';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    NativeAppRoutingModule
  ],
  declarations: [
    NativeAppViewComponent
  ],
  providers: [
    NativeAppHandlerService
  ]
})
export class NativeAppModule {
}
