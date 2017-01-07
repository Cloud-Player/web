import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {Tracks} from '../../../tracks/collections/tracks.collection';

@Component({
  moduleId: module.id,
  selector: 'play-queue',
  templateUrl: 'playqueue.template.html',
  styleUrls: ['playqueue.style.css']
})
export class PlayQueueComponent {
  private playQueue: PlayQueue<PlayQueueItem>;

  constructor() {
    this.playQueue = PlayQueue.getInstance();
  }
}
