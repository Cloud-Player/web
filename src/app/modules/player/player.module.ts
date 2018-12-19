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
import {MixcloudPlayerComponent} from './components/mixcloud-player/mixcloud-player';
import {DeezerPlayerComponent} from './components/deezer-player/deezer-player';
import {SocketPlayerService} from './services/socket-player';
import {HeadlessPlayerComponent} from './components/headless-player/headless-player';
import {AuthenticatedUserModule} from '../authenticated-user/authenticated-user.module';
import {RemoteDeviceSelectorComponent} from './components/remote-device-selector/remote-device-selector';
import {EmptyPlayerComponent} from './components/empty-player/empty-player';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    TracksModule,
    CommentsModule,
    AuthenticatedUserModule
  ],
  declarations: [
    PlayerControlsComponent,
    PlayQueueComponent,
    SoundcloudPlayerComponent,
    YoutubePlayerComponent,
    MixcloudPlayerComponent,
    DeezerPlayerComponent,
    HeadlessPlayerComponent,
    PlayerManagerComponent,
    PlayerComponent,
    VolumeBtnComponent,
    RemoteDeviceSelectorComponent,
    EmptyPlayerComponent
  ],
  exports: [
    PlayerComponent
  ],
  providers: [
    SocketPlayerService
  ],
  entryComponents: [
    SoundcloudPlayerComponent,
    YoutubePlayerComponent,
    MixcloudPlayerComponent,
    DeezerPlayerComponent,
    HeadlessPlayerComponent,
    EmptyPlayerComponent
  ]
})
export class PlayerModule {
}
