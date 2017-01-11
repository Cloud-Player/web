import {Component, OnInit} from '@angular/core';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component ({
  moduleId: module.id,
  selector: 'audio-player',
  templateUrl: 'audio-player.template.html',
  styleUrls: ['audio-player.style.css']
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
