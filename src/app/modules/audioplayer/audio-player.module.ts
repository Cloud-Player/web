import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PlayQueueComponent} from './components/playqueue/playqueue.component';
import {SharedModule} from '../shared/shared.module';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {AudioPlayerControlsComponent} from './components/audio-player-controls/audio-player-controls.component';
import {CommentsModule} from '../comments/comments.module';
import {SoundcloudPlayerComponent} from './components/soundcloud-player/soundcloud-player';
import {PlayerControllerComponent} from './components/player-controller/player-controller';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    CommentsModule
  ],
  declarations: [
    AudioPlayerControlsComponent,
    AudioPlayerComponent,
    PlayQueueComponent,
    PlayerControllerComponent,
    SoundcloudPlayerComponent
  ],
  exports: [
    AudioPlayerComponent
  ]
})

export class AudioPlayerModule {
}
