import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PlayQueueComponent} from './components/playqueue/playqueue.component';
import {SharedModule} from '../shared/shared.module';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';
import {AudioPlayerControlsComponent} from './components/audio-player-controls/audio-player-controls.component';
import {debounce, map} from 'underscore';
import * as localforage from 'localforage';
import {PlayQueue} from './collections/play_queue.collection';
import {Tracks} from '../tracks/collections/tracks.collection';
import {Track} from '../tracks/models/track.model';

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
        let playQueueItemTracks = map(playQueueItems, (item: any) => {
          return {
            id: item.id
          };
        });
        let tmpTracks = new Tracks();
        tmpTracks.add(playQueueItemTracks);
        tmpTracks.refresh().then(function (tracks) {
          tracks.forEach((track: Track) => {
            playQueue.add({track: track}, {merge: true, silent: true});
          });
        });
      }
    });

    let debouncedPlayQueueSave = debounce(() => {
      localforage.setItem('sc_playqueue', playQueue.getScheduledItemsJSON(30));
    }, 1000);
    playQueue.on('add remove reset change:status', debouncedPlayQueueSave);
  }

}
