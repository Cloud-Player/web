import {Component, Input} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';

@Component({
  moduleId: module.id,
  selector: 'audio-player-play-button',
  templateUrl: 'play_button.template.html',
  styleUrls: ['play_button.style.css']
})

export class PlayButtonComponent {

  @Input() track: Track;

  @Input() tracks: Tracks;

  private playingItem: PlayQueueItem;
  private playQueue: PlayQueue<PlayQueueItem> = PlayQueue.getInstance();

  private addToPlayQueue():void{
    this.playQueue.add({track:this.track});
  }

  private play(): void{
    if(this.tracks){
      this.tracks.forEach((track: Track) => {
        this.playQueue.add({track: track});
      });
    }

    let playQueueItem = this.playQueue.add({track: this.track});
    playQueueItem.play();
  }
}
