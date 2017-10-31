import {Component, OnInit} from '@angular/core';
import {Track} from '../../../tracks/models/track.model';
import {PlayQueue} from '../../collections/play_queue.collection';
import {PlayQueueItem} from '../../models/play_queue_item.model';
import {CoverSizes} from '../../../shared/components/track-cover/track-cover.component';

@Component({
  selector: 'app-audio-player',
  styleUrls: ['./audio-player.style.scss'],
  templateUrl: './audio-player.template.html'
})

export class AudioPlayerComponent implements OnInit {
  private playQueue: PlayQueue<PlayQueueItem>;
  track: Track;
  currentPlayingTime: number;

  getCoverSize(): CoverSizes {
    return CoverSizes.Large;
  }

  updateCurrentTime(val: number): void {
    this.currentPlayingTime = val;
  }

  ngOnInit(): void {
    this.playQueue = PlayQueue.getInstance();
    this.playQueue.on('add change:status', () => {
      if (this.playQueue.hasCurrentItem()) {
        const item = this.playQueue.getCurrentItem();
        if (item) {
          this.track = item.get('track');
        }
      }
    });
  }

}
