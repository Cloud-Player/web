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
import {TracksModule} from '../tracks/tracks.module';

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

    localforage.getItem('sc_playqueue').then((playQueueItems: Array<any>) => {
      playQueue.add(playQueueItems);

      if (playQueue.length>0) {
        let playQueueItemTracks = playQueue.map((item: PlayQueueItem) => {
          return {
            id: item.id
          };
        });
        let tmpTracks = new Tracks();
        tmpTracks.add(playQueueItemTracks);
        if(tmpTracks.length>0){
          tmpTracks.refresh().then(function (tracks) {
            tracks.forEach((track: Track) => {
              playQueue.add({track: track}, {merge: true, silent: true});
            });
          });
        }
      }
    });

    let debouncedPlayQueueSave = debounce(() => {
      localforage.setItem('sc_playqueue', playQueue.getScheduledItemsJSON(30));
    }, 1000);
    playQueue.on('add remove reset change:status', debouncedPlayQueueSave);
  }

}
