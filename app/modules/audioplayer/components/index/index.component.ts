import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import './index.style.scss';

@Component ({
  selector: 'audio-player',
  template: require('./index.template.html'),
  styleUrls: ['/index.style.css']
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
