import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';
import {CommentsModule} from '../comments/comments.module';
import {SoundcloudPlayerComponent} from './components/soundcloud-player/soundcloud-player';
import {PlayerControlsComponent} from './components/player-controls/player-controls';
import {PlayerComponent} from './components/player/player';
import {PlayerManagerComponent} from './components/player-manager/player-manager';
import {PlayQueueComponent} from './components/playqueue/playqueue';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    CommentsModule
  ],
  declarations: [
    PlayerControlsComponent,
    PlayQueueComponent,
    SoundcloudPlayerComponent,
    PlayerManagerComponent,
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {
}
