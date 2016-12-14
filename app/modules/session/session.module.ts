import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ConnectBtnComponent} from './components/connect-btn/connect_btn.component';
import {SessionRoutingModule} from './session.routes';
import {SoundcloudCallbackComponent} from './components/soundcloud-callback/soundcloud_callback.component';
import {ShowWhenAuthenticatedComponent} from './components/show-when-authenticated/show_when_authenticated';

@NgModule ({
  imports: [
    BrowserModule,
    FormsModule,
    SessionRoutingModule
  ],
  declarations: [
    ConnectBtnComponent,
    SoundcloudCallbackComponent,
    ShowWhenAuthenticatedComponent
  ],
  exports: [
    ConnectBtnComponent,
    ShowWhenAuthenticatedComponent
  ]
})

export class SessionModule {

}
