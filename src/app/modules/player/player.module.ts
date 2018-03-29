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
import {YoutubePlayerComponent} from './components/youtube-player/youtube-player';
import {TracksModule} from '../tracks/tracks.module';
import {VolumeBtnComponent} from './components/volume-btn/volume-btn';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    TracksModule,
    CommentsModule
  ],
  declarations: [
    PlayerControlsComponent,
    PlayQueueComponent,
    SoundcloudPlayerComponent,
    YoutubePlayerComponent,
    PlayerManagerComponent,
    PlayerComponent,
    VolumeBtnComponent
  ],
  exports: [
    PlayerComponent
  ],
  entryComponents: [
    SoundcloudPlayerComponent,
    YoutubePlayerComponent
  ]
})
export class PlayerModule {
}
