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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
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

  constructor() {
    let playQueue = PlayQueue.getInstance();

    localforage.getItem('sc_playqueue').then((playQueueItems: any) => {
      if (playQueueItems) {
        playQueue.add(playQueueItems);
        playQueue.fetchTrackInformationOfAllAddedTracks();
      }
    });

    let debouncedPlayQueueSave = debounce(() => {
      localforage.setItem('sc_playqueue', playQueue.getScheduledItemsJSON(30));
    }, 100);
    playQueue.on('add remove reset change:status', debouncedPlayQueueSave);
  }

}
