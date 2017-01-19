import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component ({
  selector: 'audio-player',
  styles: [ require('./audio-player.style.scss') ],
  template: require('./audio-player.template.html')
})

export class AudioPlayerComponent implements OnInit {

  private playQueue: PlayQueue<PlayQueueItem>;
  private track: any;

  constructor() {
  }

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();
    this.track = this.playQueue.getCurrentItem();
  }

}
