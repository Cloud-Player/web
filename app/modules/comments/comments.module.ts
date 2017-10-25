import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {CommentsComponent} from './components/comments/comments.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    CommentsComponent
  ],
  exports: [
    CommentsComponent
  ]
})

export class CommentsModule {
}
