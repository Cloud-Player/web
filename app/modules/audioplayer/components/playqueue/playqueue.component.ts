import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component({
  moduleId: module.id,
  selector: 'play-queue',
  templateUrl: 'playqueue.template.html',
  styleUrls: ['playqueue.style.scss']
})
export class PlayQueueComponent {
  private playQueue: PlayQueue<PlayQueueItem>;

  constructor() {
    this.playQueue = PlayQueue.getInstance();
  }
}
