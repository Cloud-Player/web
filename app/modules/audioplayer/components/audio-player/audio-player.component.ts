import {Component, OnInit} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
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
