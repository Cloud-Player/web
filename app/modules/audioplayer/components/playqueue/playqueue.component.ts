import {Component} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component({
  selector: 'play-queue',
  styles: [ require('./playqueue.style.scss') ],
  template: require('./playqueue.template.html')
})
export class PlayQueueComponent {
  private playQueue: PlayQueue<PlayQueueItem>;

  constructor() {
    this.playQueue = PlayQueue.getInstance();
  }

  dropTrack = (dropData: {}) => {
    this.playQueue.queue({track: dropData});
  }
}
