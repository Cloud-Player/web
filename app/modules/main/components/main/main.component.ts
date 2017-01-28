import {Component, OnInit} from '@angular/core';
import {PlayQueueItem} from '../../../audioplayer/models/play_queue_item.model';
import {PlayQueue} from '../../../audioplayer/collections/play_queue.collection';
import {Track} from '../../../tracks/models/track.model';

@Component({
  selector: 'cloud-player',
  styles: [require('./main.style.scss')],
  template: require('./main.template.html')
})

export class MainComponent implements OnInit {

  private playQueue: PlayQueue<PlayQueueItem>;
  private item: PlayQueueItem;
  private track: Track;

  constructor() {
  }

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();
    this.item = this.playQueue.getCurrentItem();
    this.playQueue.on('change:status', () => {
      if (this.playQueue.hasCurrentItem()) {
        this.item = this.playQueue.getCurrentItem();
        this.track = this.item.get('track');
      }
    });
  }
}
