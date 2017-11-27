import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PlayQueueComponent} from './components/playqueue/playqueue.component';
import {SharedModule} from '../shared/shared.module';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {AudioPlayerControlsComponent} from './components/audio-player-controls/audio-player-controls.component';
import {debounce} from 'underscore';
import * as localforage from 'localforage';
import {PlayQueue} from './collections/play_queue.collection';
import {Tracks} from '../tracks/collections/tracks.collection';
import {Track} from '../tracks/models/track.model';
import {PlayQueueItem} from './models/play_queue_item.model';
import {CommentsModule} from '../comments/comments.module';

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
    PlayQueueComponent
  ],
  exports: [
    AudioPlayerComponent
  ]
})

export class AudioPlayerModule {
}
