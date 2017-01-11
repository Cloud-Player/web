import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component({
  selector: 'play-queue',
  template: require('./playqueue.template.html'),
  styleUrls: ['/playqueue.style.css']
})
export class PlayQueueComponent {
  private playQueue: PlayQueue<PlayQueueItem>;

  constructor() {
    this.playQueue = PlayQueue.getInstance();
  }
}
