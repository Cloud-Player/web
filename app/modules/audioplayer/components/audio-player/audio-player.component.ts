import {Component, Input, OnInit, trigger, transition, style, animate} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';

@Component ({
  selector: 'audio-player',
  styles: [ require('./audio-player.style.scss') ],
  template: require('./audio-player.template.html')
})

export class AudioPlayerComponent implements OnInit{
  private playQueue: PlayQueue<PlayQueueItem>;
  public track: Track;

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();
    this.playQueue.on('add change:status', () => {
      if (this.playQueue.hasCurrentItem()) {
        let item = this.playQueue.getCurrentItem();
        if(item){
          this.track = item.get('track');
        }
      }
    });
  }

}
