import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {UserCommentsComponent} from './components/user-comments/user-comments.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    UserCommentsComponent
  ],
  exports: [
    UserCommentsComponent
  ]
})

export class CommentsModule {
}
